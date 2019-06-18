import { app, Menu, shell } from 'electron';
import { DefaultSetting, nodeOption, VERSION } from '../config';

const template = [
    {
        label: app.getName(),
        submenu: [
            {label: `Version : ${VERSION}`},
            { type: 'separator' },
            {
                label: 'Backup',
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
                label: 'Go to Auschain web',
                click () { shell.openExternalSync('https://anduschain.io') }
            },
            {
                label: 'Apply Anduschainer',
                click () { shell.openExternalSync('https://www.anduschain.io/ico/apply.html') }
            },
            {
                label: 'Application form',
                click () { shell.openExternalSync('https://www.anduschain.io/ico/applyForParticipation1.html') }
            }
        ]
    }
];

export default () => {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

