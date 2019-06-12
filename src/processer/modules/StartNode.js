import EventEmitter from 'events';
import { spawn } from 'child_process';
import { logger } from '../../modules/utils'

class NodeStart extends EventEmitter {
    constructor(nodePath) {
        super();
        this.logger = new logger('node_process');

        this.path = '/Users/hakuna/Anduschain/bin/geth';
        this.node = null;

        this.args = [];
    }

    Init = () => {

    };

    Start = () => {
        this.logger.info("started anduschain node");

        this.node = spawn(this.path, ['--testnet']);

        this.node.stdout.on('data', (data) => {
            this.logger.info('stdout: ' + data);
        });

        this.node.stderr.on('data', (data) => {
            this.logger.info('stderr: ' + data);
        });

        this.node.on('exit', (data) => {
            this.logger.info('exit: ' + code);
        });
    };

    Stop = () => {
        this.node.kill();
        this.logger.info("node killed")
    };


}

export default NodeStart;
