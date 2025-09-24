"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] p-6 overflow-hidden">
      {/* Animasi angka 404 */}
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="text-9xl font-extrabold text-[var(--foreground)]"
      >
        404
      </motion.h1>

      {/* Animasi teks */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 text-lg md:text-2xl text-center"
      >
        Oops! Halaman yang kamu cari tidak ditemukan.
      </motion.p>

      {/* Tombol balik ke home */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-8"
      >
        <Link
          href="/"
          className="px-6 py-3 bg-[var(--primary)] text-[var(--background)] rounded-2xl shadow-md hover:bg-[var(--background)] hover:text-[var(--primary)] transition-all border-2 border-transparent hover:border-[var(--primary)] font-semibold"
        >
          Kembali ke Beranda
        </Link>
      </motion.div>
    </div>
  );
}
