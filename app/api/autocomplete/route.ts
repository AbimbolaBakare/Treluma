import { NextRequest, NextResponse } from "next/server";
import { cacheWithTTL } from "@/lib/utils/cacheWithTTL";
import {
  GOOGLE_MAPS_API_KEY,
  GOOGLE_AUTOCOMPLETE_URL,
} from "@/lib/config/constants";
import { isRateLimited } from "@/lib/utils/rateLimiter";
import { GoogleAutocompleteResponse } from "@/lib/types";

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30; 

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const { searchParams } = new URL(req.url);
  const input = searchParams.get("input");

  if (!input || !GOOGLE_MAPS_API_KEY) {
    return NextResponse.json(
      { success: false, data: null, error: "Missing input or API key." },
      { status: 400 }
    );
  }

  if (isRateLimited(ip, RATE_LIMIT_WINDOW, RATE_LIMIT_MAX_REQUESTS)) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: "Rate limit exceeded. Try again later.",
      },
      { status: 429 }
    );
  }

  const cacheKey = input.toLowerCase();

  try {
    const data = await cacheWithTTL(
      cacheKey,
      async () => {
        const url = `${GOOGLE_AUTOCOMPLETE_URL}?input=${encodeURIComponent(
          input
        )}&types=(regions)&key=${GOOGLE_MAPS_API_KEY}`;
        const res = await fetch(url);
        const json: GoogleAutocompleteResponse = await res.json();

        if (json.status !== "OK") {
          throw new Error(json.error_message || "Google Places API error");
        }

        return json;
      },
      60 * 1000
    );

    return NextResponse.json({ success: true, data: data, error: null });
  } catch (error) {
    console.error("Google Autocomplete fetch failed:", error);
    return NextResponse.json(
      { success: false, data: null, error: "Internal server error." },
      { status: 500 }
    );
  }
}
