/**
 * Analyze which pages are being generated at build time
 * Run: npx tsx scripts/analyze-build-pages.ts
 */

import { getAllSEOServices } from '../src/lib/seo-data';
import { getAllBlogPosts } from '../src/lib/blog-data';
import { TARGET_LOCATIONS } from '../src/lib/sitemap-config';

// PRIORITY_LOCATIONS from seo-data.ts (for static generation)
const PRIORITY_LOCATIONS = [
    'hartbeespoort',
    'harties',
    'schoemansville',
    'melodie',
    'pecanwood',
    'kosmos',
    'johannesburg',
    'sandton',
    'pretoria',
    'centurion',
    'midrand',
    'brits',
    'broederstroom',
];

console.log('\n========================================');
console.log('BUILD-TIME PAGE GENERATION ANALYSIS');
console.log('========================================\n');

const services = getAllSEOServices();
const blogPosts = getAllBlogPosts();

// Static pages
const staticPages = [
    '/',
    '/about',
    '/blog',
    '/careers',
    '/contact',
    '/gallery',
    '/locations',
    '/prices',
    '/specials',
    '/prices/hart-aesthetics',
    '/prices/fat-freezing',
    '/prices/slimming',
    '/prices/dermalogica',
    '/prices/ipl',
    '/prices/makeup',
    '/prices/medical',
    '/prices/permanent-makeup',
    '/prices/pro-skin',
    '/prices/qms-facial',
    '/prices/sunbed',
    '/prices/waxing',
    '/prices/hair',
    '/prices/nails',
    '/prices/lashes',
    '/prices/hair-extensions',
    '/services/microblading',
    '/services/fat-freezing-treatment',
    '/services/lash-extensions',
    '/services/lip-fillers',
    '/services/brazilian-wax',
    '/services/dermalogica-facial',
    '/services/nail-art',
    '/services/massage-therapy',
];

console.log('1. STATIC PAGES');
console.log('================');
console.log(`Total: ${staticPages.length} pages`);
console.log('Examples:', staticPages.slice(0, 5).join(', '));

console.log('\n2. BLOG POSTS');
console.log('================');
console.log(`Total: ${blogPosts.length} pages`);
console.log(`Pattern: /blog/[slug]`);
console.log('Examples:', blogPosts.slice(0, 3).map(p => `/blog/${p.slug}`).join(', '));

console.log('\n3. LOCATION HUB PAGES (All Locations - generateStaticParams)');
console.log('================');
console.log(`Total: ${TARGET_LOCATIONS.length} pages`);
console.log(`Pattern: /locations/[location]`);
console.log('Examples:', TARGET_LOCATIONS.slice(0, 5).map(loc => `/locations/${loc}`).join(', '));

console.log('\n4. LOCATION × SERVICE PAGES (PRIORITY ONLY)');
console.log('================');
const priorityLocationServicePages = PRIORITY_LOCATIONS.length * services.length;
console.log(`Priority locations: ${PRIORITY_LOCATIONS.length}`);
console.log(`Services: ${services.length}`);
console.log(`Total pages generated at build: ${priorityLocationServicePages}`);
console.log(`Pattern: /locations/[location]/[service]`);
console.log('\nPriority locations:');
console.log(PRIORITY_LOCATIONS.map((loc, i) => `  ${i + 1}. ${loc}`).join('\n'));
console.log('\nExamples:');
console.log(`  /locations/hartbeespoort/microblading`);
console.log(`  /locations/pretoria/lip-fillers`);
console.log(`  /locations/sandton/dermalogica-facial`);

console.log('\n5. ON-DEMAND PAGES (Generated when visited)');
console.log('================');
const nonPriorityLocations = TARGET_LOCATIONS.length - PRIORITY_LOCATIONS.length;
const onDemandPages = nonPriorityLocations * services.length;
console.log(`Non-priority locations: ${nonPriorityLocations}`);
console.log(`Services: ${services.length}`);
console.log(`Total on-demand pages: ${onDemandPages}`);
console.log(`Note: These are NOT generated at build time (dynamicParams = true)`);
console.log(`They are generated on first visit and cached.`);

console.log('\n========================================');
console.log('BUILD TIME TOTALS');
console.log('========================================');
const totalBuildPages = staticPages.length + blogPosts.length + TARGET_LOCATIONS.length + priorityLocationServicePages;
console.log(`Static pages:              ${staticPages.length.toLocaleString()}`);
console.log(`Blog posts:                ${blogPosts.length.toLocaleString()}`);
console.log(`Location hubs:             ${TARGET_LOCATIONS.length.toLocaleString()}`);
console.log(`Location × Service pages:  ${priorityLocationServicePages.toLocaleString()}`);
console.log(`  (${PRIORITY_LOCATIONS.length} priority locations × ${services.length} services)`);
console.log('----------------------------------------');
console.log(`TOTAL BUILT AT BUILD TIME: ${totalBuildPages.toLocaleString()} pages`);
console.log('========================================');

console.log('\n🔥 BUILD OPTIMIZATION');
console.log('----------------');
console.log(`Only ${PRIORITY_LOCATIONS.length}/${TARGET_LOCATIONS.length} locations (${((PRIORITY_LOCATIONS.length / TARGET_LOCATIONS.length) * 100).toFixed(1)}%) are pre-built with all services`);
console.log(`This saves ${onDemandPages.toLocaleString()} pages from being built at build time!`);
console.log(`Build time: ~3-5 minutes instead of 30+ minutes`);

console.log('\n📊 TOTAL COVERAGE');
console.log('----------------');
const totalPossiblePages = staticPages.length + blogPosts.length + TARGET_LOCATIONS.length + (TARGET_LOCATIONS.length * services.length);
console.log(`Total possible pages: ${totalPossiblePages.toLocaleString()}`);
console.log(`Built at build time:  ${totalBuildPages.toLocaleString()}`);
console.log(`Generated on-demand:  ${onDemandPages.toLocaleString()}`);
