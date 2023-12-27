import { InferResponseType, hc } from "hono/client";
import { useEffect, useState } from "react";

import { AppType } from "../functions/api/[[route]]";

const client = hc<AppType>("/");
const $get = client.api.worker.$get;

const App = () => {
  const appName = "everything-gps";

  const [worker, setWorker] = useState<InferResponseType<typeof $get>>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await $get();
      const respData = await res.json();
      setWorker(respData);
    };
    fetchData();
  }, []);

  return (
    <section>
      {" "}
      <h2>How to setup shortcut</h2>
      <ol>
        <li>
          Copy your Cloudflare Workers URL:
          <br />
          <a href={worker?.url}>{worker?.url}</a>
        </li>
        <li>
          Download&nbsp;
          <a href="https://www.icloud.com/shortcuts/607d5d4edde1496993eb0d839544aca2">
            iOS Shortcut
          </a>
          &nbsp; and add it to your iPhone.
        </li>
        <li>Set your Cloudflare Workers URL.</li>
        <li>Set Client ID and Client Secret.</li>
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
