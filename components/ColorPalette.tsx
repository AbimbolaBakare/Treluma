"use client";

type ColorPaletteProps = {
  vibeType: string;
};

const vibeColors: Record<string, string[]> = {
  calm: ["#A2D2FF", "#BDE0FE", "#CDB4DB"],
  vibrant: ["#FF595E", "#FFCA3A", "#8AC926"],
  vintage: ["#6B4226", "#DAB785", "#AA8F66"],
  luxurious: ["#0F0F0F", "#4E2A84", "#BBA0CA"],
  chaotic: ["#EF476F", "#FFD166", "#06D6A0"],
  spiritual: ["#B5C0D0", "#E4BAD4", "#A1C298"],
};

export default function ColorPalette({ vibeType }: ColorPaletteProps) {
  const colors = vibeColors[vibeType.toLowerCase()] || ["#ccc", "#ddd", "#eee"];

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-700 dark:text-gray-300">
        <strong>Mood detected:</strong> {vibeType.toUpperCase() ?? "Unknown"}
      </p>

      <div className="flex gap-3">
        {colors.map((color, index) => (
          <div
            key={index}
            className="w-12 h-12 rounded-lg border shadow-sm"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
}
