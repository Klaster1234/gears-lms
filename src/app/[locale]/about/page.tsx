'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
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
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const programmeFeatures = [
  {
    icon: BookOpen,
    title: '10 Interactive Modules',
    description:
      'From waste management to eco-anxiety, our modules cover the full spectrum of sustainable living topics with quizzes, scenarios, and hands-on activities.',
    color: '#2E7D32',
    bgColor: 'bg-[#E8F5E9]',
  },
  {
    icon: MapPin,
    title: 'City Quests',
    description:
      'Outdoor educational activities connecting classroom learning with real-world sustainability practices in your local community.',
    color: '#33AEB4',
    bgColor: 'bg-[#E0F7FA]',
  },
  {
    icon: BookImage,
    title: 'Educational Comic Book',
    description:
      'Engaging visual storytelling that makes sustainability concepts accessible and memorable for adult learners.',
    color: '#F59E0B',
    bgColor: 'bg-[#FFF8E1]',
  },
  {
    icon: Library,
    title: 'Sustainability Cabinets',
    description:
      'Physical resource collections for community centres and libraries, bringing hands-on sustainability education to local spaces.',
    color: '#1B5E20',
    bgColor: 'bg-[#E8F5E9]',
  },
];

const greenCompDisplayData: Record<
  string,
  { title: string; competences: string }
> = {
  'embodying-values': {
    title: 'Embodying Sustainability Values',
    competences: 'Valuing Sustainability, Supporting Fairness, Promoting Nature',
  },
  'embracing-complexity': {
    title: 'Embracing Complexity',
    competences: 'Systems Thinking, Critical Thinking, Problem Framing',
  },
  'envisioning-futures': {
    title: 'Envisioning Sustainable Futures',
    competences: 'Futures Literacy, Adaptability, Exploratory Thinking',
  },
  'acting-for-sustainability': {
    title: 'Acting for Sustainability',
    competences: 'Political Agency, Collective Action, Individual Initiative',
  },
};

