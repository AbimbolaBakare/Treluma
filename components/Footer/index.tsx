"use client";

import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 text-sm">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-gray-700 dark:text-white/60">
          &copy; {new Date().getFullYear()} Treluma. All rights reserved.
        </p>

        <div className="flex gap-4">
          <a
            href="https://github.com/AbimbolaBakare/Treluma"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-700 dark:text-white/60 hover:text-black dark:hover:text-white transition"
          >
            <Github size={16} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/abimbola-bakare"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-700 dark:text-white/60 hover:text-black dark:hover:text-white transition"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
