import { useTranslations } from 'next-intl';
import { LOGOS, EU_DISCLAIMER, PROJECT } from '@/lib/constants';

export function Footer() {
  const t = useTranslations('common.footer');

  return (
    <footer className="mt-auto w-full bg-[#022C22] text-white/90">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#34D399]/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Partner logos */}
        <div className="flex flex-wrap items-center justify-center gap-10">
          <img
            src={LOGOS.zieloneSlaskie}
            alt="Zielone Slaskie"
            className="h-[120px] w-auto object-contain opacity-90"
          />
          <img
            src={LOGOS.partner}
            alt="Youthfully Yours SK"
            className="h-[120px] w-auto object-contain opacity-90"
          />
        </div>

        {/* EU Co-funded emblem */}
        <div className="mt-10 flex justify-center">
          <img
            src={LOGOS.euCoFunded}
            alt="Co-funded by the European Union"
            className="h-[120px] w-auto object-contain"
          />
        </div>

        {/* EU Disclaimer */}
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-white/40">
          {t('disclaimer')}
        </p>

        {/* Separator */}
        <div className="mx-auto my-10 h-px max-w-2xl bg-white/8" />

        {/* Project info */}
        <div className="text-center">
          <p className="font-display text-lg text-white/80">
            {t('projectInfo')}
          </p>
          <p className="mt-2 text-sm text-white/40">
            {t('programme')} &middot; {t('projectNumber')}
          </p>
        </div>

        {/* Copyright */}
        <p className="mt-8 text-center text-xs text-white/25">
          {t('copyright')}
        </p>
      </div>
    </footer>
  );
}
