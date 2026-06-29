"use client";

export type AudioState = "idle" | "loading" | "playing" | "paused";

interface PlayerControlsProps {
  audioState: AudioState;
  canPlay: boolean;
  hasAudio: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onDownload: () => void;
}

function Spinner() {
  return (
    <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-20" />
      <path
        className="opacity-80"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg className="w-4 h-4 text-zinc-300" fill="currentColor" viewBox="0 0 24 24">
      <rect x="6" y="6" width="12" height="12" rx="1" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
}

function WaveformBars() {
  return (
    <div className="flex items-center gap-[3px] h-7" aria-hidden>
      {[0.1, 0.25, 0, 0.35, 0.15].map((delay, i) => (
        <div
          key={i}
          className="w-[3px] bg-violet-500 rounded-full animate-wave"
          style={{
            height: "100%",
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function PlayerControls({
  audioState,
  canPlay,
  hasAudio,
  onPlay,
  onPause,
  onStop,
  onDownload,
}: PlayerControlsProps) {
  const isLoading = audioState === "loading";
  const isPlaying = audioState === "playing";
  const isStopped = audioState === "idle";

  return (
    <div className="flex items-center gap-3">
      {/* Play / Pause */}
      <button
        onClick={isPlaying ? onPause : onPlay}
        disabled={!canPlay || isLoading}
        aria-label={isPlaying ? "Pause" : isLoading ? "Generating…" : "Play"}
        className={`relative flex items-center justify-center w-14 h-14 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed ${
          isPlaying
            ? "bg-violet-600 hover:bg-violet-500 shadow-[0_0_20px_theme(colors.violet.700)]"
            : "bg-violet-700 hover:bg-violet-600"
        }`}
      >
        {isLoading ? <Spinner /> : isPlaying ? <PauseIcon /> : <PlayIcon />}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full ring-2 ring-violet-400 animate-ping opacity-20 pointer-events-none" />
        )}
      </button>

      {/* Stop */}
      <button
        onClick={onStop}
        disabled={isStopped || isLoading}
        aria-label="Stop"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
      >
        <StopIcon />
      </button>

      {/* Waveform */}
      <div className={`transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-0"}`}>
        <WaveformBars />
      </div>

      {/* Status text */}
      <div className="flex-1 min-w-0">
        {isLoading && (
          <p className="text-sm text-violet-400 animate-pulse">Generating speech…</p>
        )}
        {isPlaying && (
          <p className="text-sm text-zinc-400">Playing</p>
        )}
        {audioState === "paused" && (
          <p className="text-sm text-zinc-500">Paused — press play to resume</p>
        )}
      </div>

      {/* Download */}
      <button
        onClick={onDownload}
        disabled={!hasAudio || isLoading}
        aria-label="Download MP3"
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed text-sm text-zinc-300 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 whitespace-nowrap"
      >
        <DownloadIcon />
        <span>Download</span>
      </button>
    </div>
  );
}
