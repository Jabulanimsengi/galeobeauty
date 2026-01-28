/**
 * Test script to verify sitemap URL counts
 * Run: npx tsx scripts/test-sitemap.ts
 */

import { SITEMAP_0_LOCATIONS, SITEMAP_1_LOCATIONS } from '../src/lib/sitemap-config';

console.log('\n========================================');
console.log('SITEMAP CONFIGURATION TEST');
console.log('========================================\n');

console.log('SITEMAP 0 LOCATIONS:');
console.log(`Total: ${SITEMAP_0_LOCATIONS.length} locations`);
console.log('Sample locations:', SITEMAP_0_LOCATIONS.slice(0, 5).join(', '));

console.log('\nSITEMAP 1 LOCATIONS:');
console.log(`Total: ${SITEMAP_1_LOCATIONS.length} locations`);
console.log('Sample locations:', SITEMAP_1_LOCATIONS.slice(0, 5).join(', '));

console.log('\n========================================');
console.log(`GRAND TOTAL: ${SITEMAP_0_LOCATIONS.length + SITEMAP_1_LOCATIONS.length} locations`);
console.log('========================================\n');

// Verify no duplicates
const allLocations = [...SITEMAP_0_LOCATIONS, ...SITEMAP_1_LOCATIONS];
const uniqueLocations = new Set(allLocations);

if (allLocations.length !== uniqueLocations.size) {
    console.error('❌ ERROR: Duplicate locations found!');
    const duplicates = allLocations.filter((item, index) => allLocations.indexOf(item) !== index);
    console.error('Duplicates:', duplicates);
} else {
    console.log('✅ No duplicate locations found');
}

// Check for Northwest locations in Sitemap 0
const northwestKeywords = ['brits', 'rustenburg', 'potchefstroom', 'klerksdorp', 'sun-city'];
const northwestInSitemap0 = SITEMAP_0_LOCATIONS.filter(loc =>
    northwestKeywords.some(keyword => loc.includes(keyword))
);

console.log(`\n✅ Northwest locations in Sitemap 0: ${northwestInSitemap0.length}`);
console.log('Examples:', northwestInSitemap0.slice(0, 5).join(', '));

// Check for Harties locations in Sitemap 0
const hartiesKeywords = ['harties', 'hartbeespoort', 'schoemansville', 'melodie'];
const hartiesInSitemap0 = SITEMAP_0_LOCATIONS.filter(loc =>
    hartiesKeywords.some(keyword => loc.includes(keyword))
);

console.log(`\n✅ Harties area locations in Sitemap 0: ${hartiesInSitemap0.length}`);
console.log('Examples:', hartiesInSitemap0.slice(0, 5).join(', '));
