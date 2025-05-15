// lib/schemas/cityVibe.ts
import { z } from "zod";

export const CityVibeSchema = z.object({
  aesthetic: z.string(),
  energy: z.string(),
  culture: z.string(),
  personality: z.string(),
  tips: z.string(),
  mood: z.enum([
    "calm",
    "vibrant",
    "vintage",
    "luxurious",
    "chaotic",
    "spiritual",
  ]),
});

export type CityVibe = z.infer<typeof CityVibeSchema>;
