const FONT_SPECS = [
  '400 100px "Rye"',
  '700 40px "Cinzel"',
  '600 40px "Cinzel"',
  '800 40px "Cinzel"',
  '700 40px "Special Elite"',
  '400 40px "Special Elite"',
  'italic 40px "Special Elite"',
  '600 40px "Inter"',
  '700 40px "Inter"',
];

let loaded: Promise<void> | null = null;

/** Forces the poster's webfonts to actually download before we draw with them on <canvas>. */
export function ensureFontsLoaded(): Promise<void> {
  if (loaded) return loaded;
  if (typeof document === "undefined" || !("fonts" in document)) {
    loaded = Promise.resolve();
    return loaded;
  }
  loaded = Promise.all(FONT_SPECS.map((spec) => document.fonts.load(spec).catch(() => undefined)))
    .then(() => document.fonts.ready)
    .then(() => undefined)
    .catch(() => undefined);
  return loaded;
}
