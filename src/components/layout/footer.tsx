import { LOGOS, EU_DISCLAIMER, PROJECT } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="mt-auto w-full bg-[#1A1A2E] text-white/90">
      <div className="container mx-auto px-4 py-10">
        {/* Partner logos row */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          <img
            src={LOGOS.zieloneSlaskie}
            alt="Zielone Slaskie"
            className="h-[120px] w-auto object-contain"
          />
          <img
            src={LOGOS.partner}
            alt="SEQ Partner"
            className="h-[120px] w-auto object-contain"
          />
        </div>

        {/* EU Co-funded emblem - must be at least as large as partner logos */}
        <div className="mt-8 flex justify-center">
          <img
            src={LOGOS.euCoFunded}
            alt="Co-funded by the European Union"
            className="h-[120px] w-auto object-contain"
          />
        </div>

        {/* EU Disclaimer text - MANDATORY for Erasmus+ projects */}
        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-white/60">
          {EU_DISCLAIMER}
        </p>

        {/* Separator */}
        <div className="mx-auto my-6 h-px max-w-2xl bg-white/10" />

        {/* Project info line */}
        <div className="text-center text-sm text-white/70">
          <p className="font-medium">
            {PROJECT.fullName}
          </p>
          <p className="mt-1">
            {PROJECT.programme} &middot; {PROJECT.projectNumber}
          </p>
        </div>

        {/* Copyright line */}
        <p className="mt-4 text-center text-xs text-white/50">
          &copy; 2025-2027 Green Explorers Consortium
        </p>
      </div>
    </footer>
  );
}
