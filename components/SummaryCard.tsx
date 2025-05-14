import React from "react";

type SummaryCardProps = {
  title: string;
  content: string;
};

export default function SummaryCard({ title, content }: SummaryCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 shadow-sm bg-background text-foreground">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm opacity-90 whitespace-pre-wrap">{content}</p>
    </div>
  );
}
