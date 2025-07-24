import { Link } from '../../navigation';
import AdvancedStructuredData from './advanced-structured-data';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const structuredBreadcrumbs = items.map(item => ({
    name: item.name,
    url: item.href.startsWith('http') ? item.href : `${process.env.NEXT_PUBLIC_BASE_URL}${item.href}`
  }));

  return (
    <>
      <nav 
        aria-label="Breadcrumb" 
        className={`text-sm text-gray-600 ${className}`}
      >
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <svg 
                  className="w-4 h-4 mx-2 text-gray-400" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              )}
              {index === items.length - 1 ? (
                <span 
                  className="font-medium text-gray-900" 
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link 
                  href={item.href} 
                  className="hover:text-gray-900 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      
      <AdvancedStructuredData 
        type="breadcrumb" 
        breadcrumbs={structuredBreadcrumbs} 
      />
    </>
  );
} 