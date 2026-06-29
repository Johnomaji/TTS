"use client";

import { PROVIDERS, type Provider } from "@/lib/voices";

interface ProviderSelectorProps {
  selected: Provider;
  onSelect: (provider: Provider) => void;
  disabled?: boolean;
}

export default function ProviderSelector({ selected, onSelect, disabled }: ProviderSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {PROVIDERS.map((p) => {
        const isSelected = selected === p.id;
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            disabled={disabled}
            className={`flex flex-col items-center gap-1 rounded-xl border px-3 py-3 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:opacity-40 disabled:cursor-not-allowed ${
              isSelected
                ? "border-violet-500 bg-violet-950/50 shadow-[0_0_0_1px_theme(colors.violet.500)]"
                : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-violet-600/60 hover:bg-zinc-800"
            }`}
          >
            <span className="text-2xl leading-none">{p.badge}</span>
            <span className={`text-sm font-semibold ${isSelected ? "text-violet-200" : "text-zinc-200"}`}>
              {p.label}
            </span>
            <span className={`text-[10px] leading-tight text-center ${isSelected ? "text-violet-400" : "text-zinc-500"}`}>
              {p.tagline}
            </span>
          </button>
        );
      })}
    </div>
  );
}
