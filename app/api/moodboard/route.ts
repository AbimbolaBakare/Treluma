import { getMoodboardImages } from "@/lib/services/getMoodboardImages";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "city vibe";

  try {
    const images = await getMoodboardImages(query);
    return NextResponse.json(images);
  } catch (error: any) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message.includes("Unsplash") ? 502 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
