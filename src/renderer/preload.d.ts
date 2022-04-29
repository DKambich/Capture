declare global {
  interface Window {
    electron: {
      captureControls: {
        play(): void;
        pause(): void;
        stop(): void;
        close(): void;
      };
      ipcRenderer: {
        record(): void;
        getMediaSources(): Promise<CaptureMediaSource[]>;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};
