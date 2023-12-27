import { z } from "zod";

export const schema = z.object({
  name: z.string(),
  lat: z.string(),
  long: z.string(),
  prefecture: z.string(),
  city: z.string(),
  block: z.string(),
});

export type Location = z.infer<typeof schema>;

export function buildAddress(location: Location): string {
  const { prefecture, city, block } = location;
  return `${prefecture} ${city} ${block}`;
}

export function buildGoogleMapUrl(location: Location): string {
  const { lat, long } = location;
  return `https://maps.google.com/maps?q=${lat},${long}`;
}
