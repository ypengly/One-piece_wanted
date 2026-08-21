import { useEffect, useRef, useState } from "react";

interface Props {
  onCapture: (dataUrl: string) => void;
  onClose: () => void;
}

type FacingMode = "user" | "environment";

export default function CameraModal({ onCapture, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facing, setFacing] = useState<FacingMode>("environment");
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [captured, setCaptured] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function start() {
      setError(null);
      setReady(false);
      stopStream();

      if (!navigator.mediaDevices?.getUserMedia) {
        setError("Camera access isn't supported in this browser.");
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: facing }, width: { ideal: 1600 }, height: { ideal: 1600 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => undefined);
        }
        setReady(true);
      } catch (err: unknown) {
        if (cancelled) return;
        const name = err instanceof DOMException ? err.name : "";
        if (name === "NotAllowedError" || name === "PermissionDeniedError") {
          setError("Camera permission was denied. Please allow camera access in your browser settings and try again.");
        } else if (name === "NotFoundError" || name === "DevicesNotFoundError") {
          setError("No camera was found on this device.");
        } else if (name === "NotReadableError") {
          setError("Your camera is already in use by another application.");
        } else {
          setError("Couldn't access the camera. Your browser may require HTTPS for camera access.");
        }
      }
    }

    if (!captured) start();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facing, captured]);

  useEffect(() => stopStream, []);

  function stopStream() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }

  function handleCapture() {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (facing === "user") {
      // Mirror the preview back so a selfie doesn't look flipped compared to what the user saw.
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
    setCaptured(dataUrl);
    stopStream();
  }

  function handleRetake() {
    setCaptured(null);
  }

  function handleUse() {
    if (captured) onCapture(captured);
    stopStream();
  }

  function handleClose() {
    stopStream();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" role="dialog" aria-modal="true" aria-label="Camera">
      <div className="w-full max-w-lg overflow-hidden rounded-lg border border-white/10 bg-[var(--color-board-light)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <h2 className="font-sans text-sm font-semibold text-[var(--color-paper)]">Take a Photo</h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close camera"
            className="rounded-full p-1.5 text-[var(--color-paper)]/70 transition hover:bg-white/10 hover:text-[var(--color-paper)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="relative flex aspect-square items-center justify-center bg-black">
          {error ? (
            <div className="p-6 text-center text-sm text-[var(--color-paper)]/80">
              <p>{error}</p>
            </div>
          ) : captured ? (
            <img src={captured} alt="Captured preview" className="h-full w-full object-cover" />
          ) : (
            <video
              ref={videoRef}
              playsInline
              muted
              autoPlay
              className="h-full w-full object-cover"
              style={{ transform: facing === "user" ? "scaleX(-1)" : "none" }}
            />
          )}
          {!ready && !error && !captured && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm text-[var(--color-paper)]/80">
              Starting camera&hellip;
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 p-4">
          {error ? (
            <button
              type="button"
              onClick={handleClose}
              className="min-h-[48px] flex-1 rounded-md bg-white/10 px-4 text-sm font-semibold text-[var(--color-paper)] transition hover:bg-white/15"
            >
              Cancel
            </button>
          ) : captured ? (
            <>
              <button
                type="button"
                onClick={handleRetake}
                className="min-h-[48px] flex-1 rounded-md bg-white/10 px-4 text-sm font-semibold text-[var(--color-paper)] transition hover:bg-white/15"
              >
                Retake
              </button>
              <button
                type="button"
                onClick={handleUse}
                className="min-h-[48px] flex-1 rounded-md bg-[var(--color-blood)] px-4 text-sm font-semibold text-[var(--color-paper)] transition hover:bg-[var(--color-blood-dark)]"
              >
                Use Photo
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleClose}
                className="min-h-[48px] rounded-md bg-white/10 px-4 text-sm font-semibold text-[var(--color-paper)] transition hover:bg-white/15"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setFacing((f) => (f === "user" ? "environment" : "user"))}
                disabled={!ready}
                aria-label="Switch camera"
                className="min-h-[48px] rounded-md bg-white/10 px-4 text-sm font-semibold text-[var(--color-paper)] transition hover:bg-white/15 disabled:opacity-40"
              >
                Switch
              </button>
              <button
                type="button"
                onClick={handleCapture}
                disabled={!ready}
                className="min-h-[48px] flex-1 rounded-md bg-[var(--color-blood)] px-4 text-sm font-semibold text-[var(--color-paper)] transition hover:bg-[var(--color-blood-dark)] disabled:opacity-40"
              >
                Capture
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
