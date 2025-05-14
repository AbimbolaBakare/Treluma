"use client";

import React from "react";
import SummaryCard from "@/components/SummaryCard";
import ColorPalette from "@/components/ColorPalette";
import Moodboard from "@/components/Moodboard";
import Loader from "@/components/ui/Loader/PageLoader";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useMoodboard } from "@/lib/hooks/useMoodboard";
import { useCitySummary } from "@/lib/hooks/useCitySummary";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city") || "";
  const travelType = searchParams.get("travelType") || "solo";

  const {
    summary,
    loading: loadingSummary,
    error: summaryError,
  } = useCitySummary(city, travelType);

  const {
    images,
    loading: loadingMoodboard,
    error: moodboardError,
  } = useMoodboard(city);

  if (loadingSummary) {
    return <Loader message={`Analyzing the energy of ${city}...`} />;
  }

  if (summaryError) {
    return (
      <main className="max-w-4xl mx-auto p-6 text-red-600 dark:text-red-400 text-center">
        <h1 className="text-2xl font-bold">Treluma City Energy: {city}</h1>
        <p className="mt-4  text-red-600 dark:text-red-400 text-center text-sm">
          {summaryError}
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-12 text-zinc-800 dark:text-zinc-100">
      <h1 className="text-2xl font-bold text-center">
        Treluma City Energy: {city}
      </h1>

      <section>
        <h2 className="text-xl font-semibold mb-4">City Summary</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { title: "Aesthetic Style", content: summary.aesthetic },
            { title: "Emotional Energy", content: summary.energy },
            { title: "Cultural Norms", content: summary.culture },
            {
              title: "Local Personality",
              content: summary.personality,
            },
            { title: "Safety Tips", content: summary.tips },
          ].map(({ title, content }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <SummaryCard title={title} content={content} />
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Color Palette</h2>
        <ColorPalette vibeType={summary.mood} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">City Moodboard</h2>
        <Moodboard
          images={images}
          loading={loadingMoodboard}
          error={moodboardError}
        />
      </section>
    </main>
  );
}
