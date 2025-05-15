import { UNSPLASH_ACCESS_KEY } from "@/lib/config/constants";
import { buildUnsplashUrl } from "../utils/buildUnsplashUrl";

export async function getMoodboardImages(query: string) {
  if (!UNSPLASH_ACCESS_KEY) {
    throw new Error("Missing Unsplash API key.");
  }

  const url = buildUnsplashUrl({ query });
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Unsplash fetch failed with status ${res.status}`);
  }

  const data = await res.json();

  return (data.results || []).map(
    (img: { urls: { regular: "string" }; alt_description: "string" }) => ({
      url: img.urls?.regular,
      alt: img.alt_description || query,
    })
  );
}
