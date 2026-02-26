'use client';

import { useState } from 'react';
import { User, Eye } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLearningStore } from '@/store/learning-store';

interface CertificateFormProps {
  onPreview: () => void;
}

export function CertificateForm({ onPreview }: CertificateFormProps) {
  const t = useTranslations('certificate');
  const certificateName = useLearningStore((s) => s.certificateName);
  const setCertificateName = useLearningStore((s) => s.setCertificateName);
  const [name, setName] = useState(certificateName || '');

  const handlePreview = () => {
    if (name.trim()) {
      setCertificateName(name.trim());
      onPreview();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && name.trim()) {
      handlePreview();
    }
  };

  return (
    <Card className="mx-auto max-w-md border border-[#E5E2DB] bg-white rounded-2xl shadow-none">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#ECFDF5] border border-[#064E3B]/10">
          <User className="size-6 text-[#064E3B]" />
        </div>
        <CardTitle className="text-xl font-display text-[#1A1A2E]">{t('enterName')}</CardTitle>
        <p className="text-sm text-[#1A1A2E]/50 mt-1">
          {t('namePlaceholder')}
        </p>
      </CardHeader>
      <CardContent className="space-y-5 pt-0">
        <div className="space-y-2">
          <Label htmlFor="certificateName" className="text-[#1A1A2E]/70 text-sm">
            {t('enterName')}
          </Label>
          <Input
            id="certificateName"
            placeholder="e.g. Maria Kowalska"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="border-[#E5E2DB] focus:border-[#064E3B] focus:ring-[#064E3B]/20 bg-[#FAF8F0]/50"
          />
        </div>
        <Button
          onClick={handlePreview}
          disabled={!name.trim()}
          className="w-full bg-[#064E3B] hover:bg-[#047857] text-white transition-colors duration-300"
        >
          <Eye className="size-4 mr-1" />
          {t('preview')}
        </Button>
      </CardContent>
    </Card>
  );
}
