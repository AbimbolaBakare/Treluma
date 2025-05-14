import { CitySummary } from "@/lib/types";
import { useEffect, useState } from "react";

export function useCitySummary(city: string, travelType: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState<CitySummary>({
    aesthetic: "",
    energy: "",
    culture: "",
    personality: "",
    tips: "",
    mood: "",
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("/api/vibe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city, travelType }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Unexpected error occurred.");
        } else {
          setSummary(data);
        }
      } catch {
        setError("Failed to load city summary details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [city, travelType]);

  return { summary, loading, error };
}
