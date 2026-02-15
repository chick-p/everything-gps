import { count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";

import { locations } from "./schema";

export const getLocationSize = async (dbBinding: D1Database) => {
  const db = drizzle(dbBinding);
  const result = await db.select({ count: count() }).from(locations);
  return result[0].count;
};
