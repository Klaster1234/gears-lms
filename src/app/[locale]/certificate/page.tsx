'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { useLearningStore, useStoreHydration } from '@/store/learning-store';
import { CertificateForm } from '@/components/certificate/certificate-form';
import { CertificatePreview } from '@/components/certificate/certificate-preview';

export default function CertificatePage() {
  const hydrated = useStoreHydration();
  const certificateEarned = useLearningStore((s) => s.certificateEarned);
  const certificateName = useLearningStore((s) => s.certificateName);
  const [showPreview, setShowPreview] = useState(false);

  // Show loading state until hydrated
  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#FAFAF5]">
        <div className="container mx-auto max-w-5xl px-4 py-20 text-center">
          <div className="animate-pulse">
            <div className="mx-auto h-8 w-64 rounded bg-muted" />
            <div className="mx-auto mt-4 h-4 w-48 rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  // Not all modules completed
  if (!certificateEarned) {
    return (
      <div className="min-h-screen bg-[#FAFAF5]">
        <div className="container mx-auto max-w-lg px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border bg-card p-8 text-center"
          >
            <AlertTriangle className="mx-auto size-12 text-[#F59E0B] mb-4" />
            <h1 className="text-2xl font-bold font-display text-[#1A1A2E] mb-2">
              Certificate Not Yet Available
            </h1>
            <p className="text-muted-foreground mb-6">
              Complete all 10 modules to earn your certificate of completion.
            </p>
            <Button asChild className="bg-[#2E7D32] hover:bg-[#1B5E20]">
              <Link href="/progress">
                View Your Progress
                <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <div className="container mx-auto max-w-5xl px-4 py-12">
        {/* Page title - hidden in print */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 no-print"
        >
          <h1 className="text-3xl font-bold font-display text-[#1A1A2E] sm:text-4xl">
            Your Certificate
          </h1>
          <p className="mt-2 text-muted-foreground">
            Generate and download your certificate of completion
          </p>
        </motion.div>

        {/* Form or Preview */}
        {!showPreview ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CertificateForm onPreview={() => setShowPreview(true)} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <CertificatePreview name={certificateName} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
