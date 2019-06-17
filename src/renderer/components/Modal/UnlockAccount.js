import React from 'react';
import {Typography, makeStyles, TextField} from '@material-ui/core';
import Layout from './Layout';
import { GenBtn } from '../Buttons';
import {COLOR} from "../../constants";

const useStyles = makeStyles(theme => ({
    white : {
        color : COLOR.white,
    },
    buttons : {
        display : 'flex',
        flexDirection : "row",
    },
    address : {
        display : 'flex',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor : COLOR.black,
        padding : "15px",
    },
    content : {
        color : COLOR.white,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        color : COLOR.blue,
    },
}));

export default function UnlockAccount(props) {
    const classes = useStyles();

    return(
        <Layout open={props.open} title={'Unlock Daonbase'} subtitle={"Please, type your daonbase password"}>
            <div className={classes.address}>
                <Typography className={classes.content} variant="subtitle2">{props.address}</Typography>
            </div>
            <TextField
                id="standard-password-input"
                label="Password"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                autoFocus={true}
                fullWidth={true}
            />
            <div className={classes.buttons}>
                <GenBtn onPress={props.close} title={'Cancel'} isCancel={true}/>
                <GenBtn onPress={props.close} title={'Confirm'}/>
            </div>
        </Layout>
    )
}


UnlockAccount.defaultProps = {
    open : true,
    body : "body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur",
    close : () => console.log("close btn pressed"),
    address : '0x3ea44e564d176c46ae29c549055012159494ee48',
};
