'use client';

import { Download, ArrowLeft } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { greenCompAreas } from '@/data/greencomp';

const areaToKey: Record<string, string> = {
  'embodying-values': 'embodyingValues',
  'embracing-complexity': 'embracingComplexity',
  'envisioning-futures': 'envisioningFutures',
  'acting-for-sustainability': 'actingForSustainability',
};

interface CertificatePreviewProps {
  name: string;
}

export function CertificatePreview({ name }: CertificatePreviewProps) {
  const t = useTranslations('certificate');
  const tg = useTranslations('greencomp.areas');
  const tf = useTranslations('common.footer');
  const locale = useLocale();

  const today = new Date();
  const formattedDate = today.toLocaleDateString(locale === 'pl' ? 'pl-PL' : locale === 'sk' ? 'sk-SK' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Controls - hidden in print */}
      <div className="flex items-center justify-between no-print">
        <Button variant="outline" asChild className="border-[#E5E2DB] text-[#1A1A2E]/70 hover:bg-[#FAF8F0]">
          <Link href="/progress">
            <ArrowLeft className="size-4 mr-1" />
            {t('backToProgress')}
          </Link>
        </Button>
        <Button onClick={handleDownload} className="bg-[#064E3B] hover:bg-[#047857] text-white">
          <Download className="size-4 mr-1" />
          {t('download')}
        </Button>
      </div>

      {/* Certificate */}
      <div
        id="certificate"
        className="certificate-container mx-auto bg-white"
        style={{
          width: '297mm',
          maxWidth: '100%',
          aspectRatio: '297 / 210',
          padding: '16mm',
          position: 'relative',
        }}
      >
        {/* Outer decorative border */}
        <div
          style={{
            position: 'absolute',
            inset: '8mm',
            border: '3px solid #064E3B',
            borderRadius: '4px',
            pointerEvents: 'none',
          }}
        />
        {/* Inner accent line */}
        <div
          style={{
            position: 'absolute',
            inset: '11mm',
            border: '1px solid #D97706',
            borderRadius: '2px',
            pointerEvents: 'none',
          }}
        />

        {/* Certificate content */}
        <div
          className="flex flex-col items-center justify-between text-center"
          style={{ height: '100%', position: 'relative', zIndex: 1, padding: '8mm 12mm' }}
        >
          {/* Top section */}
          <div className="flex flex-col items-center gap-2">
            <h1
              className="font-display tracking-[0.3em] uppercase"
              style={{
                color: '#1A1A2E',
                fontSize: 'clamp(18px, 2.5vw, 32px)',
                fontWeight: 700,
                letterSpacing: '0.3em',
                margin: 0,
              }}
            >
              {t('title')}
            </h1>
            <div
              style={{
                width: '80px',
                height: '2px',
                backgroundColor: '#D97706',
                margin: '4px 0',
              }}
            />
            <p
              style={{
                color: '#6B7280',
                fontSize: 'clamp(11px, 1.2vw, 16px)',
                margin: 0,
              }}
            >
              {t('certifies')}
            </p>
          </div>

          {/* Name */}
          <div className="flex flex-col items-center gap-1">
            <h2
              className="font-display"
              style={{
                color: '#064E3B',
                fontSize: 'clamp(22px, 3.5vw, 44px)',
                fontWeight: 700,
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {name}
            </h2>
            <p
              style={{
                color: '#6B7280',
                fontSize: 'clamp(11px, 1.2vw, 16px)',
                margin: 0,
              }}
            >
              {t('hasCompleted')}
            </p>
          </div>

          {/* Programme title */}
          <div className="flex flex-col items-center gap-1">
            <h3
              className="font-display"
              style={{
                color: '#1A1A2E',
                fontSize: 'clamp(24px, 3vw, 40px)',
                fontWeight: 800,
                letterSpacing: '0.05em',
                margin: 0,
              }}
            >
              G.E.A.R.S.
            </h3>
            <p
              style={{
                color: '#1A1A2E',
                fontSize: 'clamp(12px, 1.3vw, 18px)',
                fontWeight: 500,
                margin: 0,
              }}
            >
              Green Explorers: Adults Reimagining Sustainability
            </p>
            <p
              style={{
                color: '#6B7280',
                fontSize: 'clamp(9px, 1vw, 13px)',
                maxWidth: '500px',
                margin: '4px 0 0 0',
              }}
            >
              {t('programmeDescription')}
            </p>
          </div>

          {/* GreenComp area badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {greenCompAreas.map((area) => {
              const areaKey = areaToKey[area.id];
              return (
                <div key={area.id} className="flex items-center gap-1.5">
                  <div
                    style={{
                      width: 'clamp(16px, 1.5vw, 24px)',
                      height: 'clamp(16px, 1.5vw, 24px)',
                      borderRadius: '50%',
                      backgroundColor: area.color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      color: '#374151',
                      fontSize: 'clamp(8px, 0.9vw, 12px)',
                      fontWeight: 500,
                    }}
                  >
                    {areaKey ? tg(`${areaKey}.title`) : area.id}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Date and programme info */}
          <div className="flex flex-col items-center gap-2">
            <p
              style={{
                color: '#374151',
                fontSize: 'clamp(10px, 1.1vw, 14px)',
                margin: 0,
              }}
            >
              {t('dateOfCompletion')}: <strong>{formattedDate}</strong>
            </p>

            {/* Erasmus+ badge */}
            <div
              className="flex items-center gap-2 rounded-md px-3 py-1.5"
              style={{
                backgroundColor: '#003399',
                color: '#FFFFFF',
              }}
            >
              <span style={{ fontSize: 'clamp(8px, 0.8vw, 11px)', fontWeight: 600 }}>
                Erasmus+ KA210-ADU
              </span>
            </div>

            <p
              style={{
                color: '#6B7280',
                fontSize: 'clamp(8px, 0.8vw, 11px)',
                margin: 0,
              }}
            >
              Project: 2024-2-PL01-KA210-ADU-000279352
            </p>

            <p
              style={{
                color: '#374151',
                fontSize: 'clamp(9px, 0.9vw, 12px)',
                fontWeight: 500,
                margin: 0,
              }}
            >
              Zielone Slaskie (PL) &bull; SEQ / YouthFullyYours (SK)
            </p>
          </div>

          {/* EU disclaimer */}
          <p
            style={{
              color: '#9CA3AF',
              fontSize: 'clamp(7px, 0.65vw, 9px)',
              maxWidth: '600px',
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {tf('disclaimer')}
          </p>
        </div>
      </div>
    </div>
  );
}
