import React, { Component } from 'react';
import {withStyles, makeStyles, Typography, Button} from "@material-ui/core";
import {COLOR} from "../../constants";
import Daonbase from '../Daonbase';
import Account from '../Account';
import { GenBtn } from '../Buttons';
import { Confirm, UnlockAccount, AddAccount } from "../Modal";
import {ipcRenderer} from "electron";

const styles = theme => ({
    root: {
        display: 'flex',
        backgroundColor: COLOR.darkGray,
        width: '680px',
        height: '578px',
    },
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        overflow: 'scroll',
        '&::-webkit-scrollbar': {
            display: "none",
        },
        '&::-webkit-scrollbar-thumb': {
            display: "none",
        },
        paddingBottom: '100px',
    },
    innerContainer: {
        paddingTop: '30px',
        paddingLeft: '40px',
        paddingRight: '40px',
    },
    title: {
        color: COLOR.white,
        marginTop: '20px',
        marginBottom: '20px',
    },
    accountContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    button: {
        margin: theme.spacing(3),
        borderRadius: "25px",
        containedPrimary: COLOR.blue,
        backgroundColor: COLOR.blue,
    },
    titleContiner: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    white: {
        color: COLOR.white,
    }
});

class RightArea extends Component {

    state = {
        newAccount : false,
        accounts : [],
        coinbase : [],
    };

    componentDidMount() {
        ipcRenderer.send('get_address');

        this.interval = setInterval(() => {
            ipcRenderer.send('get_address');
        }, 1000);

        ipcRenderer.on('node_accounts', (event, data) => {
            if (data.success) {
                this.setState({
                    success : true,
                    accounts : data.accounts,
                    coinbase : data.coinbase,
                })
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    openModal = (key, open) => {
        this.setState({ open : open})
    };

    render() {
        const {classes} = this.props;
        const { open, coinbase, accounts, newAccount } = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <div className={classes.innerContainer}>
                        <Typography className={classes.title} variant="h6">Daonbase</Typography>
                        {
                            coinbase.length > 0 && <Daonbase address={coinbase[0].address} balance={coinbase[0].balance}/>
                        }
                        <div className={classes.titleContiner}>
                            <Typography className={classes.white} variant="h6">Accounts</Typography>
                            <GenBtn title={'add account'} onPress={() =>this.openModal(true)}/>
                        </div>
                        <div className={classes.accountContainer}>
                            {
                                accounts.length > 0 &&
                                    accounts.map((item, i) => <Account address={item.address} balance={item.balance} key={i}/>)
                            }
                        </div>
                        <AddAccount open={newAccount} close={() => this.openModal('newAccount', false)} />
                    </div>
                </div>
            </div>
        )
    }
}


export default withStyles(styles)(RightArea)


//<Confirm open={open} close={() => setOpen(false)} error={true}/>
//<AddAccount open={open} close={() => setOpen(false)} />
//<UnlockAccount open={open} close={() => setOpen(false)} />
