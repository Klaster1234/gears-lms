'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Heart,
  Leaf,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTranslations } from 'next-intl';
import type { GuidedFormStep } from '@/types';

interface GuidedFormProps {
  steps: GuidedFormStep[];
  onComplete: () => void;
}

const scaleEmojis = ['1', '2', '3', '4', '5'];

export function GuidedForm({ steps, onComplete }: GuidedFormProps) {
  const t = useTranslations();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string[]>>({});
  const [completed, setCompleted] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const step = steps[currentStep];
  const progressPercent = ((currentStep + 1) / steps.length) * 100;
  const currentSelections = formData[step?.id] || [];

  const handleCheckboxToggle = useCallback(
    (key: string) => {
      if (!step) return;
      setFormData((prev) => {
        const current = prev[step.id] || [];
        const updated = current.includes(key)
          ? current.filter((k) => k !== key)
          : [...current, key];
        return { ...prev, [step.id]: updated };
      });
    },
    [step]
  );

  const handleRadioSelect = useCallback(
    (key: string) => {
      if (!step) return;
      setFormData((prev) => ({ ...prev, [step.id]: [key] }));
    },
    [step]
  );

  const handleScaleSelect = useCallback(
    (key: string) => {
      if (!step) return;
      setFormData((prev) => ({ ...prev, [step.id]: [key] }));
    },
    [step]
  );

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      setCompleted(true);
      onComplete();
    }
  }, [currentStep, steps.length, onComplete]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const canProceed = currentSelections.length > 0;

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card>
          <CardContent className="py-8">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                className="flex items-center justify-center w-20 h-20 rounded-full bg-[#0D9488]/10 mb-4"
              >
                <Heart className="size-10 text-[#0D9488]" />
              </motion.div>

              <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">
                Reflection Complete
              </h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md">
                Thank you for taking the time to reflect on your feelings and actions.
                Remember: acknowledging eco-anxiety is the first step toward positive change.
              </p>

              {/* Summary */}
              <div className="w-full max-w-md space-y-3 text-left">
                {steps.map((s) => {
                  const selections = formData[s.id] || [];
                  if (selections.length === 0) return null;

                  return (
                    <div
                      key={s.id}
                      className="p-3 rounded-lg bg-muted/50 border border-border/60"
                    >
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        {t(s.titleKey)}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {selections.map((sel) => {
                          const option = s.options?.find((o) => o.key === sel);
                          return (
                            <span
                              key={sel}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0D9488]/10 text-[#0D9488] text-xs font-medium"
                            >
                              <Leaf className="size-3" />
                              {option ? t(option.labelKey) : sel}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center gap-2 text-[#064E3B] font-medium">
                <CheckCircle2 className="size-5" />
                <span>Activity completed</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (!step) return null;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Step {currentStep + 1} of {steps.length}
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step.id}
          custom={direction}
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className="pt-2">
              <h3 className="text-lg font-semibold text-[#1A1A2E] mb-5">
                {t(step.titleKey)}
              </h3>

              {/* Checkbox type */}
              {step.type === 'checkbox' && step.options && (
                <div className="space-y-2.5">
                  {step.options.map((option) => {
                    const isSelected = currentSelections.includes(option.key);
                    return (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => handleCheckboxToggle(option.key)}
                        className={`w-full flex items-center gap-3 p-3.5 rounded-lg border-2 transition-all text-left ${
                          isSelected
                            ? 'border-[#0D9488] bg-[#0D9488]/5'
                            : 'border-border hover:border-[#0D9488]/30'
                        } cursor-pointer`}
                      >
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 transition-colors ${
                            isSelected
                              ? 'bg-[#0D9488] border-[#0D9488]'
                              : 'border-muted-foreground/30'
                          }`}
                        >
                          {isSelected && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm font-medium text-[#1A1A2E]">
                          {t(option.labelKey)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Radio type */}
              {step.type === 'radio' && step.options && (
                <div className="space-y-2.5">
                  {step.options.map((option) => {
                    const isSelected = currentSelections.includes(option.key);
                    return (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => handleRadioSelect(option.key)}
                        className={`w-full flex items-center gap-3 p-3.5 rounded-lg border-2 transition-all text-left ${
                          isSelected
                            ? 'border-[#0D9488] bg-[#0D9488]/5'
                            : 'border-border hover:border-[#0D9488]/30'
                        } cursor-pointer`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                            isSelected
                              ? 'border-[#0D9488] bg-[#0D9488]'
                              : 'border-muted-foreground/30'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className="text-sm font-medium text-[#1A1A2E]">
                          {t(option.labelKey)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Scale type */}
              {step.type === 'scale' && step.options && (
                <div className="space-y-4">
                  <div className="flex justify-center gap-3">
                    {step.options.map((option, index) => {
                      const isSelected = currentSelections.includes(option.key);
                      return (
                        <button
                          key={option.key}
                          type="button"
                          onClick={() => handleScaleSelect(option.key)}
                          className="flex flex-col items-center gap-2"
                        >
                          <div
                            className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
                              isSelected
                                ? 'bg-[#0D9488] text-white scale-110 shadow-lg'
                                : 'bg-muted text-muted-foreground hover:bg-[#0D9488]/20'
                            } cursor-pointer`}
                          >
                            {scaleEmojis[index]}
                          </div>
                          <span
                            className={`text-[10px] text-center max-w-[60px] leading-tight ${
                              isSelected
                                ? 'text-[#0D9488] font-medium'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {t(option.labelKey)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="size-4" />
          Previous
        </Button>

        <Button
          className="bg-[#0D9488] hover:bg-[#0F766E] text-white"
          onClick={handleNext}
          disabled={!canProceed}
        >
          {currentStep < steps.length - 1 ? (
            <>
              Next
              <ArrowRight className="size-4" />
            </>
          ) : (
            <>
              Complete
              <CheckCircle2 className="size-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
