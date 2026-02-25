import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Figtree, Instrument_Serif } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import '../globals.css';

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin', 'latin-ext'],
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument',
  subsets: ['latin', 'latin-ext'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'G.E.A.R.S. - Green Explorers: Adults Reimagining Sustainability',
  description:
    '10 interactive modules on sustainable living, zero waste, and green competences. An Erasmus+ KA210-ADU project.',
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${figtree.variable} ${instrumentSerif.variable} font-sans antialiased bg-[#FAF8F0]`}
      >
        <NextIntlClientProvider messages={messages}>
          {/* Grain texture overlay */}
          <div className="grain-overlay" aria-hidden="true" />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
