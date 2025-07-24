'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import GoogleAnalytics, { trackPageView } from './google-analytics';
import MicrosoftClarity from './microsoft-clarity';
import MetaPixel from './meta-pixel';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();

  // Track page views on route changes
  useEffect(() => {
    const handleRouteChange = () => {
      if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
        trackPageView(window.location.href, document.title);
      }
    };

    handleRouteChange(); // Track initial page load
  }, [pathname]);

  return (
    <>
      {/* Google Analytics */}
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics 
          measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} 
        />
      )}

      {/* Microsoft Clarity */}
      {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
        <MicrosoftClarity 
          projectId={process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID} 
        />
      )}

      {/* Meta Pixel */}
      {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
        <MetaPixel 
          pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} 
        />
      )}

      {children}
    </>
  );
} 