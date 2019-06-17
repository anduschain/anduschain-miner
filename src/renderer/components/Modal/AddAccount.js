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

export default function AddAccount(props) {
    const classes = useStyles();

    return(
        <Layout open={props.open} title={'Add Account'} subtitle={"Please, type your Account password"}>
            <TextField
                id='standard-password-input'
                label='Password'
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                autoFocus={true}
                fullWidth={true}
                required={true}
                InputLabelProps={{
                    shrink: true,
                    className : classes.content,
                }}
            />
            <TextField
                id='standard-password-input-confirm'
                label='Confirm Password'
                className={classes.textField}
                type="Confirm password"
                autoComplete="current-password"
                margin="normal"
                autoFocus={true}
                fullWidth={true}
                required={true}
                InputLabelProps={{
                    shrink: true,
                    className : classes.content,
                }}
            />
            <div className={classes.buttons}>
                <GenBtn onPress={props.close} title={'Cancel'} isCancel={true}/>
                <GenBtn onPress={props.close} title={'Add'}/>
            </div>
        </Layout>
    )
}


AddAccount.defaultProps = {
    open : true,
    close : () => console.log("close btn pressed"),
    address : '0x3ea44e564d176c46ae29c549055012159494ee48',
};
