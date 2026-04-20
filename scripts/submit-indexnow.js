const fs = require('fs');
const path = require('path');

const API_ENDPOINT = "https://api.indexnow.org/indexnow";
const HOST = "www.galeobeauty.com";
const KEY = "vc7v9z6z4hp8dhebvsnbdj67unuhvpbe";
const KEY_LOCATION = "https://www.galeobeauty.com/vc7v9z6z4hp8dhebvsnbdj67unuhvpbe.txt";

const sitemapsDir = path.join(__dirname, '..', 'public', 'sitemaps');
const BATCH_SIZE = 10000; // API Limit

async function run() {
  console.log("Starting IndexNow submission script...");

  if (!fs.existsSync(sitemapsDir)) {
    console.error(`Sitemaps directory not found at ${sitemapsDir}. Make sure sitemaps are generated first.`);
    process.exit(1);
  }

  const files = fs.readdirSync(sitemapsDir).filter(f => f.endsWith('.xml'));
  let allUrls = [];

  for (const file of files) {
    const filePath = path.join(sitemapsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extracting <loc> tags using regex
    const matches = [...content.matchAll(/<loc>(.*?)<\/loc>/g)];
    const urls = matches.map(m => m[1]);
    allUrls.push(...urls);
  }

  // Check the root sitemap as well
  const rootSitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  if (fs.existsSync(rootSitemapPath)) {
    const rootContent = fs.readFileSync(rootSitemapPath, 'utf-8');
    const rootMatches = [...rootContent.matchAll(/<loc>(.*?)<\/loc>/g)];
    const rootUrls = rootMatches.map(m => m[1]).filter(url => !url.endsWith('.xml')); // Exclude index links
    allUrls.push(...rootUrls);
  }

  // Deduplicate using a Set
  allUrls = [...new Set(allUrls)];

  console.log(`Found ${allUrls.length} total unique URLs to submit.`);

  if (allUrls.length === 0) {
    console.log("No URLs to submit. Exiting.");
    return;
  }

  for (let i = 0; i < allUrls.length; i += BATCH_SIZE) {
    const chunk = allUrls.slice(i, i + BATCH_SIZE);
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
    console.log(`Submitting batch ${batchNumber} of ${Math.ceil(allUrls.length / BATCH_SIZE)} (${chunk.length} URLs)...`);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          host: HOST,
          key: KEY,
          keyLocation: KEY_LOCATION,
          urlList: chunk
        })
      });

      if (response.ok) {
        console.log(`✅ Batch ${batchNumber} accepted (Status: ${response.status})`);
      } else {
        const text = await response.text();
        console.error(`❌ Batch ${batchNumber} failed (Status: ${response.status}): ${text}`);
      }
    } catch (error) {
      console.error(`Error submitting batch ${batchNumber}:`, error);
    }
  }

  console.log("IndexNow submission process complete.");
}

run();
