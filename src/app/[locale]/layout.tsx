import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { Footer, Header, Providers } from '../../components';
import { getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from '../../i18n';
import { Locales } from '../../constants';
import { notFound } from 'next/navigation';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata() {
  const t = await getTranslations('home');

  return {
    title: 'Accounted',
    description: t('meta_description'),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locales }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
