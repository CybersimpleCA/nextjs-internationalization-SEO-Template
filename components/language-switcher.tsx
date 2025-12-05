// 'use client';

// import { usePathname } from '../navigation';
// import { Link } from '../navigation';
// import { routing } from '../i18n/routing';

// export default function LanguageSwitcher() {
//   const pathname = usePathname();

//   return (
//     <div className="flex gap-2">
//       {routing.locales.map((locale) => (
//         <Link
//           key={locale}
//           href={pathname}
//           locale={locale}
//           className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-md transition-all"
//         >
//           {locale.toUpperCase()}
//         </Link>
//       ))}
//     </div>
//   );
// } 

'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, Link } from '../navigation';
import { routing } from '../i18n/routing';
import { ChevronDown, Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = useLocale(); // Gets 'en', 'fr', etc.

  return (
    <div className="relative">
      
      {/* 1. The Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-slate-300 hover:text-white hover:border-blue-500 transition-all text-sm font-medium"
      >
        <Globe size={16} className="text-blue-500" />
        <span className="uppercase">{currentLocale.toUpperCase()}</span>
        <ChevronDown 
          size={14} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* 2. The Dropdown Menu (Only visible if isOpen is true) */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-32 bg-slate-950 border border-slate-800 rounded-lg shadow-xl z-50 overflow-hidden flex flex-col">
          {routing.locales.map((locale) => (
            <Link
              key={locale}
              href={pathname}
              locale={locale}
              onClick={() => setIsOpen(false)} // Close menu when a language is clicked
              className={`
                block w-full text-left px-4 py-2 text-sm transition-colors
                ${currentLocale === locale 
                  ? 'bg-blue-600 text-white font-semibold' // Style for the active language
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white' // Style for others
                }
              `}
            >
              {locale.toUpperCase()}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}