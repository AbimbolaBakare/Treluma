import { useEffect, useState } from "react";
import { MoodImage } from "@/lib/types";

export function useMoodboard(city: string) {
  const [images, setImages] = useState<MoodImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMoodboard() {
      try {
        const res = await fetch(`/api/moodboard?query=${city}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Unexpected error occurred.");
        } else if (!Array.isArray(data) || data.length === 0) {
          setError(` We couldn’t find moodboard images for ${city}.`);
        } else {
          setImages(data);
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchMoodboard();
  }, [city]);

  return { images, loading, error };
}
