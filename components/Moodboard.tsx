"use client";

import { MoodboardProps } from "@/lib/types";

export default function Moodboard({ images, loading, error }: MoodboardProps) {
  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">Loading moodboard...</p>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">{error}</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {images.map((img, i) => (
        <img
          key={i}
          src={img.url}
          alt={img.alt || `Moodboard image ${i + 1}`}
          className="rounded shadow-md object-cover w-full h-48"
          loading="lazy"
        />
      ))}
    </div>
  );
}
