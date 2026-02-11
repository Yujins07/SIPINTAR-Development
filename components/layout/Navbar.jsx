"use client";

import { useTheme } from "@/components/layout/ThemeProvider";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme(); // ambil dari provider

  return (
    <nav className="flex items-center justify-between p-4 bg-[var(--background)] shadow-md">
      {/* Logo / Judul */}
      <h1 className="text-lg font-bold text-[var(--foreground)]">
        My Website
      </h1>

      {/* Tombol toggle theme */}
      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded-xl border border-[var(--primary)] bg-[var(--background)] text-[var(--primary)] transition"
      >
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </nav>
  );
}
