#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const MESSAGES_DIR = path.join(__dirname, '../messages');
const SOURCE_LOCALE = 'en'; // Base language for translations
const TARGET_LOCALES = ['fr', 'es']; // Add more languages here: ['es', 'fr', 'de']

// Simple translation mapping (you can replace this with AI/API service)
const TRANSLATIONS = {
  es: {
    // Common translations
    'Welcome': 'Bienvenido',
    'Get Started': 'Comenzar',
    'Learn More': 'Saber Más',
    'Home': 'Inicio',
    'About': 'Acerca de',
    'Contact': 'Contacto',
    'Back to Home': 'Volver al Inicio',
    'Page Not Found': 'Página No Encontrada',
    'The page you are looking for doesn\'t exist.': 'La página que buscas no existe.',
    'This is a Next.js app with internationalization ready to use!': '¡Esta es una aplicación Next.js con internacionalización lista para usar!'
  }
};

// Load JSON file
function loadMessages(locale) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  if (!fs.existsSync(filePath)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// Save JSON file
function saveMessages(locale, messages) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2) + '\n');
}

// Simple translation function (replace with AI service)
function translateText(text, targetLocale) {
  const translations = TRANSLATIONS[targetLocale] || {};
  return translations[text] || `[AUTO] ${text}`;
}

// Recursively translate nested objects
function translateObject(obj, targetLocale, basePath = '') {
  const result = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = basePath ? `${basePath}.${key}` : key;
    
    if (typeof value === 'object' && value !== null) {
      result[key] = translateObject(value, targetLocale, currentPath);
    } else if (typeof value === 'string') {
      result[key] = translateText(value, targetLocale);
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

// Merge objects recursively, preserving existing translations
function mergeTranslations(existing, newTranslations) {
  const result = { ...existing };
  
  for (const [key, value] of Object.entries(newTranslations)) {
    if (typeof value === 'object' && value !== null && typeof existing[key] === 'object') {
      result[key] = mergeTranslations(existing[key] || {}, value);
    } else if (!existing[key]) {
      // Only add if it doesn't exist
      result[key] = value;
    }
  }
  
  return result;
}

// Main sync function
function syncTranslations() {
  console.log('🌍 Starting translation sync...');
  
  // Load source messages
  const sourceMessages = loadMessages(SOURCE_LOCALE);
  
  if (Object.keys(sourceMessages).length === 0) {
    console.log(`❌ No source messages found in ${SOURCE_LOCALE}.json`);
    return;
  }
  
  console.log(`📖 Loaded ${Object.keys(sourceMessages).length} sections from ${SOURCE_LOCALE}.json`);
  
  // Process each target locale
  TARGET_LOCALES.forEach(locale => {
    console.log(`\n🔄 Processing ${locale}...`);
    
    // Load existing translations
    const existingMessages = loadMessages(locale);
    
    // Generate new translations for missing keys
    const newTranslations = translateObject(sourceMessages, locale);
    
    // Merge with existing translations (don't overwrite)
    const finalMessages = mergeTranslations(existingMessages, newTranslations);
    
    // Save updated translations
    saveMessages(locale, finalMessages);
    
    console.log(`✅ Updated ${locale}.json`);
  });
  
  console.log('\n🎉 Translation sync completed!');
}

// Command line interface
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'sync':
      syncTranslations();
      break;
    case 'add-locale':
      const newLocale = process.argv[3];
      if (!newLocale) {
        console.log('Usage: node translate.js add-locale <locale>');
        process.exit(1);
      }
      console.log(`Adding new locale: ${newLocale}`);
      // Update this script and routing config
      console.log(`Don't forget to add '${newLocale}' to:`);
      console.log('1. TARGET_LOCALES in this script');
      console.log('2. i18n/routing.ts');
      console.log('3. Add translation mappings to TRANSLATIONS object');
      break;
    default:
      console.log('Usage:');
      console.log('  node translate.js sync         - Sync all translations');
      console.log('  node translate.js add-locale <locale> - Add new locale');
  }
}

module.exports = { syncTranslations, translateObject, mergeTranslations }; 