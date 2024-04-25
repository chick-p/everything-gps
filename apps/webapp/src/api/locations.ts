import { zValidator } from "@hono/zod-validator";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";

import { locations } from "../schema";
import { Bindings } from "../types";
import { LocationScheme } from "../types/location";

const app = new Hono<{ Bindings: Bindings }>();

app.get("/locations", zValidator("form", LocationScheme), async (c) => {
  const db = drizzle(c.env.DB);
  try {
    const result = await db.select().from(locations).all();
    return c.json(result);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      return c.json({ message: "Internal Error" }, 500);
    }
    return c.json({ message: "Unknown Error" }, 500);
  }
});

export default app;
