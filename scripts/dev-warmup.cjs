/**
 * Dev Warmup Script
 * 
 * Automatically pre-compiles critical pages in dev mode by hitting them
 * immediately after the dev server is ready. This ensures that when you
 * click on a page in the browser, Turbopack has already compiled it.
 * 
 * Usage: Run alongside `npm run dev` via `npm run dev:warm`
 */

const http = require('http');

const BASE = 'http://localhost:3000';
const MAX_RETRIES = 60;
const RETRY_INTERVAL = 2000;

// Critical pages to warm up — these are the ones with heavy module graphs
const WARMUP_PATHS = [
  '/',                                           // Home (heaviest - compiles framework + services-data)
  '/services',                                     // Prices index (compiles framer-motion client bundle)
  '/services/nails/gel-hands',                     // Service detail (compiles seo-data, bespoke-service-pages)
  '/services/lashes-brows',                        // Category page (compiles seo-keywords, category-pages)
  '/blog',                                       // Blog index (compiles blog-data)
];

function fetch(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, { timeout: 120000 }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, size: data.length }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function waitForServer() {
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const result = await fetch(BASE);
      if (result.status === 200) return true;
    } catch {
      // Server not ready yet
    }
    process.stdout.write('.');
    await new Promise(r => setTimeout(r, RETRY_INTERVAL));
  }
  return false;
}

async function warmup() {
  console.log('\n🔥 Dev Warmup: Waiting for server...');
  
  const ready = await waitForServer();
  if (!ready) {
    console.log('\n❌ Server did not become ready. Skipping warmup.');
    process.exit(0);
  }

  console.log('\n✓ Server is ready. Pre-compiling critical pages...\n');

  for (const path of WARMUP_PATHS) {
    const url = `${BASE}${path}`;
    const start = Date.now();
    try {
      const result = await fetch(url);
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      const status = result.status === 200 ? '✓' : `⚠ ${result.status}`;
      console.log(`  ${status}  ${path.padEnd(40)} ${elapsed}s`);
    } catch (err) {
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      console.log(`  ✗  ${path.padEnd(40)} ${elapsed}s (${err.message})`);
    }
  }

  console.log('\n🚀 Warmup complete! All critical pages are pre-compiled.\n');
}

warmup();
