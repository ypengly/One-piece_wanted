import type { PosterData } from "./types";
import { drawSpacedText, fitSpacedFontSize } from "./canvasText";
import { formatBounty } from "./format";

/** Design space the poster is authored in. Actual canvases are scaled to/from this. */
export const DESIGN_W = 1000;
export const DESIGN_H = 1414; // A4 ratio, 210:297

let noisePattern: CanvasPattern | null = null;
let noiseSourceCtx: CanvasRenderingContext2D | null = null;

function getNoisePattern(ctx: CanvasRenderingContext2D): CanvasPattern | null {
  if (noisePattern && noiseSourceCtx === ctx) return noisePattern;
  const size = 220;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const nctx = c.getContext("2d");
  if (!nctx) return null;
  const imgData = nctx.createImageData(size, size);
  for (let i = 0; i < imgData.data.length; i += 4) {
    const base = 150 + Math.random() * 90;
    const a = Math.random() * 55;
    imgData.data[i] = base;
    imgData.data[i + 1] = base - 14;
    imgData.data[i + 2] = base - 32;
    imgData.data[i + 3] = a;
  }
  nctx.putImageData(imgData, 0, 0);
  noisePattern = ctx.createPattern(c, "repeat");
  noiseSourceCtx = ctx;
  return noisePattern;
}

// Fixed (non-random-per-render) "age spots" so the poster doesn't visually jitter on every keystroke.
const AGE_SPOTS: Array<{ x: number; y: number; r: number; o: number }> = [
  { x: 90, y: 120, r: 220, o: 0.05 },
  { x: 930, y: 1300, r: 260, o: 0.06 },
  { x: 940, y: 160, r: 160, o: 0.04 },
  { x: 60, y: 1280, r: 190, o: 0.05 },
  { x: 500, y: 700, r: 520, o: 0.02 },
];

function drawPaperBase(ctx: CanvasRenderingContext2D) {
  // Base parchment gradient
  const g = ctx.createLinearGradient(0, 0, DESIGN_W, DESIGN_H);
  g.addColorStop(0, "#f1e2b8");
  g.addColorStop(0.5, "#e9d4a0");
  g.addColorStop(1, "#ddc286");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, DESIGN_W, DESIGN_H);

  // Age spots
  for (const spot of AGE_SPOTS) {
    const rg = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, spot.r);
    rg.addColorStop(0, `rgba(90,60,20,${spot.o})`);
    rg.addColorStop(1, "rgba(90,60,20,0)");
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, DESIGN_W, DESIGN_H);
  }

  // Grain
  const pattern = getNoisePattern(ctx);
  if (pattern) {
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, DESIGN_W, DESIGN_H);
    ctx.restore();
  }

  // Vignette
  const vg = ctx.createRadialGradient(
    DESIGN_W / 2,
    DESIGN_H / 2,
    DESIGN_H * 0.35,
    DESIGN_W / 2,
    DESIGN_H / 2,
    DESIGN_H * 0.78,
  );
  vg.addColorStop(0, "rgba(40,25,10,0)");
  vg.addColorStop(1, "rgba(30,18,8,0.35)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, DESIGN_W, DESIGN_H);
}

function drawOrnamentalFrame(ctx: CanvasRenderingContext2D) {
  const inset = 46;
  const x = inset,
    y = inset,
    w = DESIGN_W - inset * 2,
    h = DESIGN_H - inset * 2;

  ctx.save();
  ctx.strokeStyle = "#4a3420";
  ctx.lineWidth = 5;
  ctx.strokeRect(x, y, w, h);

  ctx.strokeStyle = "#a97c34";
  ctx.lineWidth = 1.6;
  ctx.strokeRect(x + 10, y + 10, w - 20, h - 20);

  // Corner flourishes
  const corners: Array<[number, number, number]> = [
    [x, y, 0],
    [x + w, y, 90],
    [x + w, y + h, 180],
    [x, y + h, 270],
  ];
  for (const [cx, cy, rot] of corners) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.strokeStyle = "#4a3420";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 26);
    ctx.lineTo(0, 6);
    ctx.lineTo(26, 6);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(6, 6, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = "#a97c34";
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

function drawDivider(ctx: CanvasRenderingContext2D, cy: number, halfWidth: number) {
  ctx.save();
  ctx.strokeStyle = "#8a6a3a";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(DESIGN_W / 2 - halfWidth, cy);
  ctx.lineTo(DESIGN_W / 2 - 14, cy);
  ctx.moveTo(DESIGN_W / 2 + 14, cy);
  ctx.lineTo(DESIGN_W / 2 + halfWidth, cy);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(DESIGN_W / 2, cy - 8);
  ctx.lineTo(DESIGN_W / 2 + 8, cy);
  ctx.lineTo(DESIGN_W / 2, cy + 8);
  ctx.lineTo(DESIGN_W / 2 - 8, cy);
  ctx.closePath();
  ctx.fillStyle = "#8a6a3a";
  ctx.fill();
  ctx.restore();
}

function drawPhotoFrame(ctx: CanvasRenderingContext2D, data: PosterData) {
  const frame = { x: 150, y: 372, w: 700, h: 560 };

  // Shadow under the photo
  ctx.save();
  ctx.shadowColor = "rgba(20,12,4,0.35)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = "#1c1108";
  ctx.fillRect(frame.x, frame.y, frame.w, frame.h);
  ctx.restore();

  if (data.image) {
    drawPhoto(ctx, data.image, frame, data.transform);
  } else {
    drawPhotoPlaceholder(ctx, frame);
  }

  // Frame border
  ctx.save();
  ctx.strokeStyle = "#2a1b0e";
  ctx.lineWidth = 8;
  ctx.strokeRect(frame.x, frame.y, frame.w, frame.h);
  ctx.strokeStyle = "#a97c34";
  ctx.lineWidth = 2;
  ctx.strokeRect(frame.x + 7, frame.y + 7, frame.w - 14, frame.h - 14);
  ctx.restore();

  // Tape corners
  const tape = (cx: number, cy: number, rot: number) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.fillStyle = "rgba(230,214,178,0.55)";
    ctx.fillRect(-38, -13, 76, 26);
    ctx.strokeStyle = "rgba(120,95,55,0.4)";
    ctx.lineWidth = 1;
    ctx.strokeRect(-38, -13, 76, 26);
    ctx.restore();
  };
  tape(frame.x + 4, frame.y + 4, -8);
  tape(frame.x + frame.w - 4, frame.y + 4, 7);
  tape(frame.x + 4, frame.y + frame.h - 4, 6);
  tape(frame.x + frame.w - 4, frame.y + frame.h - 4, -7);
}

