import type { ReactNode } from "react";

interface FaqItem {
  q: string;
  a: ReactNode;
}

const faqs: FaqItem[] = [
  {
    q: "How do I create a poster?",
    a: (
      <ol className="list-decimal space-y-1.5 pl-5">
        <li>Enter a name in the Character Name field.</li>
        <li>Enter a bounty amount &mdash; it&rsquo;ll format with commas automatically.</li>
        <li>Upload a photo, or open your camera to take one.</li>
        <li>Use the sliders to zoom, reposition, or adjust the tone of your photo.</li>
        <li>Download the poster as a PDF or an image.</li>
      </ol>
    ),
  },
  {
    q: "How do I download my poster?",
    a: (
      <p>
        <strong className="text-[var(--color-paper)]">Download PDF</strong> creates a print-ready A4 file, correctly
        sized at 210&times;297mm with no browser UI in it &mdash; ideal for printing. <strong className="text-[var(--color-paper)]">Download Image</strong>{" "}
        creates a high-resolution PNG (2480&times;3508px) that&rsquo;s better for sharing on social media or messaging
        apps. Both buttons use the exact poster you see in the preview.
      </p>
    ),
  },
  {
    q: "Does the website store my photo?",
    a: (
      <p>
        No. Your photo is processed entirely in your browser using the Canvas API. It is never uploaded to a server,
        and Wanted Maker doesn&rsquo;t use a database &mdash; nothing about your poster is stored anywhere once you
        close or refresh the tab.
      </p>
    ),
  },
  {
    q: "Why does the camera not work?",
    a: (
      <p>
        Your browser needs permission to use the camera &mdash; check for a permission prompt, or look for a camera
        icon in your address bar if you accidentally dismissed it. Camera access also generally requires a secure
        (HTTPS) connection, and won&rsquo;t work if another app or browser tab is already using your camera.
      </p>
    ),
  },
];

export default function SupportPage() {
  return (
    <div className="board-texture min-h-[calc(100vh-56px)] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)]">Help</p>
        <h1 className="mt-2 text-4xl text-[var(--color-paper)]" style={{ fontFamily: "var(--font-display)" }}>
          Support
        </h1>
        <p className="mt-3 text-sm text-[var(--color-paper)]/60">
          Answers to common questions about making and downloading your bounty poster.
        </p>

        <div className="mt-8 divide-y divide-white/10 rounded-lg border border-white/10 bg-[var(--color-board-light)]/70">
          {faqs.map((item) => (
            <div key={item.q} className="p-5 sm:p-6">
              <h2 className="mb-2 font-sans text-base font-bold text-[var(--color-paper)]">{item.q}</h2>
              <div className="text-sm leading-relaxed text-[var(--color-paper)]/75">{item.a}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-white/10 bg-[var(--color-board-light)]/70 p-5 sm:p-6">
          <h2 className="mb-2 font-sans text-base font-bold text-[var(--color-paper)]">Contact</h2>
          <p className="text-sm leading-relaxed text-[var(--color-paper)]/75">
            Still stuck? Reach out at{" "}
            <a href="mailto:support@wantedmaker.example" className="text-[var(--color-gold-light)] underline underline-offset-2">
              support@wantedmaker.example
            </a>{" "}
            and we&rsquo;ll get back to you.
          </p>
        </div>
      </div>
    </div>
  );
}
