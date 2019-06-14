import {ipcMain, shell} from "electron";
import RpcCall from '../modules/RpcCall';

export default () => {
    ipcMain.on('link:open', (event, link) => {
        if ('string' === typeof link && link.length > 0)
            shell.openExternal(link);
    });

    ipcMain.on('call', (event, data) => {
        RpcCall("eth_accounts", [], 1).then((data) => {
            event.sender.send('get-result-success', data);

        }).catch((err) => {

            event.sender.send('get-result-error', err);
        });
    });


    ipcMain.on('node-kill', (e, data) => {

    })
}

