"use client";

import { useEffect, useState } from "react";
import TextInput from "@/components/ui/TextInput";
import Spinner from "@/components/ui/Loader/Spinner";
import { MapPin } from "lucide-react";
import { CityAutocompleteProps } from "@/lib/types";
import { useCityAutocomplete } from "@/lib/hooks/useCityAutocomplete";

export default function CityAutocomplete({ onSelect }: CityAutocompleteProps) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { suggestions, loading, error, suppressNext } =
    useCityAutocomplete(input);

  const handleSelect = (desc: string) => {
    suppressNext();
    setInput(desc);
    setShowSuggestions(false);
    onSelect(desc);
  };

  useEffect(() => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  }, [suggestions]);

  return (
    <div className="relative">
      <TextInput
        id="city"
        label="City"
        icon={<MapPin className="w-4 h-4" />}
        placeholder="Search for a city or country..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        error={error}
        autoComplete="off"
      />

      {showSuggestions && (
        <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-md text-sm max-h-60 overflow-auto">
          {loading && suggestions.length === 0 ? (
            <li className="px-4 py-3 flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Spinner size="md" color="zinc-200" />
              Searching...
            </li>
          ) : suggestions.length > 0 ? (
            suggestions.map((item, i) => (
              <li
                key={i}
                onClick={() => handleSelect(item.description)}
                className="px-4 py-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700"
              >
                {item.description}
              </li>
            ))
          ) : (
            !loading && (
              <li className="px-4 py-2 text-gray-400 text-sm">
                No suggestions found.
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
