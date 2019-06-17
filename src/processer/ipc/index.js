import {ipcMain, shell} from "electron";
import RpcCall from '../modules/RpcCall';

export default () => {
    ipcMain.on('get_node_info', (event, data) => {
        let blockNumber = RpcCall("eth_blockNumber", [], 1);
        let syncing = RpcCall("eth_syncing", [], 1);
        let mining = RpcCall("eth_mining", [], 1);

        Promise.all([blockNumber, syncing, mining])
            .then((values) => {
                event.sender.send('node_info_result', {
                    success : true,
                    blockNumber : parseInt(values[0].result),
                    syncing : values[1].result,
                    mining : values[2].result,
                    time : new Date().getTime(),
                })
            })
            .catch(err => {
                event.sender.send('node_info_result', {
                    success : false,
                })
            })
    });

    ipcMain.on('start_mining', (event, data) => {

    });

    ipcMain.on('add_account', (event, data) => {

    });

    ipcMain.on('get_address', (event, data) => {
        RpcCall("eth_accounts", [], 2)
            .then((data) => {
                let addrs = data.result;
                let balanceRpcs = [];
                for (let i=0; i < addrs.length; i++) {
                    balanceRpcs.push(RpcCall("eth_getBalance", [addrs[i], "latest"], 3))
                }
                let coinbase = RpcCall("eth_coinbase", [], 2);
                balanceRpcs.push(coinbase);
                Promise.all(balanceRpcs)
                    .then((values) => {
                        let reuslt = [];
                        for (let i=0; i < values.length-1; i++) {
                            reuslt.push({
                                address : addrs[i],
                                balance : parseInt(values[i].result),
                            });
                        }

                        event.sender.send('node_accounts', {
                            success : true,
                            accounts : reuslt,
                            coinbase : reuslt.filter(item => item.address === values[values.length-1].result),
                        })
                    })
                    .catch(err => {
                        event.sender.send('node_accounts', {
                            success : false,
                            accounts : [],
                            coinbase : [],
                        })
                    })

            })
            .catch(err => {
                event.sender.send('node_accounts', {
                    success : false,
                    accounts : [],
                    coinbase : [],
                })
            });
    });
}

