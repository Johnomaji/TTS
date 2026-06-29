"use client";

import { useRef, useState } from "react";
import TextInput from "@/components/TextInput";
import ProviderSelector from "@/components/ProviderSelector";
import VoiceSelector from "@/components/VoiceSelector";
import SpeedSlider from "@/components/SpeedSlider";
import PlayerControls, { type AudioState } from "@/components/PlayerControls";
import { PROVIDERS, type Provider } from "@/lib/voices";

export default function TTSPage() {
  const [text, setText] = useState("");
  const [provider, setProvider] = useState<Provider>("aws-polly");
  const [selectedVoice, setSelectedVoice] = useState("Joanna");
  const [speed, setSpeed] = useState(1);
  const [audioState, setAudioState] = useState<AudioState>("idle");
  const [hasAudio, setHasAudio] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopAndClearAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.onended = null;
    }
    audioRef.current = null;
    setAudioState("idle");
    setHasAudio(false);
  };

  const handleProviderChange = (p: Provider) => {
    stopAndClearAudio();
    setProvider(p);
    const meta = PROVIDERS.find((x) => x.id === p);
    if (meta) setSelectedVoice(meta.defaultVoice);
  };

  const handleVoiceChange = (voice: string) => {
    stopAndClearAudio();
    setSelectedVoice(voice);
  };

  const handlePlay = async () => {
    if (!text.trim()) return;

    if (audioState === "paused" && audioRef.current) {
      audioRef.current.play();
      setAudioState("playing");
      return;
    }

    try {
      setAudioState("loading");
      setError(null);

      const audio = await window.puter.ai.txt2speech(text, {
        provider,
        voice: selectedVoice,
      });

      audio.playbackRate = speed;
      audio.onended = () => setAudioState("idle");
      audioRef.current = audio;
      setHasAudio(true);

      await audio.play();
      setAudioState("playing");
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Failed to generate speech. Please try again."
      );
      setAudioState("idle");
    }
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setAudioState("paused");
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setAudioState("idle");
  };

  const handleDownload = () => {
    const audio = audioRef.current;
    if (!audio?.src) return;
    const a = document.createElement("a");
    a.href = audio.src;
    a.download = `speech-${provider}-${selectedVoice.toLowerCase()}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (audioRef.current) audioRef.current.playbackRate = newSpeed;
  };

  const isLoading = audioState === "loading";

  return (
    <main className="min-h-screen flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-2xl space-y-8">

        {/* Header */}
        <header className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-900/40 border border-violet-800/50 mb-4">
            <svg
              className="w-7 h-7 text-violet-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Text to Speech
          </h1>
          <p className="text-zinc-400">
            Powered by Puter.js — pick a provider, choose a voice, press play.
          </p>
        </header>

        {/* Text Input */}
        <section className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Your Text
          </label>
          <TextInput value={text} onChange={setText} disabled={isLoading} />
        </section>

        {/* Provider */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Provider
          </h2>
          <ProviderSelector
            selected={provider}
            onSelect={handleProviderChange}
            disabled={isLoading}
          />
        </section>

        {/* Voice */}
        <section className="space-y-3">
          <div className="flex items-baseline gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Voice
            </h2>
            <span className="text-xs text-zinc-600">
              {selectedVoice}
            </span>
          </div>
          <VoiceSelector
            provider={provider}
            selected={selectedVoice}
            onSelect={handleVoiceChange}
            disabled={isLoading}
          />
        </section>

        {/* Speed */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Speed
          </h2>
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 px-5 py-4">
            <SpeedSlider value={speed} onChange={handleSpeedChange} disabled={isLoading} />
          </div>
        </section>

        {/* Player */}
        <section className="rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-4">
          <PlayerControls
            audioState={audioState}
            canPlay={text.trim().length > 0}
            hasAudio={hasAudio}
            onPlay={handlePlay}
            onPause={handlePause}
            onStop={handleStop}
            onDownload={handleDownload}
          />
        </section>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl bg-red-950/40 border border-red-800/50 px-4 py-3"
          >
            <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-red-400">Error</p>
              <p className="text-sm text-red-300/80 mt-0.5">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              aria-label="Dismiss error"
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        )}

        <footer className="text-center text-xs text-zinc-700 pb-4">
          Voices via{" "}
          <a
            href="https://puter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-400 underline underline-offset-2 transition-colors"
          >
            Puter.js
          </a>
          {" "}· AWS Polly · OpenAI · Google Gemini · xAI Grok
        </footer>
      </div>
    </main>
  );
}
