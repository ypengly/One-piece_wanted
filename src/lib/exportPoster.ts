import { jsPDF } from "jspdf";
import type { PosterData } from "./types";
import { DESIGN_H, DESIGN_W, renderPoster } from "./renderPoster";
import { ensureFontsLoaded } from "./fonts";
import { posterFilename } from "./format";

export const EXPORT_W = 2480;
export const EXPORT_H = 3508;

export class PosterExportError extends Error {}

function createExportCanvas(data: PosterData): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = EXPORT_W;
  canvas.height = EXPORT_H;
  renderPoster(canvas, data, { exact: true });
  return canvas;
}

function triggerDownload(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export async function exportPosterAsPNG(data: PosterData): Promise<void> {
  try {
    await ensureFontsLoaded();
    const canvas = createExportCanvas(data);
    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/png", 1));
    if (!blob) throw new PosterExportError("Could not create the image file.");
    const url = URL.createObjectURL(blob);
    triggerDownload(url, posterFilename(data.name, "png"));
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  } catch (err) {
    if (err instanceof PosterExportError) throw err;
    throw new PosterExportError("Something went wrong generating the image. Please try again.");
  }
}

export async function exportPosterAsPDF(data: PosterData): Promise<void> {
  try {
    await ensureFontsLoaded();
    const canvas = createExportCanvas(data);
    const imgData = canvas.toDataURL("image/jpeg", 0.95);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });
    const pageW = 210;
    const pageH = 297;
    pdf.addImage(imgData, "JPEG", 0, 0, pageW, pageH, undefined, "FAST");
    pdf.save(posterFilename(data.name, "pdf"));
  } catch (err) {
    if (err instanceof PosterExportError) throw err;
    throw new PosterExportError("Something went wrong generating the PDF. Please try again.");
  }
}

export function assertCanvasSupport(): void {
  const testCanvas = document.createElement("canvas");
  if (!testCanvas.getContext || !testCanvas.getContext("2d")) {
    throw new PosterExportError("Your browser doesn't support the features needed to build the poster.");
  }
}

export { DESIGN_W, DESIGN_H };
