// anduschain-miner : Unzip binary
import { tgz, zip } from 'compressing';
import {app} from "electron";

export default (platFrom, file, outputDir) => new Promise((resolve, reject) => {

    // let tarFile = '/Users/hakuna/Library/Application Support/anduschain-miner/geth-darwin-10.6-amd64-anduschain-0.6.11-anduschain-unstable.tar.gz';
    // let zipFile = '/Users/hakuna/Library/Application Support/anduschain-miner/geth-windows-4.0-amd64-anduschain-0.6.11-anduschain-unstable.zip';
    if (platFrom === 'win') {
        zip.uncompress(file, outputDir)
            .then(() => {
                resolve("success")
            })
            .catch((err) => {
                reject(err);
            });
    }else{
        tgz.uncompress(file, outputDir)
            .then(() => {
                resolve("success")
            })
            .catch((err) => {
                reject(err);
            });
    }
});
