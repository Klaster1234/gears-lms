'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { LOGOS } from '@/lib/constants';
import { LanguageSwitcher } from './language-switcher';
import { MobileMenu } from './mobile-menu';

const navItems = [
  { href: '/modules', labelKey: 'modules' },
  { href: '/progress', labelKey: 'progress' },
  { href: '/about', labelKey: 'about' },
] as const;

export function Navbar() {
  const t = useTranslations('common.nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On homepage, start transparent; on inner pages, always solid
  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isTransparent
          ? 'bg-transparent'
          : 'border-b border-[#E5E2DB]/60 bg-[#FAF8F0]/90 backdrop-blur-xl'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <img
            src={LOGOS.greenExplorers}
            alt="Green Explorers"
            className={`h-9 w-auto transition-all duration-500 ${
              isTransparent ? 'brightness-0 invert' : ''
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isTransparent
                    ? isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:text-white'
                    : isActive
                      ? 'bg-[#064E3B]/8 text-[#064E3B]'
                      : 'text-[#1A1A2E]/60 hover:text-[#064E3B]'
                }`}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
