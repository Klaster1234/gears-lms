import { HeroSection } from '@/components/landing/hero-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { ModulesPreviewSection } from '@/components/landing/modules-preview';
import { GreenCompSection } from '@/components/landing/greencomp-section';
import { PartnersSection } from '@/components/landing/partners-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ModulesPreviewSection />
      <GreenCompSection />
      <PartnersSection />
    </>
  );
}
