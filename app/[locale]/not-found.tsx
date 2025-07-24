import { useTranslations } from 'next-intl';
import { Link } from '../../navigation';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">{t('title')}</h2>
        <p className="text-gray-600 mb-8">{t('description')}</p>
        <Link 
          href="/" 
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t('backHome')}
        </Link>
      </div>
    </div>
  );
} 