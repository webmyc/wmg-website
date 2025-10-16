# The Whole Men Gathering Website

A standalone Astro application for The Whole Men Gathering landing page, designed to deploy as a separate Vercel project.

## Project Structure

```
sites/wmg/
├── public/
│   ├── hero/
│   │   └── hero-1920.jpg          # Hero background image
│   ├── team/                      # Optimized team portraits
│   │   ├── jesse.jpg
│   │   ├── matthew.jpg
│   │   ├── william.jpg
│   │   └── yungen.jpg
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── hero_source.jpg        # Source hero image
│   │   └── team_raw/              # Original team photos
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── WhatIs.astro
│   │   ├── Schedule.astro
│   │   ├── Invite.astro
│   │   ├── SignupForm.astro
│   │   ├── InnerCouncil.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── WMGLayout.astro
│   ├── lib/
│   │   └── animate.ts
│   └── pages/
│       └── index.astro
├── package.json
├── astro.config.mjs
├── tsconfig.json
├── tailwind.config.cjs
└── README_WMG.md
```

## Local Development

1. Navigate to the project directory:
   ```bash
   cd sites/wmg
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env and add your Formspree form ID
   ```

4. Start development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. Open [http://localhost:4321](http://localhost:4321) in your browser.

## Building for Production

```bash
pnpm build
# or
npm run build
```

The built site will be in the `dist/` directory.

## Vercel Deployment

### Project Settings

- **Root Directory**: `sites/wmg`
- **Build Command**: `pnpm build` (or `npm run build`)
- **Output Directory**: `dist`
- **Install Command**: `pnpm install` (or `npm install`)

### Environment Variables

Set the following environment variable in Vercel:

- `PUBLIC_FORMSPREE_ID`: Your Formspree form ID for the signup form

### Custom Domain

The site is configured for `https://wholemengathering.org` in the Astro config.

## Image Management

### Hero Image

To update the hero background image:

1. Replace `src/assets/hero_source.jpg` with your new image
2. Copy the new image to `public/hero/hero-1920.jpg`
3. For optimal performance, create multiple sizes:
   - `hero-1600.jpg` (1600px wide)
   - `hero-1920.jpg` (1920px wide) 
   - `hero-2560.jpg` (2560px wide)

### Team Portraits

To update team member photos:

1. Replace images in `src/assets/team_raw/` with new photos
2. Copy optimized versions to `public/team/` with web-safe filenames:
   - `jesse.jpg`
   - `matthew.jpg`
   - `william.jpg`
   - `yungen.jpg`

The images are automatically sized to 560×560px for desktop and 320×320px for mobile.

### Image Positioning

If team member faces aren't centered, update the `positions` object in `InnerCouncil.astro`:

```javascript
const positions = {
  jesse: '50% 35%',
  matthew: '50% 30%',
  william: '50% 40%',
  yungen: '50% 40%',
};
```

## Updating Event Information

To update gathering dates and times, edit the `gatherings` array in `Schedule.astro`:

```javascript
const gatherings = [
  {
    date: "2024-10-28",
    time: "16:00",
    endTime: "17:30", 
    title: "Your event title here"
  },
  // ... more events
];
```

The JSON-LD structured data will automatically update to reflect these changes.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WCAG AA compliant with proper ARIA labels and focus management
- **SEO Optimized**: Complete meta tags, Open Graph, Twitter cards, and JSON-LD structured data
- **Performance**: Optimized images, minimal JavaScript, and efficient CSS
- **Animations**: Subtle fade-in animations with reduced motion support
- **Form Integration**: Formspree integration for email collection
- **Noise Animation**: Subtle grain overlay on hero section (Squarespace-inspired)

## Performance Targets

- **Lighthouse Performance**: LCP < 2.5s on desktop
- **Accessibility**: ≥ 95 score
- **SEO**: 100 score
- **JavaScript Bundle**: < 50kb total

## Browser Support

- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Graceful degradation for older browsers
- Progressive enhancement for JavaScript features

## Content Guidelines

All content is optimized for LLM readability with:

- Semantic HTML structure (single H1, proper heading hierarchy)
- Machine-readable event data
- Structured team member information
- Clear, accessible form labels

## Support

For technical issues or questions about the website implementation, contact the development team at [respira.cafe](https://respira.cafe).
