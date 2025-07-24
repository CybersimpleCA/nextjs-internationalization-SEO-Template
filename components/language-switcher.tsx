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
          className="px-3 py-1 rounded-md bg-blue-100 hover:bg-blue-200 transition-colors"
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
} 