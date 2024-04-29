import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";
import manifest from "__STATIC_CONTENT_MANIFEST";

import { Home } from "./home";
import api from "./api";
import type { Bindings } from "./types";

const app = new Hono<{ Bindings: Bindings }>();

app.get("/static/*", serveStatic({ root: "./", manifest }));
app.route("/api", api);

const appName = "everything-gps";

app.get("/", async (c) => {
  const host = c.req.raw.headers.get("host") || "";
  const SHORTCUT_URL = c.env.SHORTCUT_URL;
  const htmlContent = await Home({ appName, host, shortcutUrl: SHORTCUT_URL });
  return c.html(htmlContent);
});

export default app;
