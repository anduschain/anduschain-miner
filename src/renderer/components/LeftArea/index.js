import React, { Component } from 'react';
import {withStyles, Typography} from "@material-ui/core";
import {COLOR} from "../../constants";
import {Buttons} from "../index";
import moment from 'moment';
import {ipcRenderer} from "electron";

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
        blockNumber : 0,
        syncing : false,
        mining : false,
        time : new Date().getTime(),
    };

    componentDidMount() {
        ipcRenderer.send('get_node_info');

        this.interval = setInterval(() => {
            ipcRenderer.send('get_node_info');
        }, 1000);

        ipcRenderer.on('node_info_result', (event, data) => {
            if (data.success) {
                this.setState({
                    blockNumber : data.blockNumber,
                    syncing : data.syncing,
                    mining : data.mining,
                    time : data.time,
                })
            }
        });
    }

    startMining = () => {
        ipcRenderer.send('start_mining', {
            coinbase : "0x123124123131313",
            password : "0000000",
        });
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { classes } = this.props;
        const { blockNumber, syncing, mining, time} = this.state;

        return (
            <div className={classes.root}>
                <img src={require('../../../resources/icon.png')} className={classes.image}/>
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
                <Buttons.BigRect status={mining} />
            </div>
        )
    }
}

export default withStyles(styles)(LeftArea);
