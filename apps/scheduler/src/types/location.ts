import { z } from "zod";

export const LocationScheme = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  lat: z
    .string()
    .regex(/^[0-9.]+$/, "Only contains numbers and a period.")
    .optional(),
  lng: z
    .string()
    .regex(/^[0-9.]+$/, "Only contains numbers and a period.")
    .optional(),
  createdAt: z.date().optional(),
});

export type LocationId = z.infer<typeof LocationScheme>["id"];
export type Location = Required<z.infer<typeof LocationScheme>>;
