import { useTranslations } from 'next-intl';

interface StructuredDataProps {
  type?: 'website' | 'article' | 'organization' | 'breadcrumb';
  articleData?: {
    title: string;
    author: string;
    datePublished: string;
    dateModified?: string;
    image?: string;
  };
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

export default function AdvancedStructuredData({ 
  type = 'website', 
  articleData,
  breadcrumbs 
}: StructuredDataProps) {
  const t = useTranslations('Metadata');

  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
    };

    switch (type) {
      case 'website':
        return {
          ...baseData,
          '@type': 'WebSite',
          name: t('siteName'),
          url: t('url'),
          description: t('defaultDescription'),
          potentialAction: {
            '@type': 'SearchAction',
            target: `${t('url')}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
          publisher: {
            '@type': 'Organization',
            name: t('siteName'),
            url: t('url'),
          },
        };

      case 'organization':
        return {
          ...baseData,
          '@type': 'Organization',
          name: t('siteName'),
          url: t('url'),
          description: t('defaultDescription'),
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            url: `${t('url')}/contact`,
          },
          sameAs: [
            // Add your social media URLs here
            // "https://twitter.com/yourhandle",
            // "https://facebook.com/yourpage",
            // "https://linkedin.com/company/yourcompany"
          ],
        };

      case 'article':
        if (!articleData) return null;
        return {
          ...baseData,
          '@type': 'Article',
          headline: articleData.title,
          author: {
            '@type': 'Person',
            name: articleData.author,
          },
          publisher: {
            '@type': 'Organization',
            name: t('siteName'),
            url: t('url'),
          },
          datePublished: articleData.datePublished,
          dateModified: articleData.dateModified || articleData.datePublished,
          image: articleData.image ? {
            '@type': 'ImageObject',
            url: articleData.image,
            width: 1200,
            height: 630,
          } : undefined,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': typeof window !== 'undefined' ? window.location.href : t('url'),
          },
        };

      case 'breadcrumb':
        if (!breadcrumbs || breadcrumbs.length === 0) return null;
        return {
          ...baseData,
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: crumb.url,
          })),
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 