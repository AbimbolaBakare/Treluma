"use client";

import { useContext } from "react";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "@/components/ThemeProvider";
import logo from "@/assets/logo.webp";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 border-b backdrop-blur-md shadow-sm 
             bg-white/30 dark:bg-zinc-900/30 border-white/20 dark:border-zinc-700 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Treluma Logo"
            width={120}
            height={40}
            priority
          />
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 cursor-pointer rounded-full bg-zinc-100 dark:bg-zinc-800 transition-colors duration-300 group"
          aria-label="Toggle theme"
        >
          <span className="text-black dark:text-white transition-all duration-300 ease-in-out group-hover:rotate-180">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </span>
        </button>
      </div>
    </header>
  );
}
