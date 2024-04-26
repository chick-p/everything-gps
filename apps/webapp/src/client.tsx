import { useEffect, useState } from "hono/jsx";
import { render } from "hono/jsx/dom";

import type { Location } from "./types/location";

const appName = "everything-gps";

function App() {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/locations");
      const data = await res.json<Array<Location>>();
      setLocations(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <main class="c-main">
        <h1>{`📍${appName}`}</h1>
        <table class="c-table">
          <thead>
            <tr>
              <th>name</th>
              <th>created at</th>
              <th>map</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => {
              const createdAt = new Date(location.createdAt).toLocaleString();
              const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
              return (
                <tr key={location.id}>
                  <td>{location.name}</td>
                  <td>{createdAt}</td>
                  <td>
                    <a href={googleMapUrl} target="_blank">
                      <iconify-icon
                        icon="mdi:map-marker-plus"
                        width="1.4em"
                      ></iconify-icon>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
}

const root = document.getElementById("root")!;
render(<App />, root);
