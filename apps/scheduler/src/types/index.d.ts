import { D1Database } from "@cloudflare/workers-types";

export type Bindings = {
  DB: D1Database;
  SLACK_WEBHOOK_URL: string;
};
