import {useTranslations} from 'next-intl';
import LanguageSwitcher from '../../components/language-switcher';

export default function Home() {
  const t = useTranslations('HomePage');
  
  return (
    <div className="min-h-screen">
      <header className="p-6 flex justify-end">
        <LanguageSwitcher />
      </header>
      
      <main className="flex items-center justify-center flex-1">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              {t('getStarted')}
            </button>
            <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              {t('learnMore')}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
