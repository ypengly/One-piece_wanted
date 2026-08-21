interface Props {
  value: string;
  onChange: (value: string) => void;
}

const MAX_LENGTH = 40;

export default function NameInput({ value, onChange }: Props) {
  return (
    <div>
      <label htmlFor="character-name" className="mb-2 block font-sans text-sm font-semibold tracking-wide text-[var(--color-gold-light)]">
        Character Name
      </label>
      <input
        id="character-name"
        type="text"
        value={value}
        maxLength={MAX_LENGTH}
        onChange={(e) => onChange(e.target.value.slice(0, MAX_LENGTH))}
        placeholder="Enter the wanted person's name"
        className="w-full rounded-md border border-white/10 bg-black/25 px-4 py-3 text-base text-[var(--color-paper)] placeholder:text-[var(--color-paper)]/35 outline-none transition focus:border-[var(--color-gold-light)] focus:bg-black/35"
        autoComplete="off"
      />
      <p className="mt-1.5 text-xs text-[var(--color-paper)]/45">e.g. Monkey D. Luffy &middot; {value.length}/{MAX_LENGTH}</p>
    </div>
  );
}
