'use client';

import { motion } from 'framer-motion';
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
      'An environmental association from Upper Silesia promoting green lifestyles, ecological education, and sustainable community development across Poland.',
    url: 'https://www.zieloneslaskie.pl/',
  },
  {
    name: 'Slovak Eco Quality',
    city: 'Bratislava',
    country: 'Slovakia',
    logo: LOGOS.partner,
    description:
      'A Slovak organisation dedicated to promoting quality and sustainability through education, certification, and community engagement initiatives.',
    url: 'https://seq.sk/',
  },
];

export function PartnersSection() {
  return (
    <section className="bg-[#FAFAF5] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2 className="font-display text-3xl font-bold text-[#1A1A2E] sm:text-4xl">
            An Erasmus+ Partnership
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#1A1A2E]/60">
            Green Explorers is developed by two partner organisations united by a shared commitment to sustainability education for adults.
          </p>
        </motion.div>

        {/* Partner cards */}
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {partners.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group flex flex-col items-center rounded-2xl border border-[#D1D5DB]/60 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#2E7D32]/8"
            >
              {/* Logo */}
              <div className="mb-6 flex h-20 items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={180}
                  height={80}
                  className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Name */}
              <h3 className="mb-1 font-display text-xl font-semibold text-[#1A1A2E] group-hover:text-[#2E7D32]">
                {partner.name}
              </h3>

              {/* Location */}
              <p className="mb-4 text-sm text-[#1A1A2E]/50">
                {partner.city}, {partner.country}
              </p>

              {/* Description */}
              <p className="mb-4 text-sm leading-relaxed text-[#1A1A2E]/60">
                {partner.description}
              </p>

              {/* Link indicator */}
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2E7D32] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Visit website
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </motion.a>
          ))}
        </div>

        {/* Erasmus+ badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-[#003399]/20 bg-white px-6 py-3 shadow-sm">
            <Image
              src={LOGOS.euCoFunded}
              alt="Co-funded by the European Union"
              width={160}
              height={40}
              className="h-8 w-auto"
            />
            <div className="h-6 w-px bg-[#D1D5DB]" />
            <span className="text-sm font-semibold text-[#003399]">
              {PROJECT.programme}
            </span>
          </div>
          <p className="max-w-md text-center text-xs text-[#1A1A2E]/40">
            Project No: {PROJECT.projectNumber}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
