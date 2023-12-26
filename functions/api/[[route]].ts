import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";
import { z } from "zod";

type Bindings = {
  SLACK_WEBHOOK_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

const locationSchema = z.object({
  name: z.string(),
  lat: z.string(),
  long: z.string(),
  prefecture: z.string(),
  city: z.string(),
  block: z.string(),
});

type Location = z.infer<typeof locationSchema>;

const locations: Location[] = [];

const route = app.post(
  "/location",
  zValidator("json", locationSchema),
  async (c) => {
    const location = c.req.valid("json");
    locations.push(location);
    const address = `${location.prefecture}${location.city}${location.block}`;

    const { SLACK_WEBHOOK_URL } = c.env;
    console.log(SLACK_WEBHOOK_URL);
    const text = `${location.name}\n${address}\nhttps://maps.google.com/maps?q=${location.lat},${location.long}`;
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pretext: `New location`,
        text,
      }),
    });
    if (response.status === 200) {
      return c.json({
        message: "posted!",
      });
    } else {
      return c.json({
        message: "failed!",
      });
    }
  }
);

export type AppType = typeof route;
export const onRequest = handle(app);
