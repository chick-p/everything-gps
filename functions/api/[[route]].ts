import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";
import { z } from "zod";
import { env } from "hono/adapter";

const app = new Hono().basePath("/api");

const schema = z.object({
  name: z.string(),
  address: z.string(),
  lat: z.string(),
  long: z.string(),
});

type Location = z.infer<typeof schema>;

const locations: Location[] = [];

const route = app.post("/location", zValidator("json", schema), async (c) => {
  const location = c.req.valid("json");
  locations.push(location);

  const { SLACK_WEBHOOK_URL } = env<{ SLACK_WEBHOOK_URL: string }>(c);
  const text = `${location.name}\n${location.address}\nhttps://maps.google.com/maps?q=${location.lat},${location.long}`;
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
});

export type AppType = typeof route;
export const onRequest = handle(app);
