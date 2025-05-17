import { useEffect, useRef, useState } from "react";
import { Suggestion } from "../types";

export function useCityAutocomplete(input: string) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const skipNextRef = useRef(false);

  useEffect(() => {
    if (skipNextRef.current) {
      skipNextRef.current = false;
      return;
    }

    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const fetchSuggestions = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `/api/autocomplete?input=${encodeURIComponent(input)}`,
          {
            signal: controller.signal,
          }
        );
        const data = await res.json();

        if (data.success && data.data?.status === "OK") {
          setSuggestions(data.data.predictions);
        } else {
          setSuggestions([]);
          setError("No results found");
        }
      } catch (err) {
        setError("Failed to fetch suggestions");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchSuggestions, 500);
    return () => {
      clearTimeout(delay);
      controller.abort();
    };
  }, [input]);

  const suppressNext = () => {
    skipNextRef.current = true;
  };

  return {
    suggestions,
    loading,
    error,
    suppressNext,
  };
}
