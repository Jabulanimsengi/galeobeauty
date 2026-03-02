const fs = require('fs');

const markdownFile = 'hartbeespoort-indexing-urls.md';
const content = fs.readFileSync(markdownFile, 'utf8');

const urlRegex = /https:\/\/www\.galeobeauty\.com\/([^\s]+)/g;
const matches = [...content.matchAll(urlRegex)];

let urls = matches.map(m => m[0]);
urls.push('https://www.galeobeauty.com/');
urls = [...new Set(urls)];

console.log(`Found ${urls.length} unique URLs. Checking sequentially against localhost:3000...`);

async function checkUrl(url) {
    const localUrlStr = url.replace('https://www.galeobeauty.com', 'http://localhost:3000');
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 sec timeout for Next.js compiling

        const response = await fetch(localUrlStr, {
            method: 'GET',
            redirect: 'manual', // do not follow redirects so we can see 308s
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        return {
            original: url,
            local: localUrlStr,
            status: response.status,
        };
    } catch (error) {
        return {
            original: url,
            local: localUrlStr,
            status: 'ERROR',
            error: error.message
        };
    }
}

async function run() {
    const results = {
        '200': [],
        '308': [],
        '404': [],
        '500': [],
        'OTHER': []
    };

    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        process.stdout.write(`[${i + 1}/${urls.length}] ${url.replace('https://www.galeobeauty.com', '')} `);

        const res = await checkUrl(url);

        console.log(`-> ${res.status}`);

        if (res.status === 200) results['200'].push(res);
        else if (res.status === 308 || res.status === 301) results['308'].push(res);
        else if (res.status === 404) results['404'].push(res);
        else if (res.status === 500) results['500'].push(res);
        else results['OTHER'].push(res);
    }

    console.log('\n--- Final Results ---');
    console.log(`✅ 200 OK: ${results['200'].length}`);
    console.log(`➡️  308 Redirect: ${results['308'].length}`);
    console.log(`❌ 404 Not Found: ${results['404'].length}`);
    console.log(`⚠️  500 Error: ${results['500'].length}`);
    console.log(`❓ Other/Error: ${results['OTHER'].length}`);

    if (results['404'].length > 0) {
        console.log('\nURLs returning 404:');
        results['404'].forEach(r => console.log(`- ${r.original}`));
    }
}

run();
