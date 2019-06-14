import EventEmitter from 'events';
import { spawn } from 'child_process';
import { logger } from '../../modules/utils'
import { nodeOption } from '../config';
import store from "./Store";

class NodeManager extends EventEmitter {
    constructor() {
        super();
        this.logger = new logger('node_process');
        this.node = null;
        this.running = false;
        this.args = [];
        this.path = null;
    }

    get isRunning() {
        return this.running;
    }

    Start = (isUpdate) => {
        this.path = store.get("binary-bin");
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
                this.logger.info('exit: ' + data);

                // node update 상황이 아닐때 호출 -> 비정상적인 종료
                if (!isUpdate) {
                    this.emit("node-manager-kill")
                }
            });
        }else{
            this.logger.error('binary path is null');
        }
    };

    ReStart = () => {
        this.Stop();
        this.Start(true);
        this.logger.info("node restarted")
    };

    Stop = () => {
        this.node.kill();
        this.running = false;
        this.logger.info("node killed")
    };


}

export default new NodeManager();
