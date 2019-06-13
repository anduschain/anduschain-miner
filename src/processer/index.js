import { app } from 'electron';
import MinerApp from './app';
import ipc from './ipc';
import binaryManager from './modules/BinaryManager';
import nodeManager from './modules/NodeManager';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

function Start() {
    MinerApp.Create();
    ipc();
    binaryManager.Start();

    console.log("-----nodeManager-----", nodeManager.isRunning)

    nodeManager.Start();

    console.log("-----nodeManager-----", nodeManager.isRunning)

    console.log("app started");
}

function Stop() {
    binaryManager.Stop();
    nodeManager.Stop();
    console.log("app stopped");
}

app.on('ready', () => {
    Start() // start instances
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

app.on('will-quit', () => {
    Stop(); // stop instances
});
