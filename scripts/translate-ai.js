#!/usr/bin/env node
// import OpenAI from "openai";

// // const apiKey = OPENAI_API_KEY;
// // const client = new OpenAI();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const fs = require('fs');
// const path = require('path');

// // Configuration
// const MESSAGES_DIR = path.join(__dirname, '../messages');
// const SOURCE_LOCALE = 'en';
// const TARGET_LOCALES = ['es','fr']; // Add more: ['es', 'fr', 'de', 'it', 'pt']

// // Language mappings for AI
// const LANGUAGE_NAMES = {
//   en: 'English',
//   es: 'Spanish',
//   fr: 'French',
//   de: 'German',
//   it: 'Italian',
//   pt: 'Portuguese',
//   ja: 'Japanese',
//   ko: 'Korean',
//   zh: 'Chinese'
// };

// // Mock AI translation function (replace with actual OpenAI API call)
// async function translateWithAI(text, targetLocale, context = '') {
//   // This is a mock function. Replace with actual API call:

//   const response = await client.responses.create({
//     model: "gpt-5-nano",
//     input: `You are a professional translator. Translate the following text from English to ${LANGUAGE_NAMES[targetLocale]}. Keep the same tone and style. Context: ${context}`
// });

// console.log(response.output_text);
  
//   // const response = await fetch('https://api.openai.com/v1/chat/completions', {
//   //   method: 'POST',
//   //   headers: {
//   //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//   //     'Content-Type': 'application/json',
//   //   },
//   //   body: JSON.stringify({
//   //     model: 'gpt-3.5-turbo',
//   //     messages: [
//   //       {
//   //         role: 'system',
//   //         content: `You are a professional translator. Translate the following text from English to ${LANGUAGE_NAMES[targetLocale]}. Keep the same tone and style. Context: ${context}`
//   //       },
//   //       {
//   //         role: 'user',
//   //         content: text
//   //       }
//   //     ],
//   //     temperature: 0.3,
//   //   }),
//   // });
  
//   // const data = await response.json();
//   // return data.choices[0].message.content.trim();
  
  
//   // Mock translations for demonstration
//   const mockTranslations = {
//     es: {
//       'Welcome to Your App': 'Bienvenido a Tu Aplicación',
//       'This is a Next.js app with internationalization ready to use!': '¡Esta es una aplicación Next.js con internacionalización lista para usar!',
//       'Get Started': 'Comenzar',
//       'Learn More': 'Saber Más',
//       'Your Site Name': 'Tu Nombre de Sitio',
//       'Your Site Name - Your Tagline': 'Tu Nombre de Sitio - Tu Lema',
//       'Your default site description.': 'La descripción por defecto de tu sitio.',
//       'your, keywords, here': 'tus, palabras, clave, aquí',
//       'Your Name': 'Tu Nombre',
//       'Page Not Found': 'Página No Encontrada',
//       'The page you are looking for doesn\'t exist.': 'La página que buscas no existe.',
//       'Back to Home': 'Volver al Inicio'
//     }
//   };
  
//   const translations = mockTranslations[targetLocale] || {};
//   return translations[text] || `[AI-TRANSLATE] ${text}`;
// }

// // Enhanced translation with AI
// async function translateObjectWithAI(obj, targetLocale, context = '', basePath = '') {
//   const result = {};
  
//   for (const [key, value] of Object.entries(obj)) {
//     const currentPath = basePath ? `${basePath}.${key}` : key;
//     const keyContext = `${context} (${currentPath})`;
    
//     if (typeof value === 'object' && value !== null) {
//       result[key] = await translateObjectWithAI(value, targetLocale, keyContext, currentPath);
//     } else if (typeof value === 'string') {
//       console.log(`  🤖 Translating: "${value}"`);
//       result[key] = await translateWithAI(value, targetLocale, keyContext);
//       // Add small delay to respect API limits
//       await new Promise(resolve => setTimeout(resolve, 100));
//     } else {
//       result[key] = value;
//     }
//   }
  
//   return result;
// }

// // Load and save functions (same as basic script)
// function loadMessages(locale) {
//   const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
//   if (!fs.existsSync(filePath)) {
//     return {};
//   }
//   return JSON.parse(fs.readFileSync(filePath, 'utf8'));
// }

// function saveMessages(locale, messages) {
//   const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
//   fs.writeFileSync(filePath, JSON.stringify(messages, null, 2) + '\n');
// }

// function mergeTranslations(existing, newTranslations) {
//   const result = { ...existing };
  
//   for (const [key, value] of Object.entries(newTranslations)) {
//     if (typeof value === 'object' && value !== null && typeof existing[key] === 'object') {
//       result[key] = mergeTranslations(existing[key] || {}, value);
//     } else if (!existing[key] || existing[key].startsWith('[AUTO]') || existing[key].startsWith('[AI-TRANSLATE]')) {
//       // Replace auto-generated translations
//       result[key] = value;
//     }
//   }
  
//   return result;
// }

// // AI-powered sync function
// async function syncTranslationsAI() {
//   console.log('🤖 Starting AI-powered translation sync...');
  
//   if (!process.env.OPENAI_API_KEY && process.argv.includes('--real-ai')) {
//     console.log('❌ OPENAI_API_KEY environment variable not set');
//     console.log('💡 Using mock translations. Set OPENAI_API_KEY for real AI translations.');
//   }
  
//   const sourceMessages = loadMessages(SOURCE_LOCALE);
  
//   if (Object.keys(sourceMessages).length === 0) {
//     console.log(`❌ No source messages found in ${SOURCE_LOCALE}.json`);
//     return;
//   }
  
//   console.log(`📖 Loaded ${Object.keys(sourceMessages).length} sections from ${SOURCE_LOCALE}.json`);
  
