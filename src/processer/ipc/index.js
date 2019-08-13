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
        RpcCall("personal_unlockCoinbase", [data.coinbase, data.password], 10)
            .then(res => {
                if (res.result === true) {

                    RpcCall("miner_start", [], 10)
                        .then(res => {
                            // success { jsonrpc: '2.0', id: 10, result: null }
                            if (!res.result) {
                                event.sender.send('start_mining_result', {
                                    success : true,
                                    message : "start mining",
                                })
                            }else{
                                event.sender.send('start_mining_result', {
                                    success : false,
                                    message : res.result,
                                })
                            }
                        })
                        .catch(err => {
                            event.sender.send('start_mining_result', {
                                success : false,
                                message : err,
                            })
                        });
                }else{
                    event.sender.send('start_mining_result', {
                        success : false,
                        message : "Wrong password",
                    })
                }
            })
            .catch(err => {
                event.sender.send('start_mining_result', {
                    success : false,
                    message : err,
                })
            })
    });

    ipcMain.on('stop_mining', (event, data) => {
        RpcCall("miner_stop", [], 11)
            .then(res => {
                event.sender.send('stop_mining_result', {
                    success : true,
                    message : "mining stoped",
                })
            })
            .catch(err => {
                event.sender.send('stop_mining_result', {
                    success : false,
                    message : err,
                })
            })
    });

    ipcMain.on('add_account', (event, data) => {
        RpcCall("personal_newAccount", [data.password], 1)
            .then((res) => {
                event.sender.send('make_account', {
                    success : true,
                    address : res.result,
                })
            })
            .catch(err => {
                event.sender.send('make_account', {
                    success : false,
                })
            })
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

                        if (reuslt.length > 0) {
                            event.sender.send('node_accounts', {
                                success : true,
                                accounts : reuslt,
                                coinbase : reuslt.filter(item => item.address === values[values.length-1].result),
                            })
                        }else{
                            event.sender.send('node_accounts', {
                                success : false,
                                accounts : [],
                                coinbase : [],
                            })
                        }
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

