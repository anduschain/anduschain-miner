import { app, Menu, shell } from 'electron';
import { DefaultSetting, isMac, nodeOption } from '../config';
import path from "path";
import os from "os";

const template = [
    ...(process.platform === 'darwin' && [{
        label: app.getName(),
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    }]),
    {
        label: 'File',
        submenu: [
            process.platform === 'darwin' ? { role: 'about' } : { role: 'quit' },
            {
                label: 'backup',
                click () { shell.showItemInFolder(nodeOption.dataDir[1]) }
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
        ]
    },
    {
        label: 'Window',
        submenu: [
            { role: 'minimize' },
            { role: 'zoom' },
            ...(isMac ? [
                { type: 'separator' },
                { role: 'front' },
                { type: 'separator' },
                { role: 'window' }
            ] : [
                { role: 'close' }
            ])
        ]
    },
    {
        label: 'Debug',
        submenu: [
            { role: 'toggledevtools' },
            {
                label: 'Show Log File',
                click () { shell.showItemInFolder(DefaultSetting.LOG_PATH) }
            }
        ]
    },
    {
        role: 'Help',
        submenu: [
            {
                label: 'Apply Miner',
                click () { shell.openExternalSync('https://anduschain.io') }
            }
        ]
    }
];

export default () => {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

