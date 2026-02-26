'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  const t = useTranslations('landing');
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden bg-[#022C22]"
    >
      {/* Papercut illustration background */}
      <motion.div
        style={{ y: backgroundY }}
        className="pointer-events-none absolute inset-0"
      >
        <Image
          src="/art/hero-papercut.png"
          alt=""
          fill
          className="object-cover opacity-25 mix-blend-luminosity"
          sizes="100vw"
          priority
        />
        <div className="absolute -top-[20%] -right-[10%] h-[700px] w-[700px] animate-morph bg-[#064E3B] opacity-40" />
        <div
          className="absolute -bottom-[15%] -left-[8%] h-[500px] w-[500px] animate-morph bg-[#047857] opacity-20"
          style={{ animationDelay: '-5s' }}
        />
        <div
          className="absolute top-[30%] left-[60%] h-[300px] w-[300px] animate-morph bg-[#0D9488] opacity-10"
          style={{ animationDelay: '-10s' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(52,211,153,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(13,148,136,0.06),transparent_50%)]" />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#022C22] via-[#022C22]/60 to-[#022C22]/80" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex min-h-[100dvh] items-center"
      >
        <div className="mx-auto w-full max-w-7xl px-6 py-32 lg:px-8">
          <div className="max-w-4xl">
            {/* Logo badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-sm">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                  <path
                    d="M12 3C7 3 3 8 3 13c0 4 3 8 9 8 0 0 0-8 0-18z"
                    fill="#34D399"
                  />
                  <path
                    d="M12 3c5 0 9 5 9 10 0 4-3 8-9 8 0 0 0-8 0-18z"
                    fill="#6EE7B7"
                    fillOpacity="0.5"
                  />
                </svg>
                <span className="text-sm font-medium tracking-wide text-[#6EE7B7]">
                  Erasmus+ KA210-ADU
                </span>
              </div>
            </motion.div>

            {/* Main heading - editorial serif */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl leading-[1.05] tracking-[-0.02em] text-white sm:text-7xl lg:text-[5.5rem]"
              >
                {t('hero.title')}
              </motion.h1>
            </div>

            <div className="mt-2 overflow-hidden">
              <motion.p
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-2xl tracking-[-0.01em] text-[#34D399] sm:text-3xl lg:text-4xl"
              >
                {t('hero.subtitle')}
              </motion.p>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl"
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12"
            >
              <Link
                href="/modules"
                className="group inline-flex items-center gap-3 rounded-full bg-[#ECFDF5] px-8 py-4 text-base font-medium text-[#064E3B] transition-all duration-500 hover:bg-white hover:shadow-[0_20px_60px_-12px_rgba(52,211,153,0.3)]"
              >
                <span>{t('hero.cta')}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-[#34D399]/40 to-transparent"
          style={{ transformOrigin: 'left' }}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5"
        >
          <motion.div className="h-2 w-1 rounded-full bg-[#34D399]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
