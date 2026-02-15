import type { Bindings } from "./types";
import { sendSlackMessage } from "./slack";
import { getLocationSize } from "./locations";

const scheduled = async (_batch: number, env: Bindings) => {
  const size = await getLocationSize(env.DB);
  if (size !== 0) {
    await sendSlackMessage({
      url: env.SLACK_WEBHOOK_URL,
      text: `There are ${size} locations in everything-gps.\n${env.EVERYTHING_GPS_WEB_URL},`,
    });
  }
};

export default {
  fetch: async () => {
    return new Response("OK", { status: 200 });
  },
  scheduled,
};
