import { app, dialog, ipcMain } from 'electron';
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
    console.log("app started");
}

function Stop() {
    binaryManager.Stop();
    if (nodeManager.isRunning) {
        nodeManager.Stop();
    }
    console.log("app stopped");
}

// 바이너리 준비 완료 이벤트
binaryManager.on('binary-manager-ready-to-start', () =>{
    //nodeManager.Start(false);
});

// 바이너리 업데이트 이벤트
binaryManager.on('binary-manager-ready-to-update', () =>{
    nodeManager.ReStart();
});

// 노드 프로세스 중단시 alert 호출 후 프로그램 종료
nodeManager.on('node-manager-kill', () => {
    dialog.showErrorBox("miner", "anduschain node killed, miner program will terminate.");
    app.quit();
});

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
    if (MinerApp.getWindows === null) {
        MinerApp.Create();
    }
});

app.on('will-quit', () => {
    Stop(); // stop instances
});
