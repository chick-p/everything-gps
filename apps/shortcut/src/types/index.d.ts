import { D1Database } from "@cloudflare/workers-types";

export type Bindings = {
  DB: D1Database;
  SHORTCUT_URL: string;
};
