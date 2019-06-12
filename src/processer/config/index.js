import os from 'os';
import path from 'path';

const APP_INFO = require('../../../package.json');
const APP_NAME = APP_INFO.productName;
const VERSION = APP_INFO.version;
const isMac = process.platform === 'darwin';

const DefaultSetting = {
    LOG_PATH : () => {
        switch (process.platform) {
            case "linux":
                return path.join(os.homedir(), '.config', APP_NAME, 'log.log');
            case "darwin":
                return path.join(os.homedir(), 'Library', 'Logs', APP_NAME, 'log.log');
            case "win32":
                return path.join(os.homedir(), 'AppData', 'Roaming', APP_NAME, 'log.log');
            default :
                return os.homedir();
        }
    },
    BINARY_URL : 'https://raw.githubusercontent.com/anduschain/andusChainGethBinary/master/clientBinaries.json',
};

const nodeOption = {

};

export {
    nodeOption, DefaultSetting, isMac
}
