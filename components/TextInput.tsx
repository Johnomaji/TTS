"use client";

const MAX_CHARS = 3000;

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function TextInput({ value, onChange, disabled }: TextInputProps) {
  const remaining = MAX_CHARS - value.length;
  const nearLimit = remaining < 200;

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, MAX_CHARS))}
        disabled={disabled}
        placeholder="Enter text to convert to speech…"
        rows={6}
        className="w-full resize-none rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 pb-8 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all leading-relaxed"
      />
      <div
        className={`absolute bottom-3 right-3 text-xs tabular-nums transition-colors ${
          nearLimit ? "text-amber-400" : "text-zinc-600"
        }`}
      >
        {value.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
      </div>
    </div>
  );
}
