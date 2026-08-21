import { useEffect, useRef } from "react";
import type { PosterData } from "../lib/types";
import { DESIGN_H, DESIGN_W, renderPoster } from "../lib/renderPoster";
import { ensureFontsLoaded } from "../lib/fonts";

interface Props {
  data: PosterData;
  className?: string;
}

export default function PosterPreview({ data, className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let cancelled = false;

    const draw = () => {
      if (cancelled) return;
      const w = wrap.clientWidth;
      if (!w) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.round(w * dpr);
      const targetH = Math.round(targetW * (DESIGN_H / DESIGN_W));
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
      renderPoster(canvas, data);
    };

    draw();
    ensureFontsLoaded().then(draw);

    const ro = new ResizeObserver(draw);
    ro.observe(wrap);
    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [data]);

  return (
    <div
      ref={wrapRef}
      className={`relative w-full overflow-hidden rounded-sm shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] ${className}`}
      style={{ aspectRatio: `${DESIGN_W} / ${DESIGN_H}` }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" aria-label="Wanted poster preview" role="img" />
    </div>
  );
}
