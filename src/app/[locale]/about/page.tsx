'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  BookOpen,
  MapPin,
  BookImage,
  Library,
  ExternalLink,
  Calendar,
  Hash,
  GraduationCap,
  Users,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { LOGOS, EU_DISCLAIMER, PROJECT } from '@/lib/constants';
import { greenCompAreas } from '@/data/greencomp';

/* ------------------------------------------------------------------ */
/*  Static data (non-translatable)                                     */
/* ------------------------------------------------------------------ */

const programmeFeatureKeys = [
  { key: 'modules', icon: BookOpen, color: '#064E3B', bgColor: 'bg-[#ECFDF5]' },
  { key: 'quests', icon: MapPin, color: '#0D9488', bgColor: 'bg-[#F0FDFA]' },
  { key: 'comic', icon: BookImage, color: '#D97706', bgColor: 'bg-[#FFFBEB]' },
  { key: 'cabinets', icon: Library, color: '#047857', bgColor: 'bg-[#ECFDF5]' },
] as const;

const areaToKey: Record<string, string> = {
  'embodying-values': 'embodyingValues',
  'embracing-complexity': 'embracingComplexity',
  'envisioning-futures': 'envisioningFutures',
  'acting-for-sustainability': 'actingForSustainability',
};

const teamMembers = [
  { name: 'Gabriela Meziova', roleKey: 'projectManager', org: 'Youthfully Yours SK' },
  { name: 'Katarina Zvarikova', roleKey: 'educationSpecialist', org: 'Youthfully Yours SK' },
  { name: 'Marco Pogai', roleKey: 'sustainabilityExpert', org: 'Zielone Śląskie' },
];

/* ------------------------------------------------------------------ */
/*  Animation                                                          */
/* ------------------------------------------------------------------ */

const ease = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/*  Reusable section header                                            */
/* ------------------------------------------------------------------ */

