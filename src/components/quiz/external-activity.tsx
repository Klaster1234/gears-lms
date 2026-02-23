'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { t } from '@/lib/quiz-text';

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
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#33AEB4]/10 mb-5">
              <Globe className="size-10 text-[#33AEB4]" />
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
              className="bg-[#33AEB4] hover:bg-[#2a9299] text-white mb-8"
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
                    ? 'border-[#2E7D32] bg-[#2E7D32]/5 cursor-default'
                    : launched
                      ? 'border-[#33AEB4] hover:border-[#33AEB4] bg-[#33AEB4]/5 cursor-pointer'
                      : 'border-border hover:border-[#33AEB4]/30 cursor-pointer'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center shrink-0 border-2 transition-colors ${
                    checked
                      ? 'bg-[#2E7D32] border-[#2E7D32]'
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
                    checked ? 'text-[#2E7D32]' : 'text-[#1A1A2E]'
                  }`}
                >
                  I have completed this activity
                </span>
                {checked && <CheckCircle2 className="size-5 text-[#2E7D32] ml-auto shrink-0" />}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
