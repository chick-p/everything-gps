import { Hono } from "hono";

import api from "./api";
import type { Bindings } from "./types";
import { sendSlackMessage } from "./slack";

const app = new Hono<{ Bindings: Bindings }>();

app.route("/api", api);

const appName = "everything-gps";

app.get("/", async (c) => {
  return c.json(
    {
      message: `Hello, ${appName}!`,
    },
    200,
  );
});

const scheduled = async (_batch: number, env: Bindings) => {
  const res = await app.request("/api/locations/size", {}, env);
  const { size } = await res.json<{
    size: number;
  }>();
  if (size !== 0) {
    await sendSlackMessage({
      url: env.SLACK_WEBHOOK_URL,
      text: `There are ${size} locations in everything-gps.\n${env.EVERYTHING_GPS_WEB_URL},`,
    });
  }
};

export default {
  fetch: app.fetch,
  scheduled,
};
