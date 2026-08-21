/** Measure the width of text drawn with manual letter-spacing. */
export function measureSpacedWidth(ctx: CanvasRenderingContext2D, text: string, spacing: number): number {
  let w = 0;
  for (const ch of text) {
    w += ctx.measureText(ch).width + spacing;
  }
  return Math.max(0, w - spacing);
}

/** Draw text centered on cx with manual letter spacing (canvas has no native letter-spacing support cross-browser). */
export function drawSpacedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  y: number,
  spacing: number,
): number {
  const total = measureSpacedWidth(ctx, text, spacing);
  let x = cx - total / 2;
  ctx.save();
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  for (const ch of text) {
    ctx.fillText(ch, x, y);
    x += ctx.measureText(ch).width + spacing;
  }
  ctx.restore();
  return total;
}

/**
 * Find the largest font size (between minSize and startSize) for which the given
 * spaced text fits within maxWidth. `fontFor(size)` should return a canvas font string.
 */
export function fitSpacedFontSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  fontFor: (size: number) => string,
  spacingRatio: number,
  startSize: number,
  minSize: number,
): number {
  let size = startSize;
  for (; size > minSize; size -= 2) {
    ctx.font = fontFor(size);
    const spacing = size * spacingRatio;
    const w = measureSpacedWidth(ctx, text, spacing);
    if (w <= maxWidth) return size;
  }
  return minSize;
}