function SectionHeader({
  label,
  heading,
  description,
  inView,
  accentColor = '#064E3B',
  light = false,
}: {
  label: string;
  heading: string;
  description?: string;
  inView: boolean;
  accentColor?: string;
  light?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease }}
      className="mb-14"
    >
      <div className="flex items-center gap-4 mb-5">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: 48 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="h-[2px]"
          style={{ backgroundColor: accentColor }}
        />
        <span
          className="text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: accentColor }}
        >
          {label}
        </span>
      </div>
      <h2
        className={`font-display text-3xl font-bold sm:text-4xl lg:text-5xl leading-[1.1] ${
          light ? 'text-white' : 'text-[#1A1A2E]'
        }`}
      >
        {heading}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg max-w-2xl ${
            light ? 'text-white/60' : 'text-[#1A1A2E]/50'
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  const t = useTranslations('about');
  const tg = useTranslations('greencomp');
  const heroRef = useRef(null);
  const projectRef = useRef(null);
  const offerRef = useRef(null);
  const greencompRef = useRef(null);
  const partnersRef = useRef(null);
  const teamRef = useRef(null);
  const euRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const projectInView = useInView(projectRef, { once: true, margin: '-80px' });
  const offerInView = useInView(offerRef, { once: true, margin: '-80px' });
  const greencompInView = useInView(greencompRef, { once: true, margin: '-80px' });
  const partnersInView = useInView(partnersRef, { once: true, margin: '-80px' });
  const teamInView = useInView(teamRef, { once: true, margin: '-80px' });
  const euInView = useInView(euRef, { once: true, margin: '-80px' });

  return (
    <div className="bg-[#FAF8F0] pt-16">

      {/* ============================================================ */}
      {/* 1. Hero                                                       */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden py-24 md:py-36"
      >
        {/* Subtle gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ECFDF5] via-[#FAF8F0] to-[#FAF8F0] pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            {/* Top badge */}
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                initial={{ width: 0 }}
                animate={heroInView ? { width: 48 } : {}}
                transition={{ duration: 0.8, ease, delay: 0.3 }}
                className="h-[2px] bg-[#064E3B]"
              />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#064E3B]">
                {t('erasmusLabel')}
              </span>
            </div>

            <h1 className="font-display text-5xl font-bold text-[#1A1A2E] sm:text-6xl lg:text-7xl leading-[1.05] max-w-3xl">
              {t('title')}
            </h1>

            <p className="mt-4 font-display text-xl text-[#064E3B] sm:text-2xl max-w-2xl">
              {t('subtitle')}
            </p>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#1A1A2E]/60">
              {t('description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. About the Project                                          */}
      {/* ============================================================ */}
      <section ref={projectRef} className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label={t('overviewLabel')}
            heading={t('aboutProject')}
            inView={projectInView}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={projectInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="rounded-2xl border border-[#E5E2DB] bg-white p-8 md:p-12"
          >
            {/* Project details - asymmetric layout */}
            <div className="grid gap-8 md:grid-cols-[1fr_1px_1fr_1px_1fr] md:items-start">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#ECFDF5]">
                  <GraduationCap className="h-5 w-5 text-[#064E3B]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1A2E]/35 mb-1">
                    {t('programmeLabel')}
                  </p>
                  <p className="text-sm font-semibold text-[#1A1A2E]">
                    {PROJECT.programme}
                  </p>
                  <p className="text-xs text-[#1A1A2E]/45 mt-0.5">
                    {t('smallScale')}
                  </p>
                </div>
              </div>

              <div className="hidden md:block w-px bg-[#E5E2DB] self-stretch" />

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#F0FDFA]">
                  <Hash className="h-5 w-5 text-[#0D9488]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1A2E]/35 mb-1">
                    {t('projectNumberLabel')}
                  </p>
                  <p className="text-sm font-semibold text-[#1A1A2E]">
                    {PROJECT.projectNumber}
                  </p>
                </div>
              </div>

              <div className="hidden md:block w-px bg-[#E5E2DB] self-stretch" />

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#FFFBEB]">
                  <Calendar className="h-5 w-5 text-[#D97706]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1A2E]/35 mb-1">
                    {t('durationLabel')}
                  </p>
                  <p className="text-sm font-semibold text-[#1A1A2E]">
                    {PROJECT.duration}
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-8 bg-[#E5E2DB]" />

            {/* Description paragraphs - wider reading column */}
            <div className="max-w-2xl space-y-5 text-[#1A1A2E]/60 leading-relaxed text-[17px]">
              <p>{t('aboutParagraph1')}</p>
              <p>{t('aboutParagraph2')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. What We Offer - DARK section                               */}
      {/* ============================================================ */}
      <section ref={offerRef} className="section-dark bg-[#064E3B] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label={t('programmeLabel')}
            heading={t('whatWeOffer')}
            description={t('whatWeOfferDescription')}
            inView={offerInView}
            accentColor="#34D399"
            light
          />

          <div className="grid gap-6 sm:grid-cols-2">
            {programmeFeatureKeys.map((feature, index) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 30 }}
                animate={offerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.15 + index * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm p-8 transition-all duration-300 hover:bg-white/[0.1] hover:border-white/20"
              >
                <div
                  className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${feature.color}25` }}
                >
                  <feature.icon
                    className="h-6 w-6"
                    style={{ color: '#6EE7B7' }}
                  />
                </div>
                <h3 className="mb-3 font-display text-xl font-semibold text-white">
                  {t(`features.${feature.key}.title`)}
                </h3>
                <p className="leading-relaxed text-white/50">
                  {t(`features.${feature.key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. GreenComp Framework                                        */}
      {/* ============================================================ */}
      <section ref={greencompRef} className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label={t('greencompLabel')}
            heading={t('greencompTitle')}
            description={t('greencompDescription')}
            inView={greencompInView}
            accentColor="#0D9488"
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {greenCompAreas.map((area, index) => {
              const areaKey = areaToKey[area.id];
              return (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={greencompInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, ease, delay: 0.15 + index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-[#E5E2DB] bg-white p-7 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(6,78,59,0.08)]"
                >
                  {/* Top color bar */}
                  <div
                    className="absolute top-0 left-0 h-1 w-full"
                    style={{ backgroundColor: area.color }}
                  />

                  {/* Icon */}
                  <div
                    className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${area.color}12` }}
                  >
                    {area.icon}
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-3 font-display text-lg font-semibold"
                    style={{ color: area.color }}
                  >
                    {areaKey ? tg(`areas.${areaKey}.title`) : area.id}
                  </h3>

                  {/* Competences */}
                  <p className="text-sm leading-relaxed text-[#1A1A2E]/50">
                    {areaKey ? tg(`areas.${areaKey}.description`) : ''}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. Our Partners                                               */}
      {/* ============================================================ */}
      <section ref={partnersRef} className="section-dark bg-[#064E3B] py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label={t('collaborationLabel')}
            heading={t('ourPartners')}
            description={t('partnersDescription')}
            inView={partnersInView}
            accentColor="#6EE7B7"
            light
          />

          <div className="grid gap-8 md:grid-cols-2">
            {/* Zielone Slaskie */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={partnersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm p-8"
            >
              <div className="mb-3 inline-flex self-start rounded-full bg-[#34D399]/15 px-3 py-1 text-xs font-semibold text-[#6EE7B7]">
                {t('leadPartner')}
              </div>
              <div className="my-6 flex h-20 items-center">
                <Image
                  src={LOGOS.zieloneSlaskie}
                  alt={t('zsName')}
                  width={200}
                  height={80}
                  unoptimized
                  className="h-16 w-auto object-contain brightness-0 invert opacity-80"
                />
              </div>
              <h3 className="mb-3 font-display text-xl font-semibold text-white">
                {t('zsName')}
              </h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-white/50">
                {t('zsDescription')}
              </p>
              <a
                href="https://www.zieloneslaskie.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6EE7B7] transition-colors hover:text-[#34D399]"
              >
                {t('visitWebsite')}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </motion.div>

            {/* Youthfully Yours SK */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={partnersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.35 }}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm p-8"
            >
              <div className="mb-3 inline-flex self-start rounded-full bg-[#0D9488]/20 px-3 py-1 text-xs font-semibold text-[#5EEAD4]">
                {t('partner')}
              </div>
              <div className="my-6 flex h-20 items-center">
                <Image
                  src={LOGOS.partner}
                  alt={t('seqName')}
                  width={200}
                  height={80}
                  unoptimized
                  className="h-16 w-auto object-contain brightness-0 invert opacity-80"
                />
              </div>
              <h3 className="mb-3 font-display text-xl font-semibold text-white">
                {t('seqName')}
              </h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-white/50">
                {t('seqDescription')}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white/30">
                {t('websiteComingSoon')}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. Key People                                                 */}
      {/* ============================================================ */}
      <section ref={teamRef} className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label={t('teamLabel')}
            heading={t('keyPeople')}
            description={t('teamDescription')}
            inView={teamInView}
            accentColor="#047857"
          />

          <div className="grid gap-6 sm:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 25 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.15 + index * 0.12 }}
                className="flex flex-col items-center rounded-2xl border border-[#E5E2DB] bg-white p-8 text-center transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(6,78,59,0.08)]"
              >
                {/* Avatar placeholder */}
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF5] border border-[#064E3B]/10">
                  <Users className="h-7 w-7 text-[#064E3B]" />
                </div>
                <h3 className="font-display text-lg font-semibold text-[#1A1A2E]">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#064E3B]">
                  {t(`roles.${member.roleKey}`)}
                </p>
                <p className="mt-0.5 text-xs text-[#1A1A2E]/40">{member.org}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. EU Funding Section                                         */}
      {/* ============================================================ */}
      <section ref={euRef} className="py-20 pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={euInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="flex flex-col items-center text-center"
          >
            <div className="rounded-2xl border border-[#003399]/15 bg-white p-8 md:p-12 w-full">
              <div className="mb-8 flex justify-center">
                <Image
                  src={LOGOS.euCoFunded}
                  alt="Co-funded by the European Union"
                  width={200}
                  height={50}
                  unoptimized
                  className="h-auto w-auto"
                  style={{ minWidth: '120px' }}
                />
              </div>

              <Separator className="my-6 bg-[#E5E2DB]" />

              <p className="text-sm leading-relaxed text-[#1A1A2E]/50">
                {EU_DISCLAIMER}
              </p>

              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#003399]/15 bg-[#F0F4FF] px-5 py-2.5">
                <span className="text-xs font-semibold text-[#003399]">
                  {PROJECT.programme}
                </span>
                <div className="h-4 w-px bg-[#003399]/20" />
                <span className="text-xs text-[#003399]/60">
                  {PROJECT.projectNumber}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
