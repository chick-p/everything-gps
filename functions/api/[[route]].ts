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
  return c.json({
    message: "posted!",
  });
});

export type AppType = typeof route;
export const onRequest = handle(app);