//   for (const locale of TARGET_LOCALES) {
//     console.log(`\n🔄 Processing ${locale} with AI...`);
    
//     const existingMessages = loadMessages(locale);
//     const newTranslations = await translateObjectWithAI(
//       sourceMessages, 
//       locale, 
//       `UI text for a Next.js application`
//     );
    
//     const finalMessages = mergeTranslations(existingMessages, newTranslations);
//     saveMessages(locale, finalMessages);
    
//     console.log(`✅ Updated ${locale}.json with AI translations`);
//   }
  
//   console.log('\n🎉 AI translation sync completed!');
// }

// // Command line interface
// if (require.main === module) {
//   const command = process.argv[2];
  
//   switch (command) {
//     case 'sync':
//       syncTranslationsAI();
//       break;
//     case 'setup':
//       console.log('🔧 AI Translation Setup:');
//       console.log('1. Get OpenAI API key from: https://platform.openai.com/api-keys');
//       console.log('2. Set environment variable: export OPENAI_API_KEY=your-key-here');
//       console.log('3. Run: node translate-ai.js sync --real-ai');
//       console.log('\n💡 For now, using mock translations for demonstration.');
//       break;
//     default:
//       console.log('Usage:');
//       console.log('  node translate-ai.js sync       - Sync with AI translations');
//       console.log('  node translate-ai.js setup      - Setup instructions');
//   }
// }

// module.exports = { syncTranslationsAI }; 

// #!/usr/bin/env node
// 1. Load environment variables from .env.local immediately
require('dotenv').config({ path: '.env.local' });

const OpenAI = require("openai");
const fs = require('fs');
const path = require('path');

// 2. Initialize OpenAI with the loaded key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Configuration
const MESSAGES_DIR = path.join(__dirname, '../messages'); // Adjust if your messages folder is elsewhere
const SOURCE_LOCALE = 'en';
const TARGET_LOCALES = ['es', 'fr']; // Add more: ['es', 'fr', 'de', 'it', 'pt']

// Language mappings for AI Context
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

// 3. The REAL AI translation function
async function translateWithAI(text, targetLocale, context = '') {
  const targetLanguage = LANGUAGE_NAMES[targetLocale] || targetLocale;
  console.log(targetLanguage);
  console.log(apiKey);
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Fast and cheap model
      messages: [
        {
          role: "system",
          content: `You are a professional translator for a web application. 
          Translate the user's text from English to ${targetLanguage}. 
          Maintain the original tone, capitalization, and any technical context. 
          Do not add explanations, just return the translated text.`
        },
        {
          role: "user",
          content: `Context: ${context}\nText to translate: "${text}"`
        }
      ],
      temperature: 0.3,
    });

    const translatedText = response.choices[0].message.content.trim();
    
    // Remove wrapping quotes if the AI added them mistakenly
    return translatedText.replace(/^"|"$/g, '');

  } catch (error) {
    console.error(`❌ Error translating "${text}":`, error.message);
    return `[FAILED] ${text}`; // Fallback so script continues
  }
}

// Recursive function to traverse the JSON object
async function translateObjectWithAI(obj, targetLocale, context = '', basePath = '') {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = basePath ? `${basePath}.${key}` : key;
    const keyContext = `${context} (UI Key: ${currentPath})`;

    if (typeof value === 'object' && value !== null) {
      // It's a nested object (folder), recurse deeper
      result[key] = await translateObjectWithAI(value, targetLocale, keyContext, currentPath);
    } else if (typeof value === 'string') {
      // It's a string, translate it
      console.log(`  🤖 Translating: "${value}" -> ${targetLocale}`);
      result[key] = await translateWithAI(value, targetLocale, keyContext);
      
      // Small delay to prevent hitting OpenAI rate limits
      await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
    } else {
      result[key] = value;
    }
  }

  return result;
}

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
  // Ensure directory exists
  if (!fs.existsSync(MESSAGES_DIR)){
    fs.mkdirSync(MESSAGES_DIR, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2) + '\n');
}

// Merge logic: Only translate missing keys or keys marked as [AUTO]
function mergeTranslations(existing, newTranslations) {
  const result = { ...existing };

  for (const [key, value] of Object.entries(newTranslations)) {
    if (typeof value === 'object' && value !== null && typeof existing[key] === 'object') {
      result[key] = mergeTranslations(existing[key] || {}, value);
    } else if (!existing[key] || existing[key].startsWith('[FAILED]')) {
      // Only overwrite if the key doesn't exist or previous translation failed
      result[key] = value;
    }
  }

  return result;
}

// Main Function
async function syncTranslationsAI() {
  console.log('🚀 Starting OpenAI Translation Sync...');

  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY is missing in .env.local file.');
    process.exit(1);
  }

  const sourceMessages = loadMessages(SOURCE_LOCALE);

  if (Object.keys(sourceMessages).length === 0) {
    console.log(`❌ No source messages found in ${SOURCE_LOCALE}.json`);
    return;
  }

  console.log(`📖 Loaded source: ${SOURCE_LOCALE}.json`);

  for (const locale of TARGET_LOCALES) {
    console.log(`\n🔄 Processing locale: ${locale}`);

    const existingMessages = loadMessages(locale);
    
    // 1. Translate the entire source object into the target language
    const translatedData = await translateObjectWithAI(
      sourceMessages,
      locale,
      `UI text for a Next.js application`
    );

    // 2. Merge with existing (so we don't overwrite manual edits)
    const finalMessages = mergeTranslations(existingMessages, translatedData);
    console.log(finalMessages);
    
    saveMessages(locale, finalMessages);
    console.log(`✅ Saved ${locale}.json`);
  }

  console.log('\n🎉 Translation complete!');
}

// Run the script
syncTranslationsAI();