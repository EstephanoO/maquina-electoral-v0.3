"use client";

import { motion } from "motion/react";
import { Shield } from "lucide-react";

interface StepInfoProps {
  title: string;
  onNext: () => void;
}

export function StepInfo({ title, onNext }: StepInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[400px] text-center px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-6 sm:mb-8"
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full blur-xl opacity-50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative bg-gradient-to-br from-amber-500/30 to-amber-600/30 backdrop-blur-sm p-6 sm:p-8 rounded-full border-2 border-amber-500/50 shadow-2xl shadow-amber-500/20">
            <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400" />
          </div>
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl sm:text-4xl mb-3 sm:mb-4 text-white leading-tight"
      >
        {title}
      </motion.h2>



      <button
        type="button"
        onClick={onNext}
        className="w-full sm:w-auto px-8 py-3 sm:py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full hover:shadow-2xl hover:shadow-amber-500/20 active:shadow-amber-500/40 transition-shadow text-black border border-amber-400/50 text-base sm:text-lg font-medium touch-manipulation"
      >
        Iniciar configuración
      </button>
    </motion.div>
  );
}
