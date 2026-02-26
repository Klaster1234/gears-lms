'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { LanguageSwitcher } from './language-switcher';
import { MobileMenu } from './mobile-menu';
import { UserMenu } from '@/components/auth/user-menu';

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
        <Link href="/" className="flex shrink-0 items-center gap-2.5 group">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-500 ${
              isTransparent
                ? 'bg-[#34D399]/15 ring-1 ring-[#34D399]/20'
                : 'bg-[#064E3B]/8 ring-1 ring-[#064E3B]/10'
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path
                d="M12 3C7 3 3 8 3 13c0 4 3 8 9 8 0 0 0-8 0-18z"
                className={`transition-colors duration-500 ${
                  isTransparent ? 'fill-[#34D399]' : 'fill-[#064E3B]'
                }`}
              />
              <path
                d="M12 3c5 0 9 5 9 10 0 4-3 8-9 8 0 0 0-8 0-18z"
                className={`transition-colors duration-500 ${
                  isTransparent ? 'fill-[#6EE7B7]/50' : 'fill-[#0D9488]/40'
                }`}
              />
            </svg>
          </div>
          <span
            className={`font-display text-lg tracking-[-0.02em] transition-colors duration-500 ${
              isTransparent ? 'text-white' : 'text-[#1A1A2E]'
            }`}
          >
            Green
            <span
              className={`transition-colors duration-500 ${
                isTransparent ? 'text-[#34D399]' : 'text-[#064E3B]'
              }`}
            >
              Explorers
            </span>
          </span>
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
          <UserMenu />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
