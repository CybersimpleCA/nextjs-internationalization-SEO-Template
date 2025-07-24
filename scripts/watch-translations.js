#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { syncTranslations } = require('./translate');

const MESSAGES_DIR = path.join(__dirname, '../messages');
const SOURCE_FILE = path.join(MESSAGES_DIR, 'en.json');

console.log('👀 Watching for translation changes...');
console.log(`📁 Monitoring: ${SOURCE_FILE}`);

if (!fs.existsSync(SOURCE_FILE)) {
  console.log('❌ Source file not found:', SOURCE_FILE);
  process.exit(1);
}

let isProcessing = false;

// Watch for file changes
fs.watchFile(SOURCE_FILE, { interval: 1000 }, (curr, prev) => {
  if (isProcessing) return;
  
  if (curr.mtime > prev.mtime) {
    console.log('\n🔄 Changes detected in en.json!');
    console.log('⚡ Auto-syncing translations...');
    
    isProcessing = true;
    
    setTimeout(() => {
      try {
        syncTranslations();
        console.log('✅ Auto-sync completed!\n');
      } catch (error) {
        console.error('❌ Auto-sync failed:', error.message);
      }
      isProcessing = false;
    }, 500); // Small delay to ensure file write is complete
  }
});

console.log('✅ File watcher started. Press Ctrl+C to stop.');
console.log('💡 Edit messages/en.json to trigger automatic translation sync.');

// Keep the process running
process.on('SIGINT', () => {
  console.log('\n👋 Stopping translation watcher...');
  process.exit(0);
}); 