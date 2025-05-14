import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { CityVibeSchema } from "@/lib/schemas/cityVibe";
import { OPENAI_API_KEY } from "../config/constants";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function getCityVibeFromOpenAI(system: string, user: string) {
  const response = await openai.responses.parse({
    model: "gpt-4o-2024-08-06",
    input: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    text: {
      format: zodTextFormat(CityVibeSchema, "cityVibe"),
    },
  });

  return response.output_parsed;
}