function drawPhoto(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  frame: { x: number; y: number; w: number; h: number },
  transform: PosterData["transform"],
) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(frame.x, frame.y, frame.w, frame.h);
  ctx.clip();

  const imgRatio = img.width / img.height;
  const frameRatio = frame.w / frame.h;
  let baseW: number, baseH: number;
  if (imgRatio > frameRatio) {
    baseH = frame.h;
    baseW = baseH * imgRatio;
  } else {
    baseW = frame.w;
    baseH = baseW / imgRatio;
  }
  const zoom = Math.max(0.5, transform.zoom || 1);
  const w = baseW * zoom;
  const h = baseH * zoom;
  const cx = frame.x + frame.w / 2 + (transform.offsetX || 0) * frame.w * 0.5 * zoom;
  const cy = frame.y + frame.h / 2 + (transform.offsetY || 0) * frame.h * 0.5 * zoom;

  ctx.translate(cx, cy);
  ctx.rotate(((transform.rotation || 0) * Math.PI) / 180);

  const filters: string[] = [];
  if (transform.grayscale) filters.push("grayscale(1)");
  if (transform.sepia) filters.push("sepia(0.4)");
  filters.push(`brightness(${100 + (transform.brightness || 0)}%)`);
  filters.push(`contrast(${100 + (transform.contrast || 0)}%)`);
  ctx.filter = filters.join(" ");

  ctx.drawImage(img, -w / 2, -h / 2, w, h);

  // Subtle vintage tone-over
  ctx.filter = "none";
  ctx.fillStyle = "rgba(60,38,14,0.08)";
  ctx.fillRect(frame.x, frame.y, frame.w, frame.h);

  ctx.restore();
}

function drawPhotoPlaceholder(ctx: CanvasRenderingContext2D, frame: { x: number; y: number; w: number; h: number }) {
  ctx.save();
  ctx.fillStyle = "#d9c599";
  ctx.fillRect(frame.x, frame.y, frame.w, frame.h);

  ctx.strokeStyle = "#8a6a3a";
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 8]);
  ctx.strokeRect(frame.x + 20, frame.y + 20, frame.w - 40, frame.h - 40);
  ctx.setLineDash([]);

  const cx = frame.x + frame.w / 2;
  const cy = frame.y + frame.h / 2 - 20;

  ctx.fillStyle = "rgba(74,52,32,0.55)";
  ctx.beginPath();
  ctx.arc(cx, cy - 40, 62, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx - 110, cy + 150);
  ctx.quadraticCurveTo(cx - 100, cy + 20, cx, cy + 20);
  ctx.quadraticCurveTo(cx + 100, cy + 20, cx + 110, cy + 150);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#4a3420";
  ctx.textAlign = "center";
  ctx.font = '600 26px "Inter"';
  ctx.fillText("NO PHOTO YET", cx, frame.y + frame.h - 46);
  ctx.restore();
}

