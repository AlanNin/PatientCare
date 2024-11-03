import { IpcMainInvokeEvent, ipcMain, shell } from "electron";

const base = "file-explorer";

ipcMain.handle(
  `${base}-open-file`,
  async (_event: IpcMainInvokeEvent, path: string) => {
    await shell.openPath(path);
  }
);

ipcMain.handle(
  `${base}-open-folder`,
  async (_event: IpcMainInvokeEvent, path: string) => {
    await shell.showItemInFolder(path);
  }
);
