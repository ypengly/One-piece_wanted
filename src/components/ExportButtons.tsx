import { useState } from "react";
import type { PosterData } from "../lib/types";
import { exportPosterAsPDF, exportPosterAsPNG } from "../lib/exportPoster";

interface Props {
  data: PosterData;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

type Busy = "pdf" | "png" | null;

export default function ExportButtons({ data, onSuccess, onError }: Props) {
  const [busy, setBusy] = useState<Busy>(null);

  async function handlePdf() {
    if (busy) return;
    setBusy("pdf");
    try {
      await exportPosterAsPDF(data);
      onSuccess("Poster downloaded successfully!");
    } catch (err) {
      onError(err instanceof Error ? err.message : "Couldn't generate the PDF. Please try again.");
    } finally {
      setBusy(null);
    }
  }

  async function handlePng() {
    if (busy) return;
    setBusy("png");
    try {
      await exportPosterAsPNG(data);
      onSuccess("Poster downloaded successfully!");
    } catch (err) {
      onError(err instanceof Error ? err.message : "Couldn't generate the image. Please try again.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={handlePdf}
        disabled={busy !== null}
        className="flex min-h-[52px] items-center justify-center gap-2 rounded-md bg-[var(--color-blood)] px-4 text-sm font-bold tracking-wide text-[var(--color-paper)] transition hover:bg-[var(--color-blood-dark)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy === "pdf" ? <Spinner /> : <DocIcon />}
        {busy === "pdf" ? "Generating\u2026" : "Download PDF"}
      </button>
      <button
        type="button"
        onClick={handlePng}
        disabled={busy !== null}
        className="flex min-h-[52px] items-center justify-center gap-2 rounded-md border border-[var(--color-gold)] bg-transparent px-4 text-sm font-bold tracking-wide text-[var(--color-gold-light)] transition hover:bg-[var(--color-gold)]/10 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy === "png" ? <Spinner /> : <ImgIcon />}
        {busy === "png" ? "Generating\u2026" : "Download Image"}
      </button>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  );
}

function ImgIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}
