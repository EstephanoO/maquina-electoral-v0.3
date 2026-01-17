"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

interface CompletionScreenProps {
  onFinish: () => void;
}

export function CompletionScreen({ onFinish }: CompletionScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl text-center"
    >
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/20">
        <CheckCircle2 className="h-10 w-10 text-amber-400" />
      </div>
      <h2 className="text-3xl sm:text-4xl text-white mb-3">
        Configuracion completada
      </h2>
      <p className="text-sm sm:text-base text-zinc-400 mb-8">
        Tu plan base ya esta listo. Puedes ajustar la estrategia en el tablero
        cuando lo necesites.
      </p>
      <button
        type="button"
        onClick={onFinish}
        className="w-full rounded-full bg-amber-500 px-6 py-3 text-base font-semibold text-black shadow-lg shadow-amber-500/30 transition hover:bg-amber-400"
      >
        Ir al dashboard
      </button>
    </motion.div>
  );
}
