'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Leaf, Mail, Loader2 } from 'lucide-react';

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function SignInPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(t('invalidCredentials'));
    } else {
      router.push('/modules');
      router.refresh();
    }
  };

  const handleGoogle = () => {
    signIn('google', { callbackUrl: '/modules' });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md border border-[#E5E2DB] bg-white rounded-2xl shadow-none">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#ECFDF5] border border-[#064E3B]/10">
            <Leaf className="size-6 text-[#064E3B]" />
          </div>
          <CardTitle className="text-2xl font-display text-[#1A1A2E]">
            {t('signInTitle')}
          </CardTitle>
          <p className="text-sm text-[#1A1A2E]/50 mt-1">{t('signInSubtitle')}</p>
        </CardHeader>
        <CardContent className="space-y-5 pt-0">
          {/* Google OAuth */}
          <Button
            variant="outline"
            className="w-full border-[#E5E2DB] text-[#1A1A2E]/80 hover:bg-[#FAF8F0] h-11"
            onClick={handleGoogle}
          >
            <GoogleIcon className="size-5 mr-2" />
            {t('continueWithGoogle')}
          </Button>

          <div className="flex items-center gap-3">
            <Separator className="flex-1 bg-[#E5E2DB]" />
            <span className="text-xs text-[#1A1A2E]/40 uppercase tracking-wider">
              {t('or')}
            </span>
            <Separator className="flex-1 bg-[#E5E2DB]" />
          </div>

          {/* Email/Password form */}
          <form onSubmit={handleCredentials} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#1A1A2E]/70 text-sm">
                {t('email')}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="border-[#E5E2DB] focus:border-[#064E3B] focus:ring-[#064E3B]/20 bg-[#FAF8F0]/50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#1A1A2E]/70 text-sm">
                {t('password')}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-[#E5E2DB] focus:border-[#064E3B] focus:ring-[#064E3B]/20 bg-[#FAF8F0]/50"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#064E3B] hover:bg-[#047857] text-white transition-colors duration-300 h-11"
            >
              {loading ? (
                <Loader2 className="size-4 mr-1 animate-spin" />
              ) : (
                <Mail className="size-4 mr-1" />
              )}
              {t('signIn')}
            </Button>
          </form>

          <p className="text-center text-sm text-[#1A1A2E]/50">
            {t('noAccount')}{' '}
            <Link
              href="/auth/signup"
              className="text-[#064E3B] hover:text-[#047857] font-medium underline-offset-2 hover:underline"
            >
              {t('signUp')}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
