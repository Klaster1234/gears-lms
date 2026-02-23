'use client';

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <img
            src={LOGOS.greenExplorers}
            alt="Green Explorers"
            className="h-10 w-auto"
          />
        </Link>

        {/* Center: Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-forest-50 hover:text-forest-600 ${
                  isActive
                    ? 'bg-forest-50 text-forest-600'
                    : 'text-charcoal/70'
                }`}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        {/* Right: Language switcher + mobile menu */}
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
