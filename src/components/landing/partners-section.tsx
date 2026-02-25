'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { LOGOS, PROJECT } from '@/lib/constants';
import { ExternalLink } from 'lucide-react';

interface Partner {
  name: string;
  city: string;
  country: string;
  logo: string;
  description: string;
  url: string;
}

const partners: Partner[] = [
  {
    name: 'Zielone Slaskie',
    city: 'Gliwice',
    country: 'Poland',
    logo: LOGOS.zieloneSlaskie,
    description:
      'An environmental association from Upper Silesia promoting green lifestyles, ecological education, and sustainable community development.',
    url: 'https://www.zieloneslaskie.pl/',
  },
  {
    name: 'Slovak Eco Quality',
    city: 'Bratislava',
    country: 'Slovakia',
    logo: LOGOS.partner,
    description:
      'A Slovak organisation dedicated to promoting quality and sustainability through education, certification, and community engagement.',
    url: 'https://seq.sk/',
  },
];

export function PartnersSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FAF8F0] py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 48 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 h-[2px] bg-[#064E3B]"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#0D9488]"
          >
            Partnership
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl text-[#1A1A2E] sm:text-5xl"
          >
            An Erasmus+ Collaboration
          </motion.h2>
        </div>

        {/* Partner cards */}
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {partners.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.3 + index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative overflow-hidden rounded-2xl border border-[#E5E2DB] bg-white p-8 transition-all duration-500 hover:border-[#064E3B]/20 hover:shadow-[0_20px_60px_-15px_rgba(6,78,59,0.08)] lg:p-10"
            >
              {/* Logo */}
              <div className="mb-8 flex h-16 items-center">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={180}
                  height={64}
                  className="h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              </div>

              {/* Name */}
              <h3 className="mb-1 text-xl font-semibold text-[#1A1A2E]">
                {partner.name}
              </h3>
              <p className="mb-5 text-sm text-[#1A1A2E]/40">
                {partner.city}, {partner.country}
              </p>

              {/* Description */}
              <p className="text-[15px] leading-relaxed text-[#1A1A2E]/55">
                {partner.description}
              </p>

              {/* Link indicator */}
              <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-[#064E3B] opacity-0 transition-all duration-300 group-hover:opacity-100">
                Visit website
                <ExternalLink className="h-3.5 w-3.5" />
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#064E3B] transition-all duration-500 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        {/* EU badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-4 rounded-full border border-[#E5E2DB] bg-white px-6 py-3">
            <Image
              src={LOGOS.euCoFunded}
              alt="Co-funded by the European Union"
              width={160}
              height={40}
              className="h-8 w-auto"
              unoptimized
            />
            <div className="h-5 w-px bg-[#E5E2DB]" />
            <span className="text-sm font-medium text-[#003399]">
              {PROJECT.programme}
            </span>
          </div>
          <p className="mt-3 text-xs text-[#1A1A2E]/30">
            Project No: {PROJECT.projectNumber}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
