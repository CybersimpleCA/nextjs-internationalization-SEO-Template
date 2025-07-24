# 🌍 Automatic Translation Guide

This template includes a powerful automatic translation system that keeps all your language files in sync whenever you update content.

## 🚀 Quick Start

### 1. Basic Translation Sync
```bash
# Sync all translations manually
npm run translate

# Watch for changes and auto-translate
npm run translate:watch
```

### 2. AI-Powered Translation (Recommended)
```bash
# Setup AI translations
npm run translate:setup

# Use AI translations
npm run translate:ai
```

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `npm run translate` | Sync translations using predefined mappings |
| `npm run translate:ai` | Sync translations using AI (mock/OpenAI) |
| `npm run translate:watch` | Watch `en.json` for changes and auto-sync |
| `npm run translate:setup` | Get setup instructions for AI translations |

## 🔄 How It Works

### 1. **Source Language**: English (`messages/en.json`)
- This is your master translation file
- Add new content here first
- All other languages sync from this file

### 2. **Auto-Translation**
- Missing translations are automatically generated
- Existing translations are preserved (never overwritten)
- Smart merging prevents data loss

### 3. **File Watching**
- Run `npm run translate:watch` during development
- Automatically syncs when you save changes to `en.json`
- No manual intervention needed

## 🎯 Workflow Examples

### Adding New Content

1. **Add to English first:**
```json
// messages/en.json
{
  "HomePage": {
    "title": "Welcome to Your App",
    "description": "This is awesome!",
    "newButton": "Click Me!"  // ← New content
  }
}
```

2. **Auto-sync translations:**
```bash
npm run translate
```

3. **Result in Spanish:**
```json
// messages/es.json
{
  "HomePage": {
    "title": "Bienvenido a Tu Aplicación",
    "description": "¡Esto es increíble!",
    "newButton": "¡Haz Clic!"  // ← Auto-translated
  }
}
```

### Adding New Language

1. **Update routing configuration:**
```typescript
// i18n/routing.ts
export const routing = defineRouting({
  locales: ['en', 'es', 'fr'], // ← Add 'fr'
  defaultLocale: 'en'
});
```

2. **Update translation scripts:**
```javascript
// scripts/translate.js
const TARGET_LOCALES = ['es', 'fr']; // ← Add 'fr'

// Add translations in TRANSLATIONS object
const TRANSLATIONS = {
  es: { /* existing */ },
  fr: {
    'Welcome': 'Bienvenue',
    'Get Started': 'Commencer',
    // ... more translations
  }
};
```

3. **Run sync:**
```bash
npm run translate
```

## 🤖 AI Translation Setup

### Using OpenAI API (Recommended)

1. **Get OpenAI API Key:**
   - Visit: https://platform.openai.com/api-keys
   - Create new secret key

2. **Set Environment Variable:**
```bash
export OPENAI_API_KEY=your-api-key-here
```

3. **Update AI script:**
```javascript
// Uncomment the real API call in scripts/translate-ai.js
// Replace the mock function with actual OpenAI integration
```

4. **Use AI translations:**
```bash
npm run translate:ai --real-ai
```

### Using Mock Translations

For development and testing, the system includes mock translations:

```bash
npm run translate:ai  # Uses built-in mock translations
```

## 📂 File Structure

```
├── messages/
│   ├── en.json          # Source language (English)
│   ├── es.json          # Auto-generated Spanish
│   └── fr.json          # Auto-generated French
├── scripts/
│   ├── translate.js     # Basic translation sync
│   ├── translate-ai.js  # AI-powered translations
│   └── watch-translations.js  # File watcher
└── docs/
    └── TRANSLATION_GUIDE.md  # This guide
```

## 🔧 Customization

### Adding Translation Mappings

Edit the `TRANSLATIONS` object in `scripts/translate.js`:

```javascript
const TRANSLATIONS = {
  es: {
    'Your custom text': 'Tu texto personalizado',
    'Another phrase': 'Otra frase',
  },
  fr: {
    'Your custom text': 'Votre texte personnalisé',
    'Another phrase': 'Une autre phrase',
  }
};
```

### Modifying AI Context

Update the AI translation context in `scripts/translate-ai.js`:

```javascript
const newTranslations = await translateObjectWithAI(
  sourceMessages, 
  locale, 
  `UI text for a modern web application focused on [your domain]`
);
```

## 🔄 Development Workflow

### Recommended Setup:

1. **Start file watcher:**
```bash
npm run translate:watch
```

2. **Start development server:**
```bash
npm run dev
```

3. **Edit content:**
   - Update `messages/en.json`
   - Translations sync automatically
   - Changes appear immediately in your app

### Production Deployment:

1. **Run final sync:**
```bash
npm run translate:ai
```

2. **Build application:**
```bash
npm run build
```

## 🚨 Best Practices

### ✅ Do's
- Always add content to `en.json` first
- Use descriptive keys: `HomePage.welcomeMessage` not `msg1`
- Group related translations in nested objects
- Run translation sync before deployment
- Review AI translations for accuracy

### ❌ Don'ts
- Don't edit translated files directly (they'll be overwritten)
- Don't use special characters in translation keys
- Don't forget to update routing config when adding languages
- Don't commit temporary translation files

## 🐛 Troubleshooting

### Common Issues:

**Translations not syncing?**
```bash
# Check if source file exists
ls -la messages/en.json

# Run manual sync
npm run translate
```

**AI translations not working?**
```bash
# Check API key
echo $OPENAI_API_KEY

# Run setup again
npm run translate:setup
```

**File watcher not detecting changes?**
```bash
# Kill existing watcher
pkill -f watch-translations

# Start new watcher
npm run translate:watch
```

## 📈 Advanced Features

### Conditional Translations
```javascript
// Context-aware translations based on page/component
const translations = await translateObjectWithAI(
  sourceMessages, 
  locale, 
  `E-commerce checkout page - formal tone`
);
```

### Batch Processing
```javascript
// Process multiple files at once
const sourceFiles = ['common.json', 'pages.json', 'components.json'];
// Implement batch processing logic
```

### Translation Validation
```javascript
// Validate translation quality
function validateTranslation(original, translated, locale) {
  // Check length, special characters, placeholder consistency
  return isValid;
}
```

---

## 🎉 Happy Translating!

This automatic translation system saves hours of manual work and keeps your multilingual app perfectly in sync. 

**Questions?** Check the source code in `scripts/` directory for implementation details. 