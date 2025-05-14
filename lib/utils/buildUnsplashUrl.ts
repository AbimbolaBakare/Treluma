import { UNSPLASH_API_URL, UNSPLASH_ACCESS_KEY } from "@/lib/config/constants";
import { UnsplashOptions } from "../types";

export function buildUnsplashUrl({
  query,
  perPage = 6,
  orientation = "landscape",
  contentFilter = "high",
}: UnsplashOptions): string {
  const params = new URLSearchParams({
    query,
    per_page: perPage.toString(),
    orientation,
    content_filter: contentFilter,
    client_id: UNSPLASH_ACCESS_KEY!,
  });

  return `${UNSPLASH_API_URL}?${params.toString()}`;
}
