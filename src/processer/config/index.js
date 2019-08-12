import os from 'os';
import path from 'path';

const APP_INFO = require('../../../package.json');
const APP_NAME = APP_INFO.productName;
const VERSION = APP_INFO.version;
const isMac = process.platform === 'darwin';
const PlatFrom = process.platform.replace('darwin', 'mac')
    .replace('win32', 'win')
    .replace('freebsd', 'linux')
    .replace('sunos', 'linux');

const logPath = () => {
    switch (PlatFrom) {
        case "linux":
            return path.join(os.homedir(), '.config', APP_NAME, 'log.log');
        case "mac":
            return path.join(os.homedir(), 'Library', 'Logs', APP_NAME, 'log.log');
        case "win":
            return path.join(os.homedir(), 'AppData', 'Roaming', APP_NAME, 'log.log');
        default :
            return os.homedir();
    }
}

const DefaultSetting = {
    LOG_PATH : logPath(),
    BINARY_URL : 'https://raw.githubusercontent.com/anduschain/andusChainGethBinary/deb/nodeBinary.json',
};

const nodeDataDir = () => {
    switch (PlatFrom) {
        case "linux":
            return path.join(os.homedir(), '.AndusChain');
        case "mac":
            return path.join(os.homedir(), 'Library', 'AndusChain');
        case "win":
            return path.join(os.homedir(), 'AppData', 'Roaming', 'AndusChain');
        default :
            return os.homedir();
    }
};

const nodeOption = {
    defaultArgs : [
        '--rpc',
        '--rpcapi', 'admin, eth, miner, txpool, personal, web3, net',
        '--cache', process.arch === 'x64' ? '1024' : '512'
    ],
    testnet : ['--testnet'],
    rpcPort : ['--rpcport', '8545'],
    dataDir : ['--datadir', nodeDataDir()],
};

export {
    nodeOption, DefaultSetting, isMac, PlatFrom, VERSION
}
