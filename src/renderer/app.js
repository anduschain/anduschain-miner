import React, {Component} from "react";
import {logger} from "../modules/utils";
import {ipcRenderer} from "electron";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Layout, LeftArea, Buttons, RightArea } from './components';

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
            <React.Fragment>
                <CssBaseline />
                <Layout
                    Left={(<LeftArea />)}
                    Right={(<RightArea />)}
                />
            </React.Fragment>
        )
    }
}

export default App;

// {/*<div>*/}
// {/*    <Button variant="contained" color="primary" onClick={() => {*/}
// {/*        // ipcRenderer.send('link:open', "https://github.com/anduschain/anduschain-miner");*/}
// {/*        ipcRenderer.send('call');*/}
// {/*        // console.log("-------------", ipcRenderer.sendSync('synchronous-message', 'ping'));*/}
//
// {/*        ipcRenderer.send('asynchronous-message', 'ping')*/}
//
// {/*        this.logger.info("info renderer logger")*/}
// {/*    }}>*/}
// {/*        Hello World*/}
// {/*    </Button>*/}
// {/*</div>*/}



