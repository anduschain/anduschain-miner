import {ipcMain, shell} from "electron";

ipcMain.on('link:open', (event, link) => {
    if ('string' === typeof link && link.length > 0)
        shell.openExternal(link);
});
