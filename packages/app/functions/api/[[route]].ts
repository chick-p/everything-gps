import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";

type Bindings = {
  WORKER_BASE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

const route = app.get("/worker", async (c) => {
  const { WORKER_BASE_URL } = c.env;
  return c.json({
    url: WORKER_BASE_URL,
  });
});

export type AppType = typeof route;
export const onRequest = handle(app);
