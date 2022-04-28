import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

contextBridge.exposeInMainWorld("captureControls", {
  ipcRenderer: {
    closeWindow() {
      ipcRenderer.send("ipc-example", "close");
    },
  },
});
