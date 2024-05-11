import { D1Database } from "@cloudflare/workers-types";

export type Bindings = {
  DB: D1Database;
  SLACK_WEBHOOK_URL: string;
  EVERYTHING_GPS_WEB_URL: string;
};
