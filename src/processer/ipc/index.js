import {ipcMain, shell} from "electron";

export default () => {
    ipcMain.on('link:open', (event, link) => {
        if ('string' === typeof link && link.length > 0)
            shell.openExternal(link);
    });

    ipcMain.on('download', (event) => {

    });
}

