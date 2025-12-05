'use client';

import { usePathname } from '../navigation';
import { Link } from '../navigation';
import { routing } from '../i18n/routing';

export default function LanguageSwitcher() {
  const pathname = usePathname();

  return (
    <div className="flex gap-2">
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-md transition-all"
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
} 