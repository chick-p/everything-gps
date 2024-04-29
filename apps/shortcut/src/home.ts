import { html } from "hono/html";
import { Layout } from "./components/layout";

const content = (props: {
  host: string;
  appName: string;
  shortcutUrl: string;
}) => html`
  <section>
    <h2>How to setup shortcut</h2>
    <ol>
      <li>
        Copy your Cloudflare Workers URL:
        <br />
        <a href="https://${props.host}">https://${props.host}</a>
      </li>
      <li>
        Download
        <a href="${props.shortcutUrl}">iOS Shortcut</a>
        and add it to your iPhone.
      </li>
      <li>Set your Cloudflare Workers URL.</li>
    </ol>
  </section>
`;

export const Home = async (props: {
  appName: string;
  host: string;
  shortcutUrl: string;
}) => {
  const children = await content(props);
  return html` ${Layout({ title: props.appName, children })} `;
};
