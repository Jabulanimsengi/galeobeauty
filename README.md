This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Build Scope

Local `next build` runs in a reduced static-generation mode by default so the build finishes much faster on a workstation.

- Local default: reduced prebuild set
- CI/Vercel/Hetzner default: full prebuild set when the deploy target is marked
- Manual override: set `GALEO_BUILD_SCOPE=full` or `GALEO_BUILD_SCOPE=reduced`
- Hetzner recommended: set `GALEO_DEPLOY_TARGET=hetzner` or `HETZNER=1`

This only changes how many static params are pre-generated during build. Routes that use on-demand generation can still render outside the reduced set.

## Performance Workflow

Use the image scripts before large content updates so oversized assets do not slow down page loads or image optimization on the server.

- Audit current image sizes: `npm run audit:images`
- Audit duplicate image files: `npm run audit:image-dupes`
- Optimize large images in place: `npm run optimize:images`
- Optional overrides: `node scripts/optimize-images.js --max-width=2200 --quality=82 --min-bytes=358400 --write`

The optimizer uses `sharp`, keeps the original filenames, and only replaces a file when the optimized output is smaller.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