const teamMembers = [
  {
    name: 'Gabriela Meziova',
    role: 'Project Manager',
    org: 'SEQ / YouthFullyYours',
  },
  {
    name: 'Katarina Zvarikova',
    role: 'Education Specialist',
    org: 'SEQ / YouthFullyYours',
  },
  {
    name: 'Marco Pogai',
    role: 'Sustainability Expert',
    org: 'Zielone Slaskie',
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <div className="bg-[#FAFAF5]">
      {/* ============================================================ */}
      {/* 1. Hero / Header Section                                      */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-b from-[#E8F5E9] to-[#FAFAF5] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-medium text-[#2E7D32] shadow-sm">
              <GraduationCap className="h-4 w-4" />
              <span>Erasmus+ KA210-ADU</span>
            </div>
            <h1 className="font-display text-4xl font-bold text-[#1A1A2E] sm:text-5xl">
              About G.E.A.R.S.
            </h1>
            <p className="mt-3 font-display text-xl text-[#2E7D32] sm:text-2xl">
              Green Explorers: Adults Reimagining Sustainability
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#1A1A2E]/70">
              G.E.A.R.S. is an Erasmus+ KA210-ADU project developing innovative
              tools for adult education in sustainable development. Our goal is to
              empower adults with practical knowledge and competences to live more
              sustainably.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. About the Project                                          */}
      {/* ============================================================ */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <h2 className="mb-8 text-center font-display text-3xl font-bold text-[#1A1A2E]">
              About the Project
            </h2>

            <div className="rounded-2xl border border-[#D1D5DB]/60 bg-white p-8 shadow-sm md:p-10">
              {/* Project details */}
              <div className="mb-8 grid gap-4 sm:grid-cols-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#E8F5E9]">
                    <GraduationCap className="h-5 w-5 text-[#2E7D32]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-[#1A1A2E]/40">
                      Programme
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-[#1A1A2E]">
                      {PROJECT.programme}
                    </p>
                    <p className="text-xs text-[#1A1A2E]/50">
                      Small-scale Partnership in Adult Education
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#E0F7FA]">
                    <Hash className="h-5 w-5 text-[#33AEB4]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-[#1A1A2E]/40">
                      Project Number
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-[#1A1A2E]">
                      {PROJECT.projectNumber}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#FFF8E1]">
                    <Calendar className="h-5 w-5 text-[#F59E0B]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-[#1A1A2E]/40">
                      Duration
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-[#1A1A2E]">
                      {PROJECT.duration}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Description paragraphs */}
              <div className="space-y-4 text-[#1A1A2E]/70 leading-relaxed">
                <p>
                  The G.E.A.R.S. project addresses the urgent need for
                  sustainability education among adults. Through 10 interactive
                  learning modules, we guide participants through the journey from
                  understanding basic environmental principles to taking meaningful
                  community action.
                </p>
                <p>
                  Our programme is built around the European GreenComp framework,
                  ensuring that learners develop key sustainability competences
                  recognised across the European Union.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Separator />
      </div>

      {/* ============================================================ */}
      {/* 3. The Programme - What We Offer                              */}
      {/* ============================================================ */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-12 text-center"
          >
            <h2 className="font-display text-3xl font-bold text-[#1A1A2E]">
              What We Offer
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#1A1A2E]/60">
              A comprehensive programme of tools and resources for sustainability
              education.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2"
          >
            {programmeFeatures.map((feature) => (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className="group rounded-2xl border border-[#D1D5DB]/40 bg-white p-8 transition-all duration-300 hover:shadow-lg hover:shadow-[#2E7D32]/8"
              >
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bgColor} transition-transform duration-300 group-hover:scale-110`}
                >
                  <feature.icon
                    className="h-6 w-6"
                    style={{ color: feature.color }}
                  />
                </div>
                <h3 className="mb-3 font-display text-xl font-semibold text-[#1A1A2E]">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-[#1A1A2E]/60">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Separator />
      </div>

      {/* ============================================================ */}
      {/* 4. GreenComp Framework                                        */}
      {/* ============================================================ */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-12 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#E8F5E9] px-4 py-1.5 text-sm font-medium text-[#2E7D32]">
              <span>EU Framework</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-[#1A1A2E]">
              GreenComp Framework
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#1A1A2E]/60">
              Our curriculum is aligned with the European Sustainability Competence
              Framework (GreenComp), which defines the sustainability competences
              that learners need.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {greenCompAreas.map((area) => {
              const display = greenCompDisplayData[area.id];
              return (
                <motion.div
                  key={area.id}
                  variants={cardVariants}
                  className="group relative overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 hover:shadow-lg"
                  style={{ borderColor: `${area.color}30` }}
                >
                  {/* Top color bar */}
                  <div
                    className="absolute top-0 left-0 h-1.5 w-full"
                    style={{ backgroundColor: area.color }}
                  />

                  {/* Icon */}
                  <div
                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${area.color}15` }}
                  >
                    {area.icon}
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-3 font-display text-lg font-semibold"
                    style={{ color: area.color }}
                  >
                    {display?.title ?? area.id}
                  </h3>

                  {/* Competences */}
                  <p className="text-sm leading-relaxed text-[#1A1A2E]/60">
                    {display?.competences ?? ''}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Separator />
      </div>

      {/* ============================================================ */}
      {/* 5. Our Partners                                               */}
      {/* ============================================================ */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-12 text-center"
          >
            <h2 className="font-display text-3xl font-bold text-[#1A1A2E]">
              Our Partners
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#1A1A2E]/60">
              Two organisations united by a shared commitment to sustainability
              education for adults.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-8 md:grid-cols-2"
          >
            {/* Zielone Slaskie */}
            <motion.div
              variants={cardVariants}
              className="flex flex-col rounded-2xl border border-[#D1D5DB]/60 bg-white p-8 shadow-sm"
            >
              <div className="mb-2 inline-flex self-start rounded-full bg-[#E8F5E9] px-3 py-1 text-xs font-semibold text-[#2E7D32]">
                Lead Partner - Poland
              </div>
              <div className="my-6 flex h-20 items-center">
                <Image
                  src={LOGOS.zieloneSlaskie}
                  alt="Stowarzyszenie Zielone Slaskie"
                  width={200}
                  height={80}
                  unoptimized
                  className="h-16 w-auto object-contain"
                />
              </div>
              <h3 className="mb-3 font-display text-xl font-semibold text-[#1A1A2E]">
                Stowarzyszenie Zielone Slaskie
              </h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-[#1A1A2E]/60">
                Zielone Slaskie is a Polish environmental association based in
                Silesia, dedicated to promoting sustainable development,
                environmental education, and community engagement. As the lead
                partner, they coordinate the project and bring expertise in green
                education and community mobilisation.
              </p>
              <a
                href="https://www.zieloneslaskie.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2E7D32] transition-colors hover:text-[#1B5E20]"
              >
                Visit website
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </motion.div>

            {/* SEQ / YouthFullyYours */}
            <motion.div
              variants={cardVariants}
              className="flex flex-col rounded-2xl border border-[#D1D5DB]/60 bg-white p-8 shadow-sm"
            >
              <div className="mb-2 inline-flex self-start rounded-full bg-[#E0F7FA] px-3 py-1 text-xs font-semibold text-[#33AEB4]">
                Partner - Slovakia
              </div>
              <div className="my-6 flex h-20 items-center">
                <Image
                  src={LOGOS.partner}
                  alt="SEQ / YouthFullyYours"
                  width={200}
                  height={80}
                  unoptimized
                  className="h-16 w-auto object-contain"
                />
              </div>
              <h3 className="mb-3 font-display text-xl font-semibold text-[#1A1A2E]">
                SEQ / YouthFullyYours
              </h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-[#1A1A2E]/60">
                SEQ (Slovak Education Quest) / YouthFullyYours is a Slovak
                non-profit organisation specialising in non-formal education, youth
                work, and adult learning. They contribute expertise in educational
                methodology, accreditation systems, and international project
                management.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1A1A2E]/40">
                Website coming soon
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Separator />
      </div>

      {/* ============================================================ */}
      {/* 6. Key People                                                 */}
      {/* ============================================================ */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-12 text-center"
          >
            <h2 className="font-display text-3xl font-bold text-[#1A1A2E]">
              Key People
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#1A1A2E]/60">
              The team behind the G.E.A.R.S. project.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-6 sm:grid-cols-3"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={cardVariants}
                className="flex flex-col items-center rounded-2xl border border-[#D1D5DB]/40 bg-white p-8 text-center transition-all duration-300 hover:shadow-md"
              >
                {/* Avatar placeholder */}
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F5E9]">
                  <Users className="h-7 w-7 text-[#2E7D32]" />
                </div>
                <h3 className="font-display text-lg font-semibold text-[#1A1A2E]">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#2E7D32]">
                  {member.role}
                </p>
                <p className="mt-0.5 text-xs text-[#1A1A2E]/50">{member.org}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Separator />
      </div>

      {/* ============================================================ */}
      {/* 7. EU Funding Section                                         */}
      {/* ============================================================ */}
      <section className="py-16 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col items-center text-center"
          >
            <div className="rounded-2xl border border-[#003399]/15 bg-white p-8 shadow-sm md:p-10">
              <div className="mb-6 flex justify-center">
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

              <Separator className="my-6" />

              <p className="text-sm leading-relaxed text-[#1A1A2E]/60">
                {EU_DISCLAIMER}
              </p>

              <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-[#003399]/20 bg-[#F0F4FF] px-5 py-2">
                <span className="text-xs font-semibold text-[#003399]">
                  {PROJECT.programme}
                </span>
                <div className="h-4 w-px bg-[#003399]/20" />
                <span className="text-xs text-[#003399]/70">
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
