# 🏴‍☠️ Wanted Maker

<p align="center">
  <strong>Turn yourself into a legendary outlaw.</strong><br/>
  Create, customize, and download a cinematic pirate-style bounty poster — entirely in your browser.
</p>

<p align="center">
  <a href="#-features">Features</a> ·
  <a href="#-demo">Demo</a> ·
  <a href="#-getting-started">Getting Started</a> ·
  <a href="#-tech-stack">Tech Stack</a> ·
  <a href="#-architecture">Architecture</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/100%25-Client--Side-22C55E?style=flat-square" alt="Client Side"/>
  <img src="https://img.shields.io/badge/Privacy-First-8B5CF6?style=flat-square" alt="Privacy First"/>
  <img src="https://img.shields.io/badge/No-Backend-F59E0B?style=flat-square" alt="No Backend"/>
  <img src="https://img.shields.io/badge/License-MIT-111827?style=flat-square" alt="MIT License"/>
</p>

---

## ✨ Overview

**Wanted Maker** is a browser-based poster generator that transforms your photo and details into a classic **pirate-style bounty poster**.

Everything happens locally in your browser.

Your **name, bounty amount, and uploaded photo never need to leave your device**.

Customize your poster in real time, position your photo, adjust its appearance, and export the final result as either a high-resolution PNG or print-ready A4 PDF.

> **Your poster. Your data. Your browser.**

---

## 🎬 Demo

<p align="center">
  <!-- Replace with your actual demo screenshot -->
  <img src="./docs/screenshots/editor.png" alt="Wanted Maker Editor" width="900"/>
</p>

<p align="center">
  <em>Live poster editor — customize your bounty poster in real time.</em>
</p>

### 🖼️ Poster Preview

<p align="center">
  <img src="./docs/screenshots/poster-preview.png" alt="Wanted Maker Poster Preview" width="420"/>
</p>

### 📱 Mobile Experience

<p align="center">
  <img src="./docs/screenshots/mobile.png" alt="Wanted Maker Mobile Interface" width="300"/>
</p>

> **Screenshot placeholders:**
> Add your screenshots to `docs/screenshots/` and update the paths above.

---

## 🧭 Table of Contents