function drawBountyStamp(ctx: CanvasRenderingContext2D, bounty: number, cy: number) {
  const label = formatBounty(bounty);
  const w = 620;
  const h = 168;
  const x = DESIGN_W / 2 - w / 2;
  const y = cy - h / 2;

  ctx.save();
  ctx.translate(DESIGN_W / 2, cy);
  ctx.rotate((-1.6 * Math.PI) / 180);
  ctx.translate(-DESIGN_W / 2, -cy);

  // Distressed ribbon background
  ctx.fillStyle = "rgba(122,30,30,0.88)";
  ctx.fillRect(x, y, w, h);
  const pattern = getNoisePattern(ctx);
  if (pattern) {
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = pattern;
    ctx.fillRect(x, y, w, h);
    ctx.restore();
  }
  ctx.strokeStyle = "rgba(255,244,220,0.75)";
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 6, y + 6, w - 12, h - 12);

  ctx.textAlign = "center";
  ctx.fillStyle = "#f7ecd2";
  const amountFont = (s: number) => `700 ${s}px "Special Elite"`;
  const amountSize = fitSpacedFontSize(ctx, `${label}`, w - 60, amountFont, 0.02, 74, 30);
  ctx.font = amountFont(amountSize);
  drawSpacedText(ctx, label, DESIGN_W / 2, y + h * 0.62, amountSize * 0.02);

  ctx.font = '600 26px "Inter"';
  ctx.fillStyle = "rgba(247,236,210,0.92)";
  drawSpacedText(ctx, "B E R R I E S", DESIGN_W / 2, y + h - 18, 4);

  ctx.restore();
}

function drawAnchorEmblem(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(s, s);
  ctx.strokeStyle = "#4a3420";
  ctx.fillStyle = "#4a3420";
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.arc(0, -18, 7, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, -11);
  ctx.lineTo(0, 22);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-16, -2);
  ctx.lineTo(16, -2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-20, 6);
  ctx.quadraticCurveTo(-20, 26, 0, 26);
  ctx.quadraticCurveTo(20, 26, 20, 6);
  ctx.stroke();

  ctx.restore();
}

export interface RenderOptions {
  /** When true, skips the "empty state" placeholder copy and always renders exactly what's provided. */
  exact?: boolean;
}

/**
 * Renders the full wanted poster onto `canvas` using its current pixel dimensions.
 * The same function powers the live preview, PNG export, and PDF export so the
 * output always matches what the user saw.
 */
export function renderPoster(canvas: HTMLCanvasElement, data: PosterData, options: RenderOptions = {}): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const scale = canvas.width / DESIGN_W;

  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.scale(scale, scale);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  drawPaperBase(ctx);
  drawOrnamentalFrame(ctx);

  // Eyebrow
  ctx.fillStyle = "#5a4126";
  ctx.font = '600 22px "Inter"';
  drawSpacedText(ctx, "\u2726  BY ROYAL DECREE  \u2726", DESIGN_W / 2, 112, 5);

  // WANTED
  ctx.fillStyle = "#241505";
  const wantedFont = (s: number) => `400 ${s}px "Rye"`;
  const wantedSize = fitSpacedFontSize(ctx, "WANTED", 860, wantedFont, 0.05, 190, 90);
  ctx.font = wantedFont(wantedSize);
  ctx.save();
  ctx.shadowColor = "rgba(90,65,30,0.35)";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 5;
  drawSpacedText(ctx, "WANTED", DESIGN_W / 2, 250, wantedSize * 0.05);
  ctx.restore();

  // DEAD OR ALIVE
  ctx.fillStyle = "#7a1e1e";
  ctx.font = '700 34px "Cinzel"';
  drawSpacedText(ctx, "DEAD OR ALIVE", DESIGN_W / 2, 305, 10);

  drawDivider(ctx, 340, 220);

  // Photo
  drawPhotoFrame(ctx, data);

  drawDivider(ctx, 985, 220);

  // Name
  const rawName = data.name.trim();
  const nameText = rawName ? rawName.toUpperCase() : options.exact ? "" : "YOUR NAME";
  ctx.fillStyle = rawName ? "#241505" : "rgba(74,52,32,0.55)";
  const nameFont = (s: number) => `700 ${s}px "Cinzel"`;
  const nameSize = fitSpacedFontSize(ctx, nameText || " ", 820, nameFont, 0.045, 64, 30);
  ctx.font = nameFont(nameSize);
  drawSpacedText(ctx, nameText || " ", DESIGN_W / 2, 1060, nameSize * 0.045);

  ctx.fillStyle = "#7a5a34";
  ctx.font = 'italic 22px "Special Elite"';
  drawSpacedText(ctx, "WANTED FOR PIRACY ON THE HIGH SEAS", DESIGN_W / 2, 1095, 2);

  // Bounty stamp
  drawBountyStamp(ctx, data.bounty, 1220);

  // Bottom line
  ctx.fillStyle = "#5a4126";
  ctx.font = '600 18px "Inter"';
  drawSpacedText(ctx, "REWARD PAYABLE UPON DELIVERY TO ANY PORT AUTHORITY", DESIGN_W / 2, 1345, 2);

  drawAnchorEmblem(ctx, DESIGN_W - 95, DESIGN_H - 95, 1);

  ctx.restore();
}
