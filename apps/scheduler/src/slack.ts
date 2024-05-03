export async function sendSlackMessage(params: {
  url: string;
  text: string;
}): Promise<void> {
  const { url, text } = params;

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    });
    if (resp.status !== 200) {
      throw new Error("fail to post!");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
