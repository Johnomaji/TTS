export {};

declare global {
  interface Window {
    puter: {
      ai: {
        txt2speech: (
          text: string,
          options?: {
            provider?: 'aws-polly' | 'openai' | 'elevenlabs' | 'gemini' | 'xai';
            voice?: string;
          }
        ) => Promise<HTMLAudioElement>;
      };
    };
  }
}
