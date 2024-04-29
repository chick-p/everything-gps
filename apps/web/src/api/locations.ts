import { zValidator } from "@hono/zod-validator";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

import { locations } from "../schema";
import { Bindings } from "../types";
import { LocationScheme } from "../types/location";
import { z } from "zod";

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

app.delete(
  "/locations/:id",
  zValidator(
    "param",
    z.object({
      id: z.string(),
    }),
  ),
  async (c) => {
    const id = c.req.param("id");
    const db = drizzle(c.env.DB);
    try {
      await db.delete(locations).where(eq(locations.id, Number(id)));
      return c.json({ message: `Success to delete (id:${id})` }, 204);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        return c.json({ message: "Internal Error" }, 500);
      }
      return c.json({ message: "Unknown Error" }, 500);
    }
  },
);

export default app;
