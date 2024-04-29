import { html } from "hono/html";
import type { HtmlEscapedString } from "hono/utils/html";

export const Layout = (props: { title: string; children: HtmlEscapedString }) =>
  html`<html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${props.title}</title>
      <link rel="stylesheet" href="/static/reset.css" />
      <link rel="stylesheet" href="/static/style.css" />
    </head>
    <body>
      <main class="c-main">
        <h1>📍 ${props.title}</h1>
        ${props.children}
      </main>
    </body>
  </html>`;
