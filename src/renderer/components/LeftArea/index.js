import React, { Component } from 'react';
import {withStyles, Typography} from "@material-ui/core";
import {COLOR, Images} from "../../constants";
import {Buttons} from "../index";
import moment from 'moment';
import {ipcRenderer} from "electron";
import { Confirm, UnlockAccount } from "../Modal";

const styles = {
    root: {
        display : 'flex',
        flexDirection :'column',
        flexGrow: 1,
        backgroundColor : COLOR.black,
        width : '220px',
        alignItems : 'center',
        paddingTop : "45px",
    },
    image : {
        width : "80px",
        height : "80px",
    },
    white : {
        color : COLOR.white,
    },
    status : {
        marginTop : '10px',
        marginBottom : '10px',
    },
    statusRect: {
        display : 'flex',
        alignItems: "center",
        justifyContent: "center",
        borderRadius : "19px",
        width: "120px",
        height: "38px",
        border : `solid 1px ${COLOR.blue}`,
        marginBottom : '25px',
    },
    time : {
        marginBottom : '15px',
    },
    blockNumber : {
        marginBottom : '20px',
    },
    blue : {
        color : COLOR.blue,
    }
};

class LeftArea extends Component {

    state = {
        blockNumber: 0,
        syncing: false,
        mining: false,
        time: new Date().getTime(),
        errorModal: false,
        errorBody: "",
        confirmModal: false,
        confirmBody: "",
        unlockModal: false,
    };

    componentDidMount() {
        ipcRenderer.send('get_node_info');

        this.interval = setInterval(() => {
            ipcRenderer.send('get_node_info');
        }, 1000);

        ipcRenderer.on('node_info_result', (event, data) => {
            if (data.success) {
                this.setState({
                    blockNumber: data.blockNumber,
                    syncing: data.syncing,
                    mining: data.mining,
                    time: data.time,
                })
            }
        });

        ipcRenderer.on('start_mining_result', (event, data) => {
            if (data.success) {
                this.setState({
                    confirmModal: true,
                    confirmBody: data.message,
                })
            }else{
                this.setState({
                    errorModal: true,
                    errorBody: data.message,
                })
            }
        });

        ipcRenderer.on('stop_mining_result', (event, data) => {
            if (data.success) {
                this.setState({
                    confirmModal: true,
                    confirmBody: data.message,
                })
            }else{
                this.setState({
                    errorModal: true,
                    errorBody: data.message,
                })
            }
        });
    }

    startMining = () => {
        if (this.state.mining) {
            ipcRenderer.send('stop_mining')
        }else{
            if (this.props.coinbase) {
                this.openModal("unlockModal");
            } else {
                this.setState({
                    errorModal: true,
                    errorBody: "You do not have an account"
                })
            }
        }
    };

    miningSend = (success, payload) => {
        this.setState({ unlockModal : false});
        if (success) {
            ipcRenderer.send('start_mining', {
                coinbase : this.props.coinbase,
                password : payload.password,
            });
        }else{
            if (payload.error !== 'close') {
                this.setState({ errorBody : payload.error});
                this.openModal("errorModal")
            }
        }
    };

    openModal = (key) => this.setState({[key] : true});
    closeModal = (key) => this.setState({[key] : false});

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { classes } = this.props;
        const { blockNumber, syncing, mining, time, confirmModal, confirmBody, errorModal, errorBody, unlockModal} = this.state;

        return (
            <div className={classes.root}>
                <img src={Images.logo} className={classes.image}/>
                <Typography className={`${classes.status} ${classes.white}`} variant="h6">Status</Typography>
                <div className={classes.statusRect}>
                    <Typography variant="button" display="block" className={classes.blue}>
                        {mining ? "MINING" : "STOP"}
                    </Typography>
                </div>
                <Typography className={classes.white} variant="h6">#Block Height</Typography>
                <Typography className={`${classes.white} ${classes.time}`} variant="caption">
                    {`${moment(time).format('YYYY-MM-DD hh:mm:ss')}`}
                </Typography>
                <Typography className={`${classes.white} ${classes.blockNumber}`} variant="h6">{`#${blockNumber}`}</Typography>
                <Buttons.BigRect status={mining} onClick={this.startMining} />

                <UnlockAccount open={unlockModal} onComplate={this.miningSend} address={this.props.coinbase}/>
                <Confirm open={errorModal} close={() => this.closeModal('errorModal')} error={true} body={errorBody}/>
                <Confirm open={confirmModal} close={() => this.closeModal('confirmModal')} body={confirmBody}/>
            </div>
        )
    }
}

LeftArea.defaultProps = {
    coinbase : "",
};

export default withStyles(styles)(LeftArea);
