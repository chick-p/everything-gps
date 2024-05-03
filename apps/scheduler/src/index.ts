import { Hono } from "hono";


const app = new Hono();

export default app
const appName = "everything-gps";

app.get("/", async (c) => {
  return c.json(
    {
      message: `Hello, ${appName}!`,
    },
    200,
  );
});
