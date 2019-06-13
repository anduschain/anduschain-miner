import { app } from 'electron';
import MinerApp from './app';
import { nodeOption, DefaultSetting, isMac } from './config';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

app.on('ready', () => {
    MinerApp.Create();

    console.log(nodeOption, DefaultSetting, isMac)
});

app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (MinerApp.isWindows === null) {
        MinerApp.Create();
    }
});
