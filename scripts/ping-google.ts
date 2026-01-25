
import https from 'https';

const SITEMAP_URL = 'https://www.galeobeauty.com/sitemap.xml';

function pingGoogle() {
    const url = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;

    console.log(`Pinging Google with sitemap: ${SITEMAP_URL}`);

    https.get(url, (res) => {
        const { statusCode } = res;

        console.log(`Response Status: ${statusCode}`);

        if (statusCode === 200) {
            console.log('✅ Successfully pinged Google! The crawler should visit your sitemap soon.');
        } else {
            console.log(`❌ Failed to ping Google. Status Code: ${statusCode}`);
        }

        res.on('data', (d) => {
            process.stdout.write(d);
        });
    }).on('error', (e) => {
        console.error(`❌ Error pinging Google: ${e.message}`);
    });
}

pingGoogle();
