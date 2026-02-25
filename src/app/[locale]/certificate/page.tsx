'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { useLearningStore, useStoreHydration } from '@/store/learning-store';
import { CertificateForm } from '@/components/certificate/certificate-form';
import { CertificatePreview } from '@/components/certificate/certificate-preview';

const ease = [0.16, 1, 0.3, 1] as const;

export default function CertificatePage() {
  const hydrated = useStoreHydration();
  const certificateEarned = useLearningStore((s) => s.certificateEarned);
  const certificateName = useLearningStore((s) => s.certificateName);
  const [showPreview, setShowPreview] = useState(false);

  // Show loading state until hydrated
  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#FAF8F0] pt-16">
        <div className="container mx-auto max-w-5xl px-4 py-20 text-center">
          <div className="animate-pulse">
            <div className="mx-auto h-8 w-64 rounded bg-[#E5E2DB]" />
            <div className="mx-auto mt-4 h-4 w-48 rounded bg-[#E5E2DB]" />
          </div>
        </div>
      </div>
    );
  }

  // Not all modules completed
  if (!certificateEarned) {
    return (
      <div className="min-h-screen bg-[#FAF8F0] pt-16">
        <div className="container mx-auto max-w-lg px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="rounded-2xl border border-[#E5E2DB] bg-white p-10 text-center"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#FEF3C7] border border-[#D97706]/15">
              <AlertTriangle className="size-7 text-[#D97706]" />
            </div>
            <h1 className="text-2xl font-bold font-display text-[#1A1A2E] mb-3">
              Certificate Not Yet Available
            </h1>
            <p className="text-[#1A1A2E]/50 mb-8">
              Complete all 10 modules to earn your certificate of completion.
            </p>
            <Button asChild className="bg-[#064E3B] hover:bg-[#047857] text-white px-8 transition-colors duration-300">
              <Link href="/progress">
                View Your Progress
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F0] pt-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Page header - hidden in print */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="pt-16 pb-12 md:pt-20 md:pb-16 no-print"
        >
          {/* Animated accent line + label */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="h-[2px] bg-[#064E3B]"
            />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#064E3B]">
              Achievement
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold text-[#1A1A2E] sm:text-5xl leading-[1.1]">
            Your Certificate
          </h1>
          <p className="mt-4 text-lg text-[#1A1A2E]/50 max-w-xl">
            Generate and download your certificate of completion
          </p>
        </motion.div>

        {/* Form or Preview */}
        {!showPreview ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.3 }}
            className="pb-20"
          >
            <CertificateForm onPreview={() => setShowPreview(true)} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease }}
            className="pb-20"
          >
            <CertificatePreview name={certificateName} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
