import type { Metadata } from "next";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import StructuredData from '../../components/structured-data';
import AdvancedStructuredData from '../../components/seo/advanced-structured-data';

// Dynamic metadata generation for SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});
  
  return {
    title: {
      template: `%s | ${t('siteName')}`,
      default: t('defaultTitle'),
    },
    description: t('defaultDescription'),
    keywords: t('keywords'),
    authors: [{ name: t('author') }],
    creator: t('author'),
    publisher: t('siteName'),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      url: t('url'),
      siteName: t('siteName'),
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: t('defaultTitle'),
        },
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      images: ['/og-image.png'],
      creator: '@yourtwitterhandle',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        ['en', 'es'].map(lang => [
          lang === 'en' ? 'en-US' : 'es-ES', 
          `/${lang}`
        ])
      ),
    },
    category: 'website',
    classification: 'Business',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION,
      yahoo: process.env.NEXT_PUBLIC_YAHOO_SITE_VERIFICATION,
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <StructuredData />
      <AdvancedStructuredData type="website" />
      <AdvancedStructuredData type="organization" />
      {children}
    </NextIntlClientProvider>
  );
}
