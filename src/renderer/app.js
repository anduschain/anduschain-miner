import React, {Component} from "react";
import {logger} from "../modules/utils";
import {ipcRenderer} from "electron";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Layout, LeftArea, RightArea } from './components';

class App extends Component {
    constructor(props){
        super(props);
        this.logger = new logger('renderer')
        this.state = {
            leftData : {
                time : new Date(),
                currentBlock : 0,
                isMining : false,
            }
        }
    }

    componentDidMount() {

        // this.interval = setInterval(() => {
        //     console.log("==========", "call setInterval")
        //     ipcRenderer.send('get_node_info')
        // }, 5000);

    }

    componentWillMount() {
        // clearInterval(this.interval)
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



