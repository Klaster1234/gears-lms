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
import { Sprout, UserPlus, Loader2 } from 'lucide-react';

export default function SignUpPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError(t('passwordMin'));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setError(t('userExists'));
        } else {
          setError(t('registrationFailed'));
        }
        setLoading(false);
        return;
      }

      // Auto-login after registration
      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      setLoading(false);

      if (signInResult?.error) {
        setError(t('registrationFailed'));
      } else {
        router.push('/modules');
        router.refresh();
      }
    } catch {
      setError(t('registrationFailed'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md border border-[#E5E2DB] bg-white rounded-2xl shadow-none">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#ECFDF5] border border-[#064E3B]/10">
            <Sprout className="size-6 text-[#064E3B]" />
          </div>
          <CardTitle className="text-2xl font-display text-[#1A1A2E]">
            {t('signUpTitle')}
          </CardTitle>
          <p className="text-sm text-[#1A1A2E]/50 mt-1">{t('signUpSubtitle')}</p>
        </CardHeader>
        <CardContent className="space-y-5 pt-0">
          {/* Registration form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#1A1A2E]/70 text-sm">
                {t('name')}
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Maria Kowalska"
                className="border-[#E5E2DB] focus:border-[#064E3B] focus:ring-[#064E3B]/20 bg-[#FAF8F0]/50"
              />
            </div>
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
                placeholder={t('passwordMin')}
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
                <UserPlus className="size-4 mr-1" />
              )}
              {t('signUp')}
            </Button>
          </form>

          <p className="text-center text-sm text-[#1A1A2E]/50">
            {t('hasAccount')}{' '}
            <Link
              href="/auth/signin"
              className="text-[#064E3B] hover:text-[#047857] font-medium underline-offset-2 hover:underline"
            >
              {t('signIn')}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
