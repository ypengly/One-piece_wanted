# Wanted Maker

Create a personalized, pirate-style bounty poster in your browser and download it as a print-ready A4 PDF or a high-resolution PNG.

Everything runs client-side — your name, bounty amount, and photo are never uploaded to a server.

## Features

- Live poster preview that updates as you type
- Upload a photo or capture one with your device camera
- Zoom, pan, rotate, and tone-adjust your photo (sepia/grayscale, brightness/contrast)
- Download as a print-ready A4 PDF (210×297mm) or a high-resolution PNG (2480×3508px)
- Fully responsive, works well on mobile
- No backend, no database, no accounts

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Build for production

```bash
npm run build
npm run preview
```

## Tech stack

React, TypeScript, Vite, Tailwind CSS v4, HTML Canvas, the browser MediaDevices API, and jsPDF.

## Project structure

```
src/
  components/     UI building blocks (editor controls, camera modal, preview, exports)
  pages/          HomePage (poster generator) and SupportPage
  lib/            Rendering engine, formatting, image loading, PDF/PNG export
```

The poster itself is rendered by a single function, `renderPoster()` in `src/lib/renderPoster.ts`,
which is used for the live preview, the PNG export, and the PDF export alike — so what you see is
always exactly what you download.
