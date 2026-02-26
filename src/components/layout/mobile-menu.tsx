'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Menu, LogOut, Shield, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { LanguageSwitcher } from './language-switcher';

const navItems = [
  { href: '/modules', labelKey: 'modules' },
  { href: '/progress', labelKey: 'progress' },
  { href: '/about', labelKey: 'about' },
] as const;

export function MobileMenu() {
  const t = useTranslations('common.nav');
  const ta = useTranslations('auth');
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </Button>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle className="text-[#064E3B]">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Navigation menu
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-2 px-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-base font-medium text-[#1A1A2E] transition-colors hover:bg-[#ECFDF5] hover:text-[#064E3B]"
            >
              {t(item.labelKey)}
            </Link>
          ))}

          {/* Language switcher */}
          <div className="mt-4 border-t border-[#E5E2DB] pt-4">
            <LanguageSwitcher />
          </div>

          {/* Auth section */}
          <div className="mt-2 border-t border-[#E5E2DB] pt-4">
            {session?.user ? (
              <>
                <p className="px-3 text-sm text-[#1A1A2E]/50 mb-2 truncate">
                  {session.user.email}
                </p>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-md px-3 py-2.5 text-base font-medium text-[#1A1A2E] transition-colors hover:bg-[#ECFDF5] hover:text-[#064E3B]"
                  >
                    <Shield className="size-4" />
                    {ta('adminPanel')}
                  </Link>
                )}
                <button
                  onClick={() => {
                    setOpen(false);
                    signOut({ callbackUrl: '/' });
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-base font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  <LogOut className="size-4" />
                  {ta('signOut')}
                </button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-base font-medium text-[#064E3B] transition-colors hover:bg-[#ECFDF5]"
              >
                <LogIn className="size-4" />
                {ta('signIn')}
              </Link>
            )}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
