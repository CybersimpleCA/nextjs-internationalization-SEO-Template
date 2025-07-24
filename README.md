# Next.js Internationalization & SEO Template

This is a complete Next.js template with internationalization (i18n) and advanced SEO features using `next-intl` v4.0. Use this template as a starting point for all your multilingual Next.js applications.

This template provides a production-ready foundation for building multilingual Next.js applications. It includes path-based routing, automatic locale detection, and dynamic metadata for optimal SEO. The structure is designed to be easily extensible, allowing you to add new languages and content with minimal effort.

## 🌐 Features

### 🎯 Core i18n Features
- ✅ **Path-based routing** (`/en/`, `/es/`)
- ✅ **Automatic locale detection** from browser language
- ✅ **SEO-friendly URLs** with locale prefixes
- ✅ **Server-side rendering** compatible
- ✅ **Easy to extend** with more languages

### 🚀 Automatic Translation System
- ✅ **Auto-sync translations** when content updates
- ✅ **AI-powered translations** (OpenAI integration ready)
- ✅ **File watching** for real-time translation sync
- ✅ **Smart merging** preserves existing translations
- ✅ **Pre-commit hooks** for automatic sync

### 🎨 Modern UI & SEO
- ✅ **Tailwind CSS** with responsive design
- ✅ **Language switcher** component
- ✅ **Dynamic Metadata** for unique titles and descriptions
- ✅ **JSON-LD Structured Data** for rich snippets
- ✅ **OpenGraph & Twitter Cards** for social sharing
- ✅ **Custom 404 pages** with translations

### 🛠️ Developer Experience
- ✅ **TypeScript support** with strict typing
- ✅ **Hot reload** with Turbopack
- ✅ **ESLint configuration**
- ✅ **Comprehensive documentation**

## 📁 Template Structure

```
nextjs-i18n-template/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx     # Locale-specific layout with SEO
│   │   └── page.tsx       # Main page with translations
│   └── layout.tsx         # Root layout (pass-through)
├── components/
│   └── structured-data.tsx # JSON-LD component
├── i18n/
│   ├── routing.ts         # Locale configuration
│   └── request.ts         # Message loading logic
├── messages/
│   ├── en.json           # English translations with metadata
│   └── es.json           # Spanish translations with metadata
├── middleware.ts         # Handles routing & locale detection
├── navigation.ts         # Locale-aware navigation components
├── next.config.ts        # Next.js config with next-intl plugin
└── package.json          # Dependencies
```

## 🚀 Getting Started

### Option 1: Use this repository as a template (Recommended)

1. Click the "Use this template" button on the GitHub repository page.
2. Choose a name for your new repository and create it.
3. Clone your new repository to your local machine:
   ```bash
   git clone https://github.com/your-username/your-new-repository.git
   cd your-new-repository
   ```
4. Install the dependencies:
   ```bash
   npm install
   ```
5. Start development with automatic translations:
   ```bash
   # Start the file watcher for auto-translations
   npm run translate:watch
   
   # In another terminal, start the dev server
   npm run dev
   ```

### Option 2: Use the setup script

```bash
./setup-new-project.sh your-project-name ~/your-projects-folder
cd ~/your-projects-folder/your-project-name
npm run translate:watch &  # Start translation watcher
npm run dev               # Start development server
```

## 🚀 How to Use This Template

### Method 1: Copy Template to New Project

1. **Copy the template:**
   ```bash
   cp -r /Users/othmarcasilla/nextjs-i18n-template /path/to/your-new-project
   cd /path/to/your-new-project
   ```

2. **Update project name:**
   Open the `package.json` file in your code editor and change the `"name"` field to your project's name.

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start development:**
   ```bash
   npm run dev
   ```

### Method 2: Create New Next.js App and Copy Files

1. **Create new Next.js app:**
   ```bash
   npx create-next-app@latest your-project-name --typescript --tailwind --eslint --app
   cd your-project-name
   ```

2. **Install next-intl:**
   ```bash
   npm install next-intl@^4.3.1
   ```

3. **Copy i18n files:**
   ```bash
   cp -r /Users/othmarcasilla/nextjs-i18n-template/i18n .
   cp -r /Users/othmarcasilla/nextjs-i18n-template/messages .
   cp /Users/othmarcasilla/nextjs-i18n-template/middleware.ts .
   cp /Users/othmarcasilla/nextjs-i18n-template/navigation.ts .
   ```

