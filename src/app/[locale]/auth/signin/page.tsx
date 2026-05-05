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
import { Leaf, Mail, Loader2 } from 'lucide-react';

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
