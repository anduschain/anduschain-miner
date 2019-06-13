import EventEmitter from 'events';
import { spawn } from 'child_process';
import { logger } from '../../modules/utils'
import store from './Store';
import { nodeOption } from '../config';

class NodeManager extends EventEmitter {
    constructor() {
        super();
        this.logger = new logger('node_process');
        this.path = store.get('binary-bin');
        this.node = null;
        this.running = false;
        this.args = [];
    }

    get isRunning() {
        return this.running;
    }

    Init = () => {

    };

    Start = () => {
        if (this.path) {
            this.logger.info("started anduschain node");
            this.running = true;

            //setting args
            this.args = nodeOption.defaultArgs.concat(nodeOption.testnet);
            this.logger.info(`node running ${this.path} ${this.args}`);

            //start node
            this.node = spawn(this.path, this.args);

            // setting event
            this.node.stdout.on('data', (data) => {
                this.logger.info('stdout: ' + data);
            });

            this.node.stderr.on('data', (data) => {
                this.logger.info('stderr: ' + data);
            });

            this.node.on('exit', (data) => {
                this.logger.info('exit: ' + code);
            });
        }
    };

    Stop = () => {
        this.node.kill();
        this.running = false;
        this.logger.info("node killed")
    };


}

export default new NodeManager();
