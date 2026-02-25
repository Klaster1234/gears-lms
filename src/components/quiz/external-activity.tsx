'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

interface ExternalActivityProps {
  url: string;
  titleKey: string;
  descriptionKey?: string;
  alreadyCompleted: boolean;
  onComplete: () => void;
}

export function ExternalActivity({
  url,
  titleKey,
  descriptionKey,
  alreadyCompleted,
  onComplete,
}: ExternalActivityProps) {
  const t = useTranslations();
  const [checked, setChecked] = useState(alreadyCompleted);
  const [launched, setLaunched] = useState(false);

  const handleLaunch = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setLaunched(true);
  };

  const handleToggleComplete = () => {
    if (!checked) {
      setChecked(true);
      onComplete();
    }
  };

  const title = t(titleKey);
  const description = descriptionKey ? t(descriptionKey) : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="pt-2">
          <div className="flex flex-col items-center text-center py-4">
            {/* Icon */}
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#0D9488]/10 mb-5">
              <Globe className="size-10 text-[#0D9488]" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">{title}</h3>

            {/* Description */}
            {description && (
              <p className="text-sm text-muted-foreground max-w-md mb-6">{description}</p>
            )}

            {/* Launch button */}
            <Button
              size="lg"
              className="bg-[#0D9488] hover:bg-[#0F766E] text-white mb-8"
              onClick={handleLaunch}
            >
              <ExternalLink className="size-4" />
              Launch Activity
            </Button>

            {/* Completion checkbox */}
            <div className="w-full max-w-sm">
              <button
                type="button"
                onClick={handleToggleComplete}
                disabled={checked}
                className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left ${
                  checked
                    ? 'border-[#064E3B] bg-[#064E3B]/5 cursor-default'
                    : launched
                      ? 'border-[#0D9488] hover:border-[#0D9488] bg-[#0D9488]/5 cursor-pointer'
                      : 'border-border hover:border-[#0D9488]/30 cursor-pointer'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center shrink-0 border-2 transition-colors ${
                    checked
                      ? 'bg-[#064E3B] border-[#064E3B]'
                      : 'border-muted-foreground/30'
                  }`}
                >
                  {checked && (
                    <svg
                      className="w-4 h-4 text-white"
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
                <span
                  className={`text-sm font-medium ${
                    checked ? 'text-[#064E3B]' : 'text-[#1A1A2E]'
                  }`}
                >
                  I have completed this activity
                </span>
                {checked && <CheckCircle2 className="size-5 text-[#064E3B] ml-auto shrink-0" />}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
