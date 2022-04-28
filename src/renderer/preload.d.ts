declare global {
  interface Window {
    captureControls: {
      ipcRenderer: {
        closeWindow(): void;
      };
    };
    electron: {
      ipcRenderer: {
        myPing(): void;
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
