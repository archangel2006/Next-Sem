"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function UnderDevelopment() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">

      {/* Emoji / Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-6xl"
      >
        🚧
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-3xl md:text-4xl font-semibold"
      >
        We’re building this feature
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-3 text-zinc-400 max-w-md"
      >
        This section is currently under development. We're working hard to bring
        it to you soon 🚀
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 flex gap-4"
      >
        <Link href="/">
          <button className="px-5 py-2 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition">
            Go Home
          </button>
        </Link>

        <Link href="/contact">
          <button className="px-5 py-2 rounded-full border border-white hover:bg-white hover:text-black transition">
            Contact Us
          </button>
        </Link>
      </motion.div>

    </div>
  );
}