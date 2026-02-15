import { defineConfig } from "drizzle-kit";
import process from "node:process";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/schema.ts",
  out: "./drizzle/migrations",
  driver: "d1-http",
  dbCredentials: {
    accountId: process.env.CF_ACCOUNT_ID!,
    databaseId: process.env.CF_DB_ID!,
    token: process.env.CF_API_TOKEN!,
  },
});
