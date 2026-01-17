"use client";

import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useState, useCallback } from "react";
import type { FormField } from "@/src/onboarding/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
} from "@/src/ui/shadcn";

const FORM_FIELD_ANIMATION_DELAY_INCREMENT = 0.05;

interface StepFormProps {
  title: string;
  subtitle?: string;
  guideText?: string;
  fields: FormField[];
  onNext: (formData: Record<string, string>) => void;
}

export function StepForm({
  title,
  subtitle,
  guideText,
  fields,
  onNext,
}: StepFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showSocialLinks, setShowSocialLinks] = useState(false);

  const handleChange = useCallback((id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  const isFormValid = useCallback(() => {
    return fields
      .filter((field) => field.required === true)
      .every((field) => formData[field.id]?.trim());
  }, [fields, formData]);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      if (isFormValid()) {
        onNext(formData);
      }
    },
    [isFormValid, onNext, formData],
  );

  const handleInputChange = useCallback(
    (fieldId: string, event: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(fieldId, event.target.value);
    },
    [handleChange],
  );

  const handleSelectChange = useCallback(
    (fieldId: string, value: string) => {
      handleChange(fieldId, value);
    },
    [handleChange],
  );

  const handleFieldFocus = useCallback((fieldId: string) => {
    setFocusedField(fieldId);
  }, []);

  const handleFieldBlur = useCallback(() => {
    setFocusedField(null);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 text-white leading-tight"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-zinc-400 mb-3 sm:mb-4"
        >
          {subtitle}
        </motion.p>
      )}

      {guideText && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-6 sm:mb-8 p-3 sm:p-4 bg-gradient-to-r from-amber-500/10 to-blue-500/10 border border-amber-500/20 rounded-xl"
        >
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {guideText}
          </p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {fields
            .filter((field) =>
              ["facebookUrl", "tiktokUrl", "instagramUrl"].includes(field.id)
                ? showSocialLinks
                : true,
            )
            .map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + index * FORM_FIELD_ANIMATION_DELAY_INCREMENT,
                }}
                className={
                  field.id === "firstName" || field.id === "lastName"
                    ? "md:col-span-1"
                    : field.id === "birthDate" || field.id === "gender"
                      ? "md:col-span-1"
                      : field.id === "birthPlace" || field.id === "residence"
                        ? "md:col-span-2"
                        : "md:col-span-2"
                }
              >
              <Label htmlFor={field.id} className="block mb-2">
                {field.label}
                {field.required && (
                  <span className="text-amber-400 ml-1">*</span>
                )}
              </Label>

              {field.type === "select" && field.options ? (
                <Select
                  value={formData[field.id] || ""}
                  onValueChange={(value) =>
                    handleSelectChange(field.id, value)
                  }
                  {...(field.required === true && { required: true })}
                >
                  <SelectTrigger id={field.id} className="w-full">
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  value={formData[field.id] || ""}
                  onChange={(event) => handleInputChange(field.id, event)}
                  onFocus={() => handleFieldFocus(field.id)}
                  onBlur={handleFieldBlur}
                  placeholder={field.placeholder}
                  {...(field.required === true && { required: true })}
                  className={`w-full px-4 py-3 sm:py-3.5 bg-black/40 border-2 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none transition-all backdrop-blur-sm text-base touch-manipulation ${
                    focusedField === field.id
                      ? "border-amber-500 ring-2 ring-amber-500/20"
                      : "border-zinc-800/80 hover:border-zinc-700"
                  }`}
                />
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-zinc-800/80 bg-black/40 px-4 py-3 text-sm text-zinc-300">
          <input
            id="show-social-links"
            type="checkbox"
            checked={showSocialLinks}
            onChange={(event) => setShowSocialLinks(event.target.checked)}
            className="h-4 w-4 rounded border-zinc-700 bg-black/60 text-amber-500 focus:ring-2 focus:ring-amber-500/30"
          />
          <label htmlFor="show-social-links" className="cursor-pointer">
            Agregar redes sociales (opcional)
          </label>
        </div>

        <motion.button
          type="submit"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: isFormValid() ? 1.02 : 1 }}
          whileTap={{ scale: isFormValid() ? 0.98 : 1 }}
          disabled={!isFormValid()}
          className={`mx-auto w-full sm:w-auto min-w-[220px] px-6 sm:px-10 py-3.5 sm:py-4 rounded-full flex items-center justify-center gap-2 transition-all border-2 text-base sm:text-lg touch-manipulation ${
            isFormValid()
              ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:shadow-2xl hover:shadow-amber-500/20 active:shadow-amber-500/40 border-amber-400/50 text-black font-medium"
              : "bg-zinc-900/40 border-zinc-800/80 opacity-40 cursor-not-allowed text-zinc-500"
          }`}
        >
          <span>Continuar</span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </form>
    </motion.div>
  );
}
