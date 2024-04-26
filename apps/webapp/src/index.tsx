import { Hono } from "hono";

import api from "./api";

const app = new Hono();
app.route("/api", api);

app.get("*", (c) => {
  return c.html(
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/static/reset.css" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/iconify-icon@2.1.0/dist/iconify-icon.min.js"></script>
        {import.meta.env.PROD ? (
          <script type="module" src="/static/client.js"></script>
        ) : (
          <script type="module" src="/src/client.tsx"></script>
        )}
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>,
  );
});

export default app;
