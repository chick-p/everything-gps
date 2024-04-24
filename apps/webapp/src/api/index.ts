import { Hono } from "hono";

import { Bindings } from "../types";
import locations from "./locations";

const app = new Hono<{ Bindings: Bindings }>();
app.route("/", locations);

export default app;
