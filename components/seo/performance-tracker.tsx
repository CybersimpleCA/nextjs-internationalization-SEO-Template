'use client';

import { useEffect } from 'react';
import { trackEvent } from '../analytics/google-analytics';

export default function PerformanceTracker() {
  useEffect(() => {
    // Track Core Web Vitals
    const trackWebVitals = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry && lastEntry.entryType === 'largest-contentful-paint') {
            trackEvent('web_vitals', 'LCP', 'ms', Math.round(lastEntry.startTime));
          }
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.entryType === 'first-input') {
              const firstInputEntry = entry as any; // Type assertion for first-input entry
              const fid = firstInputEntry.processingStart - firstInputEntry.startTime;
              trackEvent('web_vitals', 'FID', 'ms', Math.round(fid));
            }
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Send CLS when page visibility changes
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'hidden') {
            trackEvent('web_vitals', 'CLS', 'score', Math.round(clsValue * 1000));
          }
        });

        // First Contentful Paint (FCP)
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
              trackEvent('web_vitals', 'FCP', 'ms', Math.round(entry.startTime));
            }
          });
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // Time to First Byte (TTFB)
        if ('navigation' in performance) {
          const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigationEntry) {
            const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
            trackEvent('web_vitals', 'TTFB', 'ms', Math.round(ttfb));
          }
        }
      }

      // Track page load time
      window.addEventListener('load', () => {
        setTimeout(() => {
          const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
          trackEvent('performance', 'page_load_time', 'ms', loadTime);
        }, 0);
      });
    };

    // Delay tracking to avoid impacting initial page load
    setTimeout(trackWebVitals, 100);

    // Track user engagement time
    let startTime = Date.now();
    let isActive = true;
    let totalTime = 0;

    const trackEngagement = () => {
      if (isActive) {
        totalTime += Date.now() - startTime;
      }
      startTime = Date.now();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        isActive = true;
        startTime = Date.now();
      } else {
        isActive = false;
        trackEngagement();
      }
    };

    const handleBeforeUnload = () => {
      trackEngagement();
      if (totalTime > 0) {
        trackEvent('engagement', 'time_on_page', 'seconds', Math.round(totalTime / 1000));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null; // This component doesn't render anything
} 