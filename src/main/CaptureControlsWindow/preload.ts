import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  captureControls: {
    close: () => ipcRenderer.send("capture-controls-channel", "close"),
    ready: () => ipcRenderer.send("capture-controls-channel", "ready"),
    play: () => ipcRenderer.send("capture-controls-channel", "play"),
    pause: () => ipcRenderer.send("capture-controls-channel", "pause"),
    stop: () => ipcRenderer.send("capture-controls-channel", "stop"),
  },
});
