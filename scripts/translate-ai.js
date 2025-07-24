#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const MESSAGES_DIR = path.join(__dirname, '../messages');
const SOURCE_LOCALE = 'en';
const TARGET_LOCALES = ['es']; // Add more: ['es', 'fr', 'de', 'it', 'pt']

// Language mappings for AI
const LANGUAGE_NAMES = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  ja: 'Japanese',
  ko: 'Korean',
  zh: 'Chinese'
};

// Mock AI translation function (replace with actual OpenAI API call)
async function translateWithAI(text, targetLocale, context = '') {
  // This is a mock function. Replace with actual API call:
  /*
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a professional translator. Translate the following text from English to ${LANGUAGE_NAMES[targetLocale]}. Keep the same tone and style. Context: ${context}`
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.3,
    }),
  });
  
  const data = await response.json();
  return data.choices[0].message.content.trim();
  */
  
  // Mock translations for demonstration
  const mockTranslations = {
    es: {
      'Welcome to Your App': 'Bienvenido a Tu Aplicación',
      'This is a Next.js app with internationalization ready to use!': '¡Esta es una aplicación Next.js con internacionalización lista para usar!',
      'Get Started': 'Comenzar',
      'Learn More': 'Saber Más',
      'Your Site Name': 'Tu Nombre de Sitio',
      'Your Site Name - Your Tagline': 'Tu Nombre de Sitio - Tu Lema',
      'Your default site description.': 'La descripción por defecto de tu sitio.',
      'your, keywords, here': 'tus, palabras, clave, aquí',
      'Your Name': 'Tu Nombre',
      'Page Not Found': 'Página No Encontrada',
      'The page you are looking for doesn\'t exist.': 'La página que buscas no existe.',
      'Back to Home': 'Volver al Inicio'
    }
  };
  
  const translations = mockTranslations[targetLocale] || {};
  return translations[text] || `[AI-TRANSLATE] ${text}`;
}

// Enhanced translation with AI
async function translateObjectWithAI(obj, targetLocale, context = '', basePath = '') {
  const result = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = basePath ? `${basePath}.${key}` : key;
    const keyContext = `${context} (${currentPath})`;
    
    if (typeof value === 'object' && value !== null) {
      result[key] = await translateObjectWithAI(value, targetLocale, keyContext, currentPath);
    } else if (typeof value === 'string') {
      console.log(`  🤖 Translating: "${value}"`);
      result[key] = await translateWithAI(value, targetLocale, keyContext);
      // Add small delay to respect API limits
      await new Promise(resolve => setTimeout(resolve, 100));
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

// Load and save functions (same as basic script)
function loadMessages(locale) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  if (!fs.existsSync(filePath)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function saveMessages(locale, messages) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2) + '\n');
}

function mergeTranslations(existing, newTranslations) {
  const result = { ...existing };
  
  for (const [key, value] of Object.entries(newTranslations)) {
    if (typeof value === 'object' && value !== null && typeof existing[key] === 'object') {
      result[key] = mergeTranslations(existing[key] || {}, value);
    } else if (!existing[key] || existing[key].startsWith('[AUTO]') || existing[key].startsWith('[AI-TRANSLATE]')) {
      // Replace auto-generated translations
      result[key] = value;
    }
  }
  
  return result;
}

// AI-powered sync function
async function syncTranslationsAI() {
  console.log('🤖 Starting AI-powered translation sync...');
  
  if (!process.env.OPENAI_API_KEY && process.argv.includes('--real-ai')) {
    console.log('❌ OPENAI_API_KEY environment variable not set');
    console.log('💡 Using mock translations. Set OPENAI_API_KEY for real AI translations.');
  }
  
  const sourceMessages = loadMessages(SOURCE_LOCALE);
  
  if (Object.keys(sourceMessages).length === 0) {
    console.log(`❌ No source messages found in ${SOURCE_LOCALE}.json`);
    return;
  }
  
  console.log(`📖 Loaded ${Object.keys(sourceMessages).length} sections from ${SOURCE_LOCALE}.json`);
  
  for (const locale of TARGET_LOCALES) {
    console.log(`\n🔄 Processing ${locale} with AI...`);
    
    const existingMessages = loadMessages(locale);
    const newTranslations = await translateObjectWithAI(
      sourceMessages, 
      locale, 
      `UI text for a Next.js application`
    );
    
    const finalMessages = mergeTranslations(existingMessages, newTranslations);
    saveMessages(locale, finalMessages);
    
    console.log(`✅ Updated ${locale}.json with AI translations`);
  }
  
  console.log('\n🎉 AI translation sync completed!');
}

// Command line interface
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'sync':
      syncTranslationsAI();
      break;
    case 'setup':
      console.log('🔧 AI Translation Setup:');
      console.log('1. Get OpenAI API key from: https://platform.openai.com/api-keys');
      console.log('2. Set environment variable: export OPENAI_API_KEY=your-key-here');
      console.log('3. Run: node translate-ai.js sync --real-ai');
      console.log('\n💡 For now, using mock translations for demonstration.');
      break;
    default:
      console.log('Usage:');
      console.log('  node translate-ai.js sync       - Sync with AI translations');
      console.log('  node translate-ai.js setup      - Setup instructions');
  }
}

module.exports = { syncTranslationsAI }; 