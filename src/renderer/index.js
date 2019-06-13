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

    }

    render() {
        return(
            <div>
                <Button variant="contained" color="primary" onClick={() => {
                    // ipcRenderer.send('link:open', "https://github.com/anduschain/anduschain-miner");
                    ipcRenderer.send('download');
                    this.logger.info("info renderer logger")
                }}>
                    Hello World
                </Button>
            </div>
        )
    }
}

ReactDom.render(<App/>, document.getElementById("root"));
