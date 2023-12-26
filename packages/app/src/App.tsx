import type { InferResponseType } from "hono/client";
import { hc } from "hono/client";
import { useEffect, useState } from "react";
import { AppType } from "../functions/api/[[route]]";

const client = hc<AppType>("/");

const App = () => {
  const appName = "everything-gps";
  const host = window.location.host;

  return (
    <section>
      {" "}
      <h2>How to setup shortcut</h2>
      <ol>
        <li>
          Copy your Cloudflare Workers URL:
          <br />
          <a href="https://${host}">https://{host}</a>
        </li>
        <li>
          Download
          <a href="https://www.icloud.com/shortcuts/607d5d4edde1496993eb0d839544aca2">
            iOS Shortcut
          </a>
          and add it to your iPhone.
        </li>
        <li>Set your Cloudflare Workers URL.</li>
      </ol>
      <h2>How to use</h2>
      <ol>
        <li>Open an event page on your browser.</li>
        <li>
          Open Share Sheet and tap "{appName}".
          <br />
          In the first time, accept to access your Cloudflare Workers URL.
        </li>
        <li>Add an event to your calendar.</li>
      </ol>
    </section>
  );
};

export default App;
