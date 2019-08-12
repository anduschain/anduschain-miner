import React, {Component} from "react";
import {logger} from "../modules/utils";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Layout, LeftArea, RightArea } from './components';
import {ipcRenderer} from "electron";
import { nodeOption } from '../processer/config';
import {Confirm, NodeOption} from "./components/Modal";

class App extends Component {
    constructor(props){
        super(props);
        this.logger = new logger('renderer');
        this.state = {
            coinbase : "",
            nodeSettingModal : false,
            errorModal : false,
            errorBody : "",
            nodeOption : {
                loading : false,
                port : "50505",
            },
        };
    };

    componentDidMount() {
        let option = localStorage.getItem('nodeOption')
        if (option) {
            let opt = JSON.parse(option);
            this.setState({nodeOption : { loading : true, port : opt[7] ? opt[7] : "50505"}});
        }else{
            this.setState({nodeOption : { loading : true }});
        }

        this.interval = setInterval(() => {
            ipcRenderer.send('ready_to_binary');
        }, 1000);

        ipcRenderer.on('ready_to_binary_ok', (event, data) => {
            if (data.status) {
                clearInterval(this.interval);
                this.setState({nodeSettingModal : true});
            }
        })
    }

    setCoinbase = (addr) => {
        if (this.state.coinbase !== addr) {
            this.setState({coinbase : addr});
            localStorage.setItem('coinbase', addr);
        }
    };

    nodeSetting = (success, payload) => {
        this.setState({ nodeSettingModal : false});
        if (success) {
            let option = [];
            option = Object.assign([], option.concat(nodeOption.defaultArgs));
            option = Object.assign([], option.concat(nodeOption.testnet));
            option = Object.assign([], option.concat(['--port', payload.port]));
            localStorage.setItem('nodeOption', JSON.stringify(option));
            ipcRenderer.send('start_node', { nodeOption : option });
        }else{
            if (payload.error !== 'close') {
                this.setState({ errorBody : payload.error});
                this.openModal("errorModal")
            }
        }
    };

    openModal = (key) => this.setState({[key] : true});
    closeModal = (key) => this.setState({[key] : false});

    render() {
        const { coinbase, nodeSettingModal, errorModal, errorBody, nodeOption } = this.state;
        return(
            <React.Fragment>
                <CssBaseline />
                <Layout
                    Left={(<LeftArea coinbase={coinbase}/>)}
                    Right={(<RightArea setCoinbase={this.setCoinbase}/>)}
                />
                {
                    nodeOption.loading && <NodeOption open={nodeSettingModal} onComplate={this.nodeSetting} default={nodeOption}/>
                }
                <Confirm open={errorModal} close={() => this.closeModal('errorModal')} error={true} body={errorBody}/>
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



