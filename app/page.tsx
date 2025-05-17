"use client";

import { useState, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

import SelectInput from "@/components/ui/SelectInput";
import Button from "@/components/ui/Button";
import CityAutocomplete from "@/components/ui/CityAutocomplete";

export default function HomePage() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [travelType, setTravelType] = useState("solo");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      startTransition(() => {
        router.push(
          `/result?city=${encodeURIComponent(city)}&travelType=${travelType}`
        );
      });
    },
    [city, travelType, router]
  );

  return (
    <div className="text-black dark:text-white">
      <div>
        <div className="absolute inset-0 -z-10 hero-background" />
        <div className="absolute inset-0 -z-10 bg-black/30 backdrop-blur-sm" />

        <motion.section
          className="text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold mb-2">
            DISCOVER CITY ENERGY
          </h1>
          <p className="text-black/100 dark:text-white/80 mb-10">
            Set the vibe. Explore your kind of city.
          </p>
        </motion.section>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-full max-w-xl mx-auto p-6 space-y-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          aria-describedby="form-description"
        >
          <div>
            <CityAutocomplete
              onSelect={(selectedCity) => {
                setCity(selectedCity);
              }}
            />
          </div>

          <SelectInput
            id="travelType"
            label="Travel Type"
            value={travelType}
            onChange={(e) => setTravelType(e.target.value)}
            options={[
              { label: "Solo", value: "solo" },
              { label: "Couple", value: "couple" },
              { label: "Family", value: "family" },
              { label: "Work", value: "work" },
            ]}
            icon={<Users className="w-4 h-4" />}
          />

          <div className="pt-3">
            <Button type="submit" isLoading={isPending} disabled={!city.trim()}>
              Explore City
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
