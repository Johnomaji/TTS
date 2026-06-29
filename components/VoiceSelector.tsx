"use client";

import { VOICE_GROUPS, type Provider, type Voice } from "@/lib/voices";

interface VoiceSelectorProps {
  provider: Provider;
  selected: string;
  onSelect: (voice: string) => void;
  disabled?: boolean;
}

function PollyCard({ voice, selected, onSelect, disabled, groupFlag }: {
  voice: Voice;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  groupFlag?: string;
}) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`flex flex-col items-center gap-0.5 rounded-lg border px-2 py-2 text-xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:opacity-40 disabled:cursor-not-allowed ${
        selected
          ? "border-violet-500 bg-violet-950/50 text-violet-200 shadow-[0_0_0_1px_theme(colors.violet.500)]"
          : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-violet-600/60 hover:bg-zinc-800"
      }`}
    >
      <span className="font-semibold truncate w-full text-center">
        {voice.label ?? voice.id}
      </span>
      {voice.gender && (
        <span className={`text-[9px] ${selected ? "text-violet-400" : "text-zinc-600"}`}>
          {voice.gender === 'F' ? '♀' : '♂'}
        </span>
      )}
    </button>
  );
}

function TraitCard({ voice, selected, onSelect, disabled }: {
  voice: Voice;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`flex flex-col items-start gap-1 rounded-xl border px-3 py-3 text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:opacity-40 disabled:cursor-not-allowed ${
        selected
          ? "border-violet-500 bg-violet-950/50 shadow-[0_0_0_1px_theme(colors.violet.500)]"
          : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-violet-600/60 hover:bg-zinc-800"
      }`}
    >
      <div className="flex items-center gap-1.5 w-full">
        <span className={`font-semibold capitalize ${selected ? "text-violet-200" : "text-zinc-100"}`}>
          {voice.id}
        </span>
        {voice.gender && (
          <span className={`text-xs ml-auto ${selected ? "text-violet-400" : "text-zinc-600"}`}>
            {voice.gender === 'F' ? '♀' : '♂'}
          </span>
        )}
      </div>
      {voice.trait && (
        <span className={`text-[11px] leading-tight ${selected ? "text-violet-400" : "text-zinc-500"}`}>
          {voice.trait}
        </span>
      )}
    </button>
  );
}

function GeminiCard({ voice, selected, onSelect, disabled }: {
  voice: Voice;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`flex flex-col items-center gap-0.5 rounded-lg border px-2 py-2 text-xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:opacity-40 disabled:cursor-not-allowed ${
        selected
          ? "border-violet-500 bg-violet-950/50 text-violet-200 shadow-[0_0_0_1px_theme(colors.violet.500)]"
          : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-violet-600/60 hover:bg-zinc-800"
      }`}
    >
      <span className="font-semibold truncate w-full text-center text-[11px]">{voice.id}</span>
      {voice.trait && (
        <span className={`text-[9px] ${selected ? "text-violet-400" : "text-zinc-600"}`}>
          {voice.trait}
        </span>
      )}
    </button>
  );
}

export default function VoiceSelector({ provider, selected, onSelect, disabled }: VoiceSelectorProps) {
  const groups = VOICE_GROUPS[provider];

  if (provider === 'aws-polly') {
    return (
      <div className="space-y-4 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
        {groups.map((group) => (
          <div key={group.label}>
            <div className="flex items-center gap-2 mb-2">
              {group.flag && <span className="text-base leading-none">{group.flag}</span>}
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                {group.label}
              </span>
              <div className="flex-1 h-px bg-zinc-800" />
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {group.voices.map((voice) => (
                <PollyCard
                  key={voice.id}
                  voice={voice}
                  selected={selected === voice.id}
                  onSelect={() => onSelect(voice.id)}
                  disabled={disabled}
                  groupFlag={group.flag}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (provider === 'gemini') {
    return (
      <div className="max-h-64 overflow-y-auto pr-1">
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
          {groups[0].voices.map((voice) => (
            <GeminiCard
              key={voice.id}
              voice={voice}
              selected={selected === voice.id}
              onSelect={() => onSelect(voice.id)}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    );
  }

  // openai / xai — trait cards
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {groups[0].voices.map((voice) => (
        <TraitCard
          key={voice.id}
          voice={voice}
          selected={selected === voice.id}
          onSelect={() => onSelect(voice.id)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
