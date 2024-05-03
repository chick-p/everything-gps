import { Hono } from "hono";

import api from "./api";
import type { Bindings } from "./types";

const app = new Hono<{ Bindings: Bindings }>();

app.route("/api", api);

export default app
const appName = "everything-gps";

app.get("/", async (c) => {
  return c.json(
    {
      message: `Hello, ${appName}!`,
    },
    200,
  );
});
