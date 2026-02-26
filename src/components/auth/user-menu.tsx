'use client';

import { useSession, signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function UserMenu() {
  const { data: session, status } = useSession();
  const t = useTranslations('auth');

  if (status === 'loading') {
    return <div className="h-8 w-8 rounded-full bg-[#E5E2DB] animate-pulse" />;
  }

  if (!session?.user) {
    return (
      <Button
        asChild
        variant="outline"
        size="sm"
        className="border-[#064E3B]/20 text-[#064E3B] hover:bg-[#ECFDF5] text-xs h-8"
      >
        <Link href="/auth/signin">{t('signIn')}</Link>
      </Button>
    );
  }

  const isAdmin = session.user.role === 'ADMIN';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt=""
              className="h-8 w-8 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#064E3B] text-white text-xs font-semibold">
              {(
                session.user.name?.[0] ||
                session.user.email?.[0] ||
                'U'
              ).toUpperCase()}
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2">
          <p className="text-sm font-medium text-[#1A1A2E] truncate">
            {session.user.name || session.user.email}
          </p>
          {session.user.name && (
            <p className="text-xs text-[#1A1A2E]/50 truncate">
              {session.user.email}
            </p>
          )}
        </div>
        <DropdownMenuSeparator />
        {isAdmin && (
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/admin">
              <Shield className="size-4 mr-2" />
              {t('adminPanel')}
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <LogOut className="size-4 mr-2" />
          {t('signOut')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
