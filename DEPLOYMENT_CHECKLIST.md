# Multi-Sitemap Deployment Checklist

## ✅ Pre-Deployment

- [x] Split locations into SITEMAP_0 (local/northwest) and SITEMAP_1 (extended Gauteng)
- [x] Added 21 new Northwest locations (Rustenburg, Potchefstroom, etc.)
- [x] Created sitemap index at `/sitemap.xml`
- [x] Created dynamic sitemap routes at `/sitemap/[id]/route.ts`
- [x] Verified URL counts (36,769 and 27,540 URLs)
- [x] Verified no duplicate locations (238 unique locations)
- [x] Tested configuration scripts

## 🚀 Deployment Steps

### 1. Build the Project
```bash
npm run build
```
**Expected:** Build should complete successfully

### 2. Test Locally (Optional)
```bash
npm run dev
```
Then visit:
- http://localhost:3000/sitemap.xml (should show sitemap index)
- http://localhost:3000/sitemap/0.xml (should show XML with 36,769 URLs)
- http://localhost:3000/sitemap/1.xml (should show XML with 27,540 URLs)

### 3. Deploy to Production
Deploy using your usual deployment method (Vercel, etc.)

---

## 🔍 Post-Deployment Verification

### Step 1: Check Sitemap Index
Visit: https://www.galeobeauty.com/sitemap.xml

**Should see:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.galeobeauty.com/sitemap/0.xml</loc>
    <lastmod>2026-01-28T...</lastmod>
  </url>
  <url>
    <loc>https://www.galeobeauty.com/sitemap/1.xml</loc>
    <lastmod>2026-01-28T...</lastmod>
  </url>
</urlset>
```

- [ ] Sitemap index loads successfully
- [ ] Shows 2 sitemap references

### Step 2: Check Sitemap 0 (Primary Local & Northwest)
Visit: https://www.galeobeauty.com/sitemap/0.xml

**Should contain:**
- Static pages (home, prices, services, etc.)
- Blog posts
- `/locations` index page
- Hartbeespoort/Harties locations
- Pretoria & Centurion locations
- Northwest locations (Brits, Rustenburg, etc.)

Quick checks:
- [ ] Contains `<loc>https://www.galeobeauty.com/</loc>`
- [ ] Contains `<loc>https://www.galeobeauty.com/locations/harties/...</loc>`
- [ ] Contains `<loc>https://www.galeobeauty.com/locations/pretoria/...</loc>`
- [ ] Contains `<loc>https://www.galeobeauty.com/locations/rustenburg/...</loc>`
- [ ] XML is valid (no errors in browser)

### Step 3: Check Sitemap 1 (Extended Gauteng)
Visit: https://www.galeobeauty.com/sitemap/1.xml

**Should contain:**
- Johannesburg locations
- East Rand locations
- West Rand locations
- Vaal Triangle locations

Quick checks:
- [ ] Contains `<loc>https://www.galeobeauty.com/locations/sandton/...</loc>`
- [ ] Contains `<loc>https://www.galeobeauty.com/locations/johannesburg/...</loc>`
- [ ] XML is valid (no errors in browser)

### Step 4: Verify Robots.txt
Visit: https://www.galeobeauty.com/robots.txt

**Should contain:**
```
User-agent: *
Allow: /
Sitemap: https://www.galeobeauty.com/sitemap.xml
```

- [ ] Robots.txt references sitemap.xml correctly

---

## 🎯 Google Search Console Setup

### Submit Sitemap
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property: `galeobeauty.com`
3. Navigate to: **Indexing** → **Sitemaps**
4. Click **Add a new sitemap**
5. Enter: `sitemap.xml`
6. Click **Submit**

**Note:** Google will automatically discover and crawl both `/sitemap/0.xml` and `/sitemap/1.xml` from the sitemap index.

### Monitor Crawling
After 24-48 hours:
- [ ] Check sitemap status (should show "Success")
- [ ] Check discovered URLs count (should show ~64,309 URLs)
- [ ] Check last read date (should be recent)

---

## 📊 Performance Monitoring

### Week 1
- [ ] Verify Google has discovered both sitemaps
- [ ] Check that URLs are being crawled
- [ ] Monitor any crawl errors

### Week 2-4
- [ ] Check indexing rate for Sitemap 0 (local areas)
- [ ] Check indexing rate for Sitemap 1 (extended areas)
- [ ] Local areas should index faster due to priority

### Monthly
- [ ] Review search performance for local keywords
- [ ] Monitor organic traffic from Northwest/Harties areas
- [ ] Track rankings for location-specific services

---

## 🐛 Troubleshooting

### Issue: Sitemap index not loading
**Solution:** Check that `src/app/sitemap.ts` exists and is correct

### Issue: Individual sitemaps (0.xml, 1.xml) return 404
**Solution:** Check that `src/app/sitemap/[id]/route.ts` exists and build succeeded

### Issue: Sitemap shows wrong number of URLs
**Solution:** Run verification script:
```bash
npx tsx -e "import { printSitemapCounts } from './src/lib/sitemap-utils'; printSitemapCounts();"
```

### Issue: Google Search Console shows errors
**Solution:** Check XML validity, ensure all URLs are accessible

---

## 📞 Support

If you encounter issues:
1. Check the implementation docs: `SITEMAP_IMPLEMENTATION.md`
2. Run test scripts: `npx tsx scripts/test-sitemap.ts`
3. Verify URL counts: `npx tsx -e "import { printSitemapCounts } from './src/lib/sitemap-utils'; printSitemapCounts();"`

---

## ✅ Success Criteria

- [x] Implementation complete
- [ ] Build successful
- [ ] Deployed to production
- [ ] All 3 sitemap URLs load correctly
- [ ] Submitted to Google Search Console
- [ ] Google crawling both sitemaps
- [ ] Local areas (Harties/Northwest) getting indexed

---

**Expected Timeline:**
- Deployment: Immediate
- Google Discovery: 1-3 days
- Initial Crawling: 1-7 days
- Full Indexing: 2-4 weeks
- SEO Impact: 4-8 weeks
