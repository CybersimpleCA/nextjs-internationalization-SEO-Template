import { Inter } from "next/font/google";
import "./globals.css";
import AnalyticsProvider from "../components/analytics/analytics-provider";
import PerformanceTracker from "../components/seo/performance-tracker";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'),
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  other: {
    // Google Search Console verification
    'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    // Bing Webmaster Tools verification
    'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '',
    // Yandex verification
    'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION || '',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <AnalyticsProvider>
          <PerformanceTracker />
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}
