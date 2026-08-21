export interface ToastMessage {
  id: number;
  text: string;
  tone: "success" | "error";
}

export default function Toast({ toasts }: { toasts: ToastMessage[] }) {
  if (!toasts.length) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4 sm:bottom-6">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`pointer-events-auto max-w-md rounded-md border px-4 py-2.5 text-sm font-medium shadow-lg backdrop-blur-sm animate-[fadeUp_0.25s_ease-out] ${
            t.tone === "success"
              ? "border-emerald-700/40 bg-emerald-900/90 text-emerald-100"
              : "border-red-800/40 bg-red-950/90 text-red-100"
          }`}
        >
          {t.text}
        </div>
      ))}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
