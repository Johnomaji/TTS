"use client";

interface SpeedSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const MARKS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export default function SpeedSlider({ value, onChange, disabled }: SpeedSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <span className="text-base" title="Slower">🐢</span>
        <input
          type="range"
          min={0.5}
          max={2}
          step={0.05}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          disabled={disabled}
          className="flex-1 h-1.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <span className="text-base" title="Faster">🐇</span>
        <span className="text-sm font-mono font-bold text-violet-400 w-12 text-right tabular-nums">
          {value.toFixed(2)}x
        </span>
      </div>

      <div className="flex justify-between px-5">
        {MARKS.map((mark) => (
          <button
            key={mark}
            onClick={() => !disabled && onChange(mark)}
            disabled={disabled}
            className={`text-[10px] tabular-nums transition-colors disabled:cursor-not-allowed ${
              Math.abs(value - mark) < 0.02
                ? "text-violet-400 font-bold"
                : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            {mark}x
          </button>
        ))}
      </div>
    </div>
  );
}
