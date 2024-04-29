import { zValidator } from "@hono/zod-validator";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";

import { locations } from "../schema";
import type { Bindings } from "../types";

import { z } from "zod";

const app = new Hono<{ Bindings: Bindings }>();

app.post(
  "/locations",
  zValidator(
    "json",
    z.object({
      name: z.string(),
      lat: z.string(),
      lng: z.string(),
    }),
  ),
  async (c) => {
    const db = drizzle(c.env.DB);
    const { name, lat, lng } = c.req.valid("json");
    try {
      await db.insert(locations).values({ name, lat, lng });
      return c.json({ message: "Success to insert" }, 201);
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
