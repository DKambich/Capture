declare global {
  interface Window {
    electron: {
      captureControls: {
        ready(): void;
        play(): void;
        pause(): void;
        stop(): void;
        close(): void;
      };
      ipcRenderer: {
        record(): void;
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
