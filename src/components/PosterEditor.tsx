import type { ImageTransform, PosterData } from "../lib/types";
import NameInput from "./NameInput";
import BountyInput from "./BountyInput";
import PhotoUploader from "./PhotoUploader";
import PhotoEditor from "./PhotoEditor";

interface Props {
  data: PosterData;
  onNameChange: (v: string) => void;
  onBountyChange: (v: number) => void;
  onFileSelected: (file: File) => void;
  onOpenCamera: () => void;
  onTransformChange: (t: ImageTransform) => void;
}

export default function PosterEditor({
  data,
  onNameChange,
  onBountyChange,
  onFileSelected,
  onOpenCamera,
  onTransformChange,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-1 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">Step 1</p>
        <h2 className="font-sans text-lg font-bold text-[var(--color-paper)]">Fill in the details</h2>
      </div>

      <NameInput value={data.name} onChange={onNameChange} />
      <BountyInput value={data.bounty} onChange={onBountyChange} />

      <div className="h-px bg-white/10" />

      <div>
        <p className="mb-1 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">Step 2</p>
        <h2 className="font-sans text-lg font-bold text-[var(--color-paper)]">Add a photo</h2>
      </div>

      <PhotoUploader onFileSelected={onFileSelected} onOpenCamera={onOpenCamera} hasPhoto={!!data.image} />
      <PhotoEditor transform={data.transform} onChange={onTransformChange} disabled={!data.image} />
    </div>
  );
}
