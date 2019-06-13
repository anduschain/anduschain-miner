import { app, Menu, shell } from 'electron';
import { DefaultSetting, nodeOption } from '../config';

const template = [
    {
        label: app.getName(),
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            {
                label: 'backup',
                click () { shell.showItemInFolder(nodeOption.dataDir[1]) }
            },
            { type: 'separator' },
            { role: 'quit' }
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
        label: 'Debug',
        submenu: [
            { role: 'toggledevtools' },
            { type: 'separator' },
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

