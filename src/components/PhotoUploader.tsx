import { useRef } from "react";

interface Props {
  onFileSelected: (file: File) => void;
  onOpenCamera: () => void;
  hasPhoto: boolean;
}

export default function PhotoUploader({ onFileSelected, onOpenCamera, hasPhoto }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <span className="mb-2 block font-sans text-sm font-semibold tracking-wide text-[var(--color-gold-light)]">Photo</span>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex min-h-[52px] items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-3 text-sm font-semibold text-[var(--color-paper)] transition hover:bg-white/10 active:scale-[0.98]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          {hasPhoto ? "Replace Photo" : "Upload Photo"}
        </button>
        <button
          type="button"
          onClick={onOpenCamera}
          className="flex min-h-[52px] items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-3 text-sm font-semibold text-[var(--color-paper)] transition hover:bg-white/10 active:scale-[0.98]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          Open Camera
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelected(file);
          e.target.value = "";
        }}
      />
      <p className="mt-2 text-xs text-[var(--color-paper)]/45">Your photo stays on your device. We don&rsquo;t upload or store your images.</p>
    </div>
  );
}
