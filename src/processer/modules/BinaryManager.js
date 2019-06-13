// anduschain-miner : Web download
import { app } from 'electron';
import EventEmitter from 'events';
import { get } from 'request';
import { DefaultSetting, PlatFrom } from '../config';
import store from '../modules/Store';
import { createHash } from 'crypto';
import { logger } from '../../modules/utils';
import fs from 'fs';
import { parse } from 'url';
import unzip from '../modules/Unzip';

class BinaryManager extends EventEmitter {
    constructor() {
        super();
        this.binaryHash = store.get("binary-hash");
        this.logger = new logger('BinaryManager')
    }

    Download = () => {
        this.logger.info("call Download");
        return new Promise((resolve, reject) => {
            get(DefaultSetting.BINARY_URL, (error, response, body) => {
                if (error) {
                    this.logger.error(error);
                    return reject(error)
                }
                return resolve(JSON.parse(body));
            })
        })
    };

    DownloadNode = (url) => {
        let splitPath = parse(url).path.split("/");
        let output = `${app.getPath('userData')}/${splitPath[splitPath.length - 1]}`;
        get({url: url, encoding: null}, (err, resp, body) => {
            if(err) throw err;
            fs.writeFile(output, body, (err) => {
                if(err) throw err;
                this.logger.info(`node binary written! ${output}`);

                unzip(PlatFrom, output).then(() => {
                    this.logger.info(`node binary unzip! ${output}`);
                }).catch((err) => {
                    this.logger.error(`node binary unzip! ${err}`)
                })
            });
        });


    };

    Hash = (data) => {
        let str = JSON.stringify(data);
        return createHash('sha256').update(str).digest('hex');
    };

    BinaryProcess = (binData) => {
        if (binData) {
            let binInfo = binData.clients.platforms[PlatFrom][process.arch].download;
            this.binaryHash = this.Hash(binData);
            store.set("binary-hash", this.binaryHash);
            store.set("binary-version", binData.clients.version);
            store.set("binary-bin", `${app.getPath('userData')}/${binInfo.bin}`);
            this.DownloadNode(binInfo.url)
        }
    };

    Start = () => {
        if (this.binaryHash) {
            this.CheckUpdate();
        }else{
            this.Download().then((data) => {
                this.BinaryProcess(data);
            });
        }
    };

    CheckUpdate = () => {
        this.interval = setInterval(() => {
            this.logger.info("CheckUpdate");
            this.Download().then((data) => {
                if (this.binaryHash !== this.Hash(data)){
                    this.BinaryProcess(data);
                }
            });
        }, 10000) // FIXME : 10분마다 확인 : 600000
    };

    Stop = () => {
        clearInterval(this.interval);
    };

}

export default new BinaryManager();
