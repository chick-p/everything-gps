import type { InferResponseType } from "hono/client";
import { hc } from "hono/client";
import { useEffect, useState } from "react";
import { AppType } from "../functions/api/[[route]]";

const App = () => {
  const client = hc<AppType>("/");
  const $post = client.api.location.$post;

  const [data, setData] = useState<InferResponseType<typeof $post>>();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await $post({
  //       query: {
  //         name: "Pages",
  //       },
  //     });
  //     const responseData = await res.json();
  //     setData(responseData);
  //   };
  //   fetchData();
  // }, []);

  return <h1>{data?.message}</h1>;
};

export default App;
