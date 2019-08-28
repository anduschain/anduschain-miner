import { app, ipcMain } from 'electron';
import EventEmitter from 'events';
import { spawn } from 'child_process';
import { logger } from '../../modules/utils'
import store from "./Store";

class NodeManager extends EventEmitter {
    constructor() {
        super();
        this.logger = new logger('node_process');
        this.node = null;
        this.running = false;
        this.args = [];
        this.path = null;
        this.isUpdate = false;

        ipcMain.on("start_node", (event, data) => {
            this.Start(false, data.nodeOption);
        });

        ipcMain.on("stop_node", (event, data) => {
            this.Stop();
        });

        ipcMain.on("update_start_node", (event, data) => {
            this.Start(true, data.nodeOption);
        });
    }

    get isRunning() {
        return this.running;
    }

    Start = (isUpdate, option) => {
        if (this.running) {
            return
        }

        this.isUpdate = isUpdate;
        this.path = store.get("binary-bin");
        if (this.path) {
            this.logger.info("started anduschain node");
            this.running = true;

            //setting args
            this.args = option;
            this.logger.info(`node running ${this.path} ${this.args}`);

            //start node
            this.node = spawn(this.path, this.args);

            // setting event
            this.node.stdout.on('data', (data) => {
                this.logger.info(`${data}`);
            });

            this.node.stderr.on('data', (data) => {
                this.logger.info(`${data}`);
            });

            this.node.on('exit', (data) => {
                this.logger.info('exit: ' + data);

                // node update 상황이 아닐때 호출 -> 비정상적인 종료
                if (!this.isUpdate) {
                    this.emit("node-manager-kill")
                }
            });
        }else{
            this.logger.error('binary path is null');
        }
    };

    Stop = () => {
        if (this.running) {
            this.isUpdate = true; // node will killed status
            this.running = false;
            this.node.kill();
            this.logger.info("node killed")
        }
    };


}

export default new NodeManager();
