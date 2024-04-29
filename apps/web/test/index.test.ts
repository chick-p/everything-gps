import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

describe("Call API", async () => {
  let worker: UnstableDevWorker;

  beforeAll(async () => {
    worker = await unstable_dev("./src/index.tsx", {
      experimental: {
        disableExperimentalWarning: true,
      },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  test("GET /api/locations", async () => {
    const res = await worker.fetch("/api/locations");
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toMatchObject([
      { id: 1, name: "Himeji Castle", lat: 34.8394324, lng: 134.693894 },
    ]);
  });
});
