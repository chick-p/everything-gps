import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import {
  buildAddress,
  buildGoogleMapUrl,
  schema as locationSchema,
} from "./location";
import { env } from "hono/adapter";
import { sendSlackMessage } from "./slack";

const app = new Hono();

type Env = {
  SLACK_WEBHOOK_URL: string;
};

app.get("/", (c) => c.text("Hello everything-gps!"));

app.post("/api/location", zValidator("json", locationSchema), async (c) => {
  const location = c.req.valid("json");

  const { SLACK_WEBHOOK_URL } = env<Env>(c);
  console.log(SLACK_WEBHOOK_URL);
  const address = buildAddress(location);
  const googleMapUrl = buildGoogleMapUrl(location);
  const text = `${location.name}\n${address}\n${googleMapUrl}`;

  await sendSlackMessage({
    url: SLACK_WEBHOOK_URL,
    text,
  });

  return c.json({
    message: "success!",
  });
});

export default app;
