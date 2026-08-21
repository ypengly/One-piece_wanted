import { formatBounty, sanitizeBountyInput } from "../lib/format";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const MAX_BOUNTY = 999_999_999_999;

export default function BountyInput({ value, onChange }: Props) {
  const display = value ? formatBounty(value) : "";

  return (
    <div>
      <label htmlFor="bounty" className="mb-2 block font-sans text-sm font-semibold tracking-wide text-[var(--color-gold-light)]">
        Bounty
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-paper)]/50">฿</span>
        <input
          id="bounty"
          type="text"
          inputMode="numeric"
          value={display}
          onChange={(e) => {
            const digits = sanitizeBountyInput(e.target.value);
            const num = digits ? Math.min(parseInt(digits, 10), MAX_BOUNTY) : 0;
            onChange(num);
          }}
          placeholder="Enter bounty amount"
          className="w-full rounded-md border border-white/10 bg-black/25 py-3 pl-9 pr-16 text-base text-[var(--color-paper)] placeholder:text-[var(--color-paper)]/35 outline-none transition focus:border-[var(--color-gold-light)] focus:bg-black/35"
          autoComplete="off"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[var(--color-paper)]/50">
          BERRIES
        </span>
      </div>
      <p className="mt-1.5 text-xs text-[var(--color-paper)]/45">e.g. 3,000,000,000</p>
    </div>
  );
}
