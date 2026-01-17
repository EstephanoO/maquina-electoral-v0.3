"use client";

import { motion } from "motion/react";

const BACKGROUND_ANIMATION_DURATION = 4;
const BACKGROUND_SCALE_RANGE_MIN = 1;
const BACKGROUND_SCALE_RANGE_MAX = 1.2;
const BACKGROUND_OPACITY_MIN = 0.3;
const BACKGROUND_OPACITY_MAX = 0.5;

export function AnimatedBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white px-4 sm:px-6 overflow-hidden">
      <motion.div
        className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-64 h-48 sm:h-64 bg-amber-500/20 rounded-full blur-3xl"
        animate={{
          scale: [
            BACKGROUND_SCALE_RANGE_MIN,
            BACKGROUND_SCALE_RANGE_MAX,
            BACKGROUND_SCALE_RANGE_MIN,
          ],
          opacity: [
            BACKGROUND_OPACITY_MIN,
            BACKGROUND_OPACITY_MAX,
            BACKGROUND_OPACITY_MIN,
          ],
        }}
        transition={{
          duration: BACKGROUND_ANIMATION_DURATION,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-56 sm:w-80 h-56 sm:h-80 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [
            BACKGROUND_SCALE_RANGE_MAX,
            BACKGROUND_SCALE_RANGE_MIN,
            BACKGROUND_SCALE_RANGE_MAX,
          ],
          opacity: [
            BACKGROUND_OPACITY_MAX,
            BACKGROUND_OPACITY_MIN,
            BACKGROUND_OPACITY_MAX,
          ],
        }}
        transition={{
          duration: BACKGROUND_ANIMATION_DURATION,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
