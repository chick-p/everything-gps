import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";
import manifest from "__STATIC_CONTENT_MANIFEST";

import { Home } from "./pages/home";

const app = new Hono();
app.get("/static/*", serveStatic({ root: "./", manifest }));

const appName = "everything-gps";

app.get("/", async (context) => {
  const host = context.req.raw.headers.get("host") || "";
  const htmlContent = await Home({ appName, host });
  return context.html(htmlContent);
});

export default app;
