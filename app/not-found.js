"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800 p-6">
      {/* Animasi angka 404 */}
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="text-9xl font-extrabold text-gray-900 drop-shadow-lg"
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
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700 transition-all"
        >
          Kembali ke Beranda
        </Link>
      </motion.div>

      {/* Animasi dekorasi */}
      <motion.div
        className="absolute bottom-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -20, 20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
    </div>
  );
}
