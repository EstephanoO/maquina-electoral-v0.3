"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Compass } from "lucide-react";

const BACKGROUND_ANIMATION_DURATION = 4;
const BACKGROUND_SCALE_RANGE_MIN = 1;
const BACKGROUND_SCALE_RANGE_MAX = 1.2;
const BACKGROUND_OPACITY_MIN = 0.3;
const BACKGROUND_OPACITY_MAX = 0.5;
const MAIN_CONTENT_DELAY = 0.2;
const MAIN_CONTENT_STIFFNESS = 200;
const ICON_ANIMATION_ROTATION = -10;
const ICON_DELAY = 0.4;
const ICON_STIFFNESS = 150;
const ICON_BLUR_ANIMATION_DURATION_COMPREHENSIVE = 3;
const ICON_BLUR_SCALE_RANGE_COMPACT_MAX = 1.1;
const TITLE_DELAY = 0.5;

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-black text-white px-4 sm:px-6 relative overflow-hidden"
    >
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

      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{
          delay: MAIN_CONTENT_DELAY,
          type: "spring",
          stiffness: MAIN_CONTENT_STIFFNESS,
        }}
        className="relative z-10 text-center max-w-2xl w-full pb-4"
      >
        <motion.div
          initial={{ rotate: ICON_ANIMATION_ROTATION, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            delay: ICON_DELAY,
            type: "spring",
            stiffness: ICON_STIFFNESS,
          }}
          className="mb-4 sm:mb-6 flex justify-center"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full blur-xl opacity-60"
              animate={{ scale: [1, ICON_BLUR_SCALE_RANGE_COMPACT_MAX, 1] }}
              transition={{
                duration: ICON_BLUR_ANIMATION_DURATION_COMPREHENSIVE,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="relative bg-gradient-to-br from-amber-500 to-amber-600 p-4 sm:p-6 rounded-full border-2 border-amber-400/50 shadow-2xl">
              <Compass className="w-12 h-12 sm:w-16 sm:h-16" />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: TITLE_DELAY }}
          className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent leading-tight"
        >
          Maquina Electoral
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex items-center justify-center gap-2 mb-6 sm:mb-8"
        >
          <span className="text-xs sm:text-sm text-zinc-500">
            Powered by Goberna
          </span>
        </motion.div>

        <Link
          href="/login"
          className="inline-block"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.8,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-full sm:w-auto px-8 py-4 sm:py-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-full overflow-hidden shadow-2xl shadow-amber-500/20 border border-amber-400/50 text-base sm:text-lg touch-manipulation font-medium"
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10 flex items-center justify-center text-black">
              Iniciar configuracion
            </span>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
