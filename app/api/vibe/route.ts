import { buildCityVibePrompt } from "@/lib/prompts/buildCityVibePrompt";
import { getCityVibeFromOpenAI } from "@/lib/services/getCityVibe";
import { cacheWithTTL } from "@/lib/utils/cacheWithTTL";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { city, travelType } = await req.json();

  if (!city || !travelType) {
    return NextResponse.json(
      { error: "Missing city or travelType." },
      { status: 400 }
    );
  }

  const trimmedCity = city.trim().toLowerCase();
  const trimmedType = travelType.trim().toLowerCase();
  const key = `${trimmedCity}::${trimmedType}`;
  const { system, user } = buildCityVibePrompt(trimmedCity, trimmedType);

  try {
    const result = await cacheWithTTL(key, () =>
      getCityVibeFromOpenAI(system, user)
    );
    return NextResponse.json(result);
  } catch (error) {
    console.error("OpenAI parsing failed:", error);
    return NextResponse.json(
      { error: "Failed to generate city vibe." },
      { status: 500 }
    );
  }
}