4. **Update next.config.ts:**
   ```typescript
   import type { NextConfig } from "next";
   import createNextIntlPlugin from 'next-intl/plugin';

   const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

   const nextConfig: NextConfig = {
     /* your config options here */
   };

   export default withNextIntl(nextConfig);
   ```

5. **Update app structure:**
   ```bash
   mkdir app/[locale]
   mv app/page.tsx app/[locale]/
   mv app/layout.tsx app/[locale]/
   ```

6. **Create new root layout:**
   ```typescript
   // app/layout.tsx
   export default function RootLayout({children}: {children: React.ReactNode}) {
     return children;
   }
   ```

## 🌍 Automatic Translation System

This template includes a powerful automatic translation system that keeps all your language files in sync.

### Quick Commands

```bash
# Sync all translations manually
npm run translate

# Use AI-powered translations (recommended)
npm run translate:ai

# Watch for changes and auto-translate
npm run translate:watch

# Setup AI translations
npm run translate:setup
```

### How It Works

1. **Edit `messages/en.json`** - Your master translation file
2. **Translations sync automatically** - Missing translations are generated
3. **Existing translations preserved** - Never overwrites your custom translations
4. **Real-time updates** - File watcher syncs changes instantly

### Example Workflow

1. Add new content to English:
```json
// messages/en.json
{
  "HomePage": {
    "title": "Welcome to Your App",
    "newFeature": "Check out our amazing new feature!"
  }
}
```

2. Run translation sync:
```bash
npm run translate
```

3. Spanish file automatically updates:
```json
// messages/es.json (auto-generated)
{
  "HomePage": {
    "title": "Bienvenido a Tu Aplicación", 
    "newFeature": "¡Echa un vistazo a nuestra increíble nueva función!"
  }
}
```

For detailed instructions, see: [`docs/TRANSLATION_GUIDE.md`](docs/TRANSLATION_GUIDE.md)

## 🔧 Customization

### Adding New Languages

1. **Update routing config:**
   ```typescript
   // i18n/routing.ts
   export const routing = defineRouting({
     locales: ['en', 'es', 'fr'], // Add 'fr' for French
     defaultLocale: 'en'
   });
   ```

2. **Update translation script:**
   ```javascript
   // scripts/translate.js
   const TARGET_LOCALES = ['es', 'fr']; // Add 'fr'
   ```

3. **Run sync:**
   ```bash
   npm run translate
   ```

### Adding New Translation Keys

1. **Add to all language files:**
   ```json
   // messages/en.json
   {
     "HomePage": {
       "title": "Welcome to Your App",
       "description": "This is a Next.js app with internationalization ready to use!"
     },
     "Navigation": {
       "home": "Home",
       "about": "About",
       "contact": "Contact"
     }
   }
   ```

2. **Use in components:**
   ```typescript
   import {useTranslations} from 'next-intl';

   export default function Navigation() {
     const t = useTranslations('Navigation');
     
     return (
       <nav>
         <Link href="/">{t('home')}</Link>
         <Link href="/about">{t('about')}</Link>
         <Link href="/contact">{t('contact')}</Link>
       </nav>
     );
   }
   ```

### Using Locale-Aware Navigation

```typescript
import {Link} from '../navigation'; // Use this instead of next/link

export default function MyComponent() {
  return (
    <Link href="/about">About</Link> // Automatically becomes /en/about or /es/about
  );
}
```

## 🌍 Supported URLs

- `/` → Redirects to `/en` or `/es` based on browser language
- `/en` → English version  
- `/es` → Spanish version
- `/en/about` → English about page
- `/es/about` → Spanish about page

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run translate` | Sync all translations |
| `npm run translate:ai` | AI-powered translation sync |
| `npm run translate:watch` | Watch files and auto-sync |
| `npm run translate:setup` | AI translation setup guide |

## 📝 Notes

- **Latest Next.js 15** with App Router
- **next-intl v4.3.1** with modern API
- **Tailwind CSS** for styling
- **TypeScript** with strict configuration
- **Automatic locale detection** via middleware
- **SEO-optimized** with proper hreflang tags
- **Translation automation** with AI support

## 🔗 Useful Links

- [next-intl Documentation](https://next-intl.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Happy coding! 🚀**

This template saves you hours of setup time for every new multilingual project.
