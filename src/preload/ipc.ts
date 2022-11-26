import { ipcRenderer } from "electron";

export const ipc = {
  send: (channel: string, ...args: unknown[]) =>
    ipcRenderer.send(channel, ...args),
  invoke: (channel: string, ...args: unknown[]): Promise<unknown> =>
    ipcRenderer.invoke(channel, ...args),
  on: (
    channel: string,
    listener: (event: Electron.IpcRendererEvent, ...args: unknown[]) => void
  ) => {
    console.log("preload.ipc.on");
    ipcRenderer.on(channel, listener);
  }
};
