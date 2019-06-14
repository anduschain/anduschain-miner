import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Button from '@material-ui/core/Button';
import { ipcRenderer, remote } from 'electron';
import { logger } from '../modules/utils';

class App extends Component {
    constructor(props){
        super(props);
        this.logger = new logger('renderer')
    }

    componentDidMount() {

        ipcRenderer.on('get-result-success', (event, data) => {
            console.log(data)
        });

        ipcRenderer.on('get-result-error', (event, err) => {
            console.log(err)
        });

    }

    render() {
        return(
            <div>
                <Button variant="contained" color="primary" onClick={() => {
                    // ipcRenderer.send('link:open', "https://github.com/anduschain/anduschain-miner");
                    ipcRenderer.send('call');
                    // console.log("-------------", ipcRenderer.sendSync('synchronous-message', 'ping'));

                    ipcRenderer.send('asynchronous-message', 'ping')

                    this.logger.info("info renderer logger")
                }}>
                    Hello World
                </Button>
            </div>
        )
    }
}

ReactDom.render(<App/>, document.getElementById("root"));
