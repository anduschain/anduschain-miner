import React, {useState} from 'react';
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
    const [pwd, setPwd] = useState("");

    return(
        <Layout open={props.open} title={'Unlock Daonbase'} subtitle={"Please, type your daonbase password"}>
            <div className={classes.address}>
                <Typography className={classes.content} variant="subtitle2">{props.address}</Typography>
            </div>
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
                InputProps={{
                    className : classes.content,
                }}
                InputLabelProps={{
                    shrink: true,
                    className : classes.content,
                }}
                onChange={(e) => setPwd(e.target.value)}
            />
            <div className={classes.buttons}>
                <GenBtn onPress={() => props.onComplate(false, {error : "close"})} title={'Cancel'} isCancel={true}/>
                <GenBtn onPress={() => {
                    if (pwd) {
                        props.onComplate(true, {password : pwd})
                    }else{
                        props.onComplate(false, {error : "please, enter your account password"});
                    }
                    setPwd("");
                }} title={'Confirm'}/>
            </div>
        </Layout>
    )
}


UnlockAccount.defaultProps = {
    open : true,
    onComplate : (props) => console.log("close btn pressed", props),
    address : '0x3ea44e564d176c46ae29c549055012159494ee48',
};
