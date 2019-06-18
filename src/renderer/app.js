import React, {Component} from "react";
import {logger} from "../modules/utils";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Layout, LeftArea, RightArea } from './components';

class App extends Component {
    constructor(props){
        super(props);
        this.logger = new logger('renderer');
        this.state = {
            coinbase : "",
        }
    };

    setCoinbase = (addr) => {
        if (this.state.coinbase !== addr) {
            this.setState({coinbase : addr});
        }
    };

    render() {
        const { coinbase } = this.state;
        return(
            <React.Fragment>
                <CssBaseline />
                <Layout
                    Left={(<LeftArea coinbase={coinbase}/>)}
                    Right={(<RightArea setCoinbase={this.setCoinbase}/>)}
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



