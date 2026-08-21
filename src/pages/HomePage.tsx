import { useCallback, useState } from "react";
import PosterEditor from "../components/PosterEditor";
import PosterPreview from "../components/PosterPreview";
import CameraModal from "../components/CameraModal";
import ExportButtons from "../components/ExportButtons";
import Toast, { type ToastMessage } from "../components/Toast";
import { DEFAULT_POSTER, type ImageTransform, type PosterData } from "../lib/types";
import { loadImageFromDataUrl, loadImageFromFile } from "../lib/image";

let toastId = 0;

export default function HomePage() {
  const [data, setData] = useState<PosterData>(DEFAULT_POSTER);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const pushToast = useCallback((text: string, tone: ToastMessage["tone"]) => {
    const id = ++toastId;
    setToasts((t) => [...t, { id, text, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const setImage = useCallback((img: HTMLImageElement) => {
    setData((d) => ({
      ...d,
      image: img,
      transform: { ...d.transform, zoom: 1, offsetX: 0, offsetY: 0, rotation: 0 },
    }));
  }, []);

  async function handleFileSelected(file: File) {
    try {
      const img = await loadImageFromFile(file);
      setImage(img);
    } catch (err) {
      pushToast(err instanceof Error ? err.message : "Couldn't load that photo.", "error");
    }
  }

  async function handleCameraCapture(dataUrl: string) {
    setCameraOpen(false);
    try {
      const img = await loadImageFromDataUrl(dataUrl);
      setImage(img);
    } catch (err) {
      pushToast(err instanceof Error ? err.message : "Couldn't use that photo.", "error");
    }
  }

  function handleTransformChange(transform: ImageTransform) {
    setData((d) => ({ ...d, transform }));
  }

  return (
    <div className="board-texture min-h-[calc(100vh-56px)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)]">Create Your Own Bounty Poster</p>
          <h1
            className="mt-2 text-4xl text-[var(--color-paper)] sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Wanted Maker
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[var(--color-paper)]/60">
            Enter a name and bounty, add a photo, and download a print-ready poster &mdash; entirely in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[420px_1fr] lg:items-start lg:gap-10">
          <div className="rounded-lg border border-white/10 bg-[var(--color-board-light)]/70 p-5 sm:p-6 lg:col-start-1 lg:row-start-1">
            <PosterEditor
              data={data}
              onNameChange={(name) => setData((d) => ({ ...d, name }))}
              onBountyChange={(bounty) => setData((d) => ({ ...d, bounty }))}
              onFileSelected={handleFileSelected}
              onOpenCamera={() => setCameraOpen(true)}
              onTransformChange={handleTransformChange}
            />
          </div>

          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-20">
            <PosterPreview data={data} />
          </div>

          <div className="rounded-lg border border-white/10 bg-[var(--color-board-light)]/70 p-5 sm:p-6 lg:col-start-1 lg:row-start-2">
            <p className="mb-1 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">Step 3</p>
            <h2 className="mb-4 font-sans text-lg font-bold text-[var(--color-paper)]">Download your poster</h2>
            <ExportButtons data={data} onSuccess={(m) => pushToast(m, "success")} onError={(m) => pushToast(m, "error")} />
          </div>
        </div>
      </div>

      {cameraOpen && <CameraModal onCapture={handleCameraCapture} onClose={() => setCameraOpen(false)} />}
      <Toast toasts={toasts} />
    </div>
  );
}
