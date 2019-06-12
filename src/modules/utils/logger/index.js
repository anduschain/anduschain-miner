import logger from 'electron-log';
import isDev from 'electron-is-dev';

class Logger {

    constructor(name) {
        this.logger = logger;

        this.format = `[{level}] [{y}-{m}-{d} | {h}:{i}:{s}] ${name} : {text}`;

        if (isDev) {
            // console setting
            this.logger.transports.file.level = false;
            this.logger.transports.console.format = this.format;
        }else{
            // file setting
            this.logger.transports.console.level = false;
            this.logger.transports.file.format = this.format;
            this.logger.transports.file.maxSize = 5 * 1024 * 1024;
        }

    }

    info = (msg) => {
        this.logger.info(msg);
    };

    debug = (msg) => {
        this.logger.debug(msg);
    };

    warn = (msg) => {
        this.logger.warn(msg);
    };

    error = (msg) => {
        this.logger.error(msg);
    }


}

export default Logger;
