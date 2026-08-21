import { DEFAULT_TRANSFORM, type ImageTransform } from "../lib/types";

interface Props {
  transform: ImageTransform;
  onChange: (transform: ImageTransform) => void;
  disabled: boolean;
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  disabled,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  disabled: boolean;
  format?: (v: number) => string;
}) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center justify-between text-xs font-medium text-[var(--color-paper)]/70">
        <span>{label}</span>
        <span className="tabular-nums text-[var(--color-paper)]/50">{format ? format(value) : value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-[var(--color-gold)] disabled:opacity-30"
      />
    </label>
  );
}

export default function PhotoEditor({ transform, onChange, disabled }: Props) {
  const set = (patch: Partial<ImageTransform>) => onChange({ ...transform, ...patch });

  return (
    <div className={disabled ? "pointer-events-none opacity-40" : ""}>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-sans text-sm font-semibold tracking-wide text-[var(--color-gold-light)]">Adjust Photo</span>
        <button
          type="button"
          onClick={() => onChange({ ...DEFAULT_TRANSFORM })}
          disabled={disabled}
          className="text-xs font-semibold text-[var(--color-paper)]/60 underline decoration-dotted underline-offset-2 hover:text-[var(--color-paper)]"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-md border border-white/10 bg-black/20 p-4">
        <div className="col-span-2">
          <Slider label="Zoom" value={transform.zoom} min={1} max={3} step={0.01} onChange={(v) => set({ zoom: v })} disabled={disabled} format={(v) => `${v.toFixed(2)}x`} />
        </div>
        <Slider label="Move Horizontal" value={transform.offsetX} min={-1} max={1} step={0.01} onChange={(v) => set({ offsetX: v })} disabled={disabled} />
        <Slider label="Move Vertical" value={transform.offsetY} min={-1} max={1} step={0.01} onChange={(v) => set({ offsetY: v })} disabled={disabled} />
        <Slider label="Rotate" value={transform.rotation} min={-45} max={45} step={1} onChange={(v) => set({ rotation: v })} disabled={disabled} format={(v) => `${v}\u00b0`} />
        <Slider label="Brightness" value={transform.brightness} min={-50} max={50} step={1} onChange={(v) => set({ brightness: v })} disabled={disabled} />
        <Slider label="Contrast" value={transform.contrast} min={-50} max={50} step={1} onChange={(v) => set({ contrast: v })} disabled={disabled} />

        <div className="col-span-2 mt-1 flex gap-2">
          <button
            type="button"
            onClick={() => set({ sepia: !transform.sepia })}
            disabled={disabled}
            aria-pressed={transform.sepia}
            className={`flex-1 rounded-md border px-3 py-2 text-xs font-semibold transition ${
              transform.sepia ? "border-[var(--color-gold)] bg-[var(--color-gold)]/20 text-[var(--color-gold-light)]" : "border-white/10 bg-white/5 text-[var(--color-paper)]/70"
            }`}
          >
            Sepia
          </button>
          <button
            type="button"
            onClick={() => set({ grayscale: !transform.grayscale })}
            disabled={disabled}
            aria-pressed={transform.grayscale}
            className={`flex-1 rounded-md border px-3 py-2 text-xs font-semibold transition ${
              transform.grayscale ? "border-[var(--color-gold)] bg-[var(--color-gold)]/20 text-[var(--color-gold-light)]" : "border-white/10 bg-white/5 text-[var(--color-paper)]/70"
            }`}
          >
            Grayscale
          </button>
        </div>
      </div>
    </div>
  );
}