* [✨ Overview](#-overview)
* [🎬 Demo](#-demo)
* [🚀 Features](#-features)
* [🎨 Customization](#-customization)
* [🔒 Privacy First](#-privacy-first)
* [📦 Getting Started](#-getting-started)
* [🛠️ Build for Production](#️-build-for-production)
* [🏗️ Architecture](#️-architecture)
* [💻 Tech Stack](#-tech-stack)
* [📁 Project Structure](#-project-structure)
* [🧠 Rendering Pipeline](#-rendering-pipeline)
* [📤 Export Formats](#-export-formats)
* [📱 Browser Support](#-browser-support)
* [🤝 Contributing](#-contributing)
* [📄 License](#-license)

---

# 🚀 Features

<table>
<tr>
<td width="50%">

### ⚡ Live Editing

See your poster update instantly while you type.

* Name
* Bounty amount
* Poster details
* Photo adjustments

</td>
<td width="50%">

### 🖼️ Advanced Photo Controls

Fine-tune your portrait directly inside the editor.

* Zoom
* Pan
* Rotate
* Brightness
* Contrast
* Sepia
* Grayscale

</td>
</tr>

<tr>
<td width="50%">

### 📸 Camera Capture

Use your device camera to capture a photo directly from the browser.

Powered by the native **MediaDevices API**.

</td>
<td width="50%">

### 📄 Print-Ready PDF

Generate a professional **A4 PDF** suitable for printing.

**210 × 297 mm**

</td>
</tr>

<tr>
<td width="50%">

### 🖥️ High-Resolution PNG

Export your final poster as a large PNG.

**2480 × 3508 px**

Perfect for sharing or high-quality printing.

</td>
<td width="50%">

### 📱 Responsive Design

Designed to work across:

* Desktop
* Tablet
* Mobile
* Touch devices

</td>
</tr>

<tr>
<td width="50%">

### 🔐 Privacy First

No accounts.

No database.

No image uploads.

No backend processing.

</td>
<td width="50%">

### 🎯 Pixel-Consistent Exports

The same rendering engine powers:

* Live preview
* PNG export
* PDF export

What you see is what you download.

</td>
</tr>
</table>

---

# 🎨 Customization

Wanted Maker gives you control over the entire poster creation process.

### 👤 Personal Details

Enter information such as:

```text
Name: Captain Jack
Bounty: $50,000
```

The poster updates automatically as you type.

### 🖼️ Photo Editing

Transform your photo directly in the browser:

| Control       | Description                    |
| ------------- | ------------------------------ |
| 🔍 Zoom       | Scale the image                |
| ↔️ Pan        | Reposition the image           |
| 🔄 Rotate     | Rotate the portrait            |
| ☀️ Brightness | Adjust image brightness        |
| ◐ Contrast    | Increase or decrease contrast  |
| 🟤 Sepia      | Create an aged appearance      |
| ⚫ Grayscale   | Create a monochrome appearance |

---

# 🔒 Privacy First

Wanted Maker was designed around a simple principle:

> **Your personal content should stay personal.**

There is **no backend** responsible for processing your poster.

Your:

* Name
* Bounty amount
* Photo
* Camera capture
* Poster data

are processed locally by your browser.

### No Account Required

You don't need to:

* Create an account
* Upload your photo
* Create a database record
* Send personal information to an API

Just open the application and start creating.

---

# 📦 Getting Started

## Prerequisites

Make sure you have:

* **Node.js**
* **npm**

installed on your machine.

Check your versions:

```bash
node --version
npm --version
```

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/wanted-maker.git
```

Enter the project directory:

```bash
cd wanted-maker
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL displayed by Vite in your browser.

---

# 🛠️ Build for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The generated production files will be placed in:

```text
dist/
```

---

# 🏗️ Architecture

Wanted Maker follows a component-based React architecture with a dedicated rendering layer.

```text
┌───────────────────────────────────────────┐
│                  React UI                  │
│                                           │
│  Editor Controls → Photo Controls → UI   │
└────────────────────┬──────────────────────┘
                     │
                     ▼
┌───────────────────────────────────────────┐
│             Poster State                   │
│                                           │
│  Name · Bounty · Photo · Transformations │
└────────────────────┬──────────────────────┘
                     │
                     ▼
┌───────────────────────────────────────────┐
│             renderPoster()                │
│                                           │
│        HTML Canvas Rendering Engine       │
└───────────────┬───────────────┬───────────┘
                │               │
                ▼               ▼
        Live Preview       Export Pipeline
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
               PNG Export              PDF Export
```

The rendering engine is intentionally shared.

This prevents the live preview and exported poster from drifting apart visually.

---

# 🧠 Rendering Pipeline

The core of the application is:

```text
src/lib/renderPoster.ts
```

The `renderPoster()` function is responsible for rendering the poster onto an HTML Canvas.

The same function is used for:

```text
Live Preview
     │
     ├──────────────► Canvas
     │
     ├──────────────► PNG Export
     │
     └──────────────► PDF Export
```

This architecture provides an important guarantee:

> **The preview and downloaded output use the same rendering logic.**

That means users aren't looking at one design while downloading another.

---

# 📤 Export Formats

## PNG

Wanted Maker exports a high-resolution PNG at:

```text
2480 × 3508 px
```

This corresponds closely to an A4 document at 300 DPI.

Ideal for:

* Digital sharing
* High-quality printing
* Social media
* Image editing

---

## PDF

The application can also generate a print-ready A4 PDF:

```text
210 × 297 mm
```

PDF generation is handled client-side using **jsPDF**.

No server-side rendering is required.

---

# 📁 Project Structure

```text
wanted-maker/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── EditorControls/
│   │   ├── CameraModal/
│   │   ├── PosterPreview/
│   │   └── ExportControls/
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   └── SupportPage.tsx
│   │
│   ├── lib/
│   │   ├── renderPoster.ts
│   │   ├── imageLoader.ts
│   │   ├── formatting.ts
│   │   └── export.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── docs/
│   └── screenshots/
│       ├── editor.png
│       ├── poster-preview.png
│       └── mobile.png
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

# 💻 Tech Stack

| Technology          | Purpose                            |
| ------------------- | ---------------------------------- |
| ⚛️ React            | UI and component architecture      |
| 🔷 TypeScript       | Type-safe application logic        |
| ⚡ Vite              | Development and production tooling |
| 🎨 Tailwind CSS v4  | Responsive UI styling              |
| 🖌️ HTML Canvas     | Poster rendering                   |
| 📷 MediaDevices API | Browser camera access              |
| 📄 jsPDF            | Client-side PDF generation         |
| 🌐 Browser APIs     | Local image and file processing    |

---

# 📱 Browser Support

Wanted Maker relies on modern browser APIs such as:

* HTML Canvas
* File APIs
* MediaDevices API
* Modern JavaScript
* ES Modules

Recommended browsers:

* Chrome / Chromium
* Microsoft Edge
* Firefox
* Safari

Camera functionality may require **HTTPS** or a secure local development environment depending on the browser.

---

# 🔐 No Backend Required

One of the project's biggest advantages is its simplicity.

```text
Traditional Application

Browser
   │
   ▼
Frontend
   │
   ▼
Backend
   │
   ▼
Database / Storage
```

Wanted Maker:

```text
Browser
   │
   ├── React
   ├── Canvas
   ├── Camera API
   ├── Image Processing
   └── Export
```

Everything happens on the client.

That makes the application:

* Easy to deploy
* Easy to maintain
* Cheap to host
* Privacy-friendly
* Fast
* Server-independent

---

# 🤝 Contributing

Contributions are welcome!

If you'd like to improve Wanted Maker:

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/amazing-feature
```

3. Make your changes
4. Commit them

```bash
git commit -m "feat: add amazing feature"
```

5. Push your branch

```bash
git push origin feature/amazing-feature
```

6. Open a Pull Request

### 💡 Ideas for Contributions

Some possible improvements:

* Additional poster themes
* More typography options
* Custom poster backgrounds
* Drag-and-drop image positioning
* More photo filters
* Additional paper sizes
* Social sharing
* Keyboard shortcuts
* Undo / redo history
* Poster templates
* Dark/light editor themes

---

# 🗺️ Roadmap

Potential future improvements:

* [ ] Multiple poster templates
* [ ] Custom fonts
* [ ] More image filters
* [ ] Undo / redo
* [ ] Keyboard shortcuts
* [ ] Drag-and-drop editing
* [ ] Custom poster colors
* [ ] Additional paper formats
* [ ] Shareable poster presets
* [ ] PWA / installable web app
* [ ] Offline-first support

---

# ⭐ Why Wanted Maker?

Most poster generators require accounts, cloud processing, or complicated editors.

Wanted Maker takes a different approach:

**Open the app → customize → export.**

No account.

No upload.

No waiting.

No backend.

Just a fast, focused creative tool running directly in your browser.

---

# 📄 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for more information.

---

<p align="center">
  <strong>🏴‍☠️ Make your bounty legendary.</strong>
</p>

<p align="center">
  Built with React, TypeScript, Canvas, and a little pirate spirit.
</p>

<p align="center">
  ⭐ If you like the project, consider giving it a star!
</p>
