import type { OpenDialogReturnValue } from "electron";
import { ipcMain, dialog } from "electron";
import { start } from "./cmder";

ipcMain.on("start-open-file-dialog", event => {
  console.log("main.open-file-dialog");
  dialog
    .showOpenDialog({
      properties: ["openFile", "openDirectory"]
    })
    .then((response: OpenDialogReturnValue) => {
      console.log(response);
      if (response.filePaths) {
        event.sender.send("end-open-file-dialog", response.filePaths);
      }
    });
});

ipcMain.on("start-exec-cmd", (event, arg: string) => {
  console.log("main.exec-cmd: ", arg);
  const response = start(arg);
  console.log("main.exec-cmd.response: ", response);
  event.sender.send("end-exec-cmd", response);
});

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({});
  console.log(filePaths);
  if (canceled) {
    return [];
  } else {
    return filePaths;
  }
}
ipcMain.handle("dialog:openFile", handleFileOpen);
