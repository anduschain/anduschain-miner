import React, { useState } from 'react';
import {makeStyles, TextField} from '@material-ui/core';
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
        color : COLOR.white,
    },
}));

export default function AddAccount(props) {
    const classes = useStyles();
    const [pwd, setPwd] = useState("");
    const [rePwd, setRePwd] = useState("");

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
                InputProps={{
                    className : classes.content,
                }}
                InputLabelProps={{
                    shrink: true,
                    className : classes.content,
                }}
                onChange={(e) => setPwd(e.target.value)}
            />
            <TextField
                id='standard-password-input-confirm'
                label='Confirm Password'
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                autoFocus={false}
                fullWidth={true}
                required={true}
                InputProps={{
                    className : classes.content,
                }}
                InputLabelProps={{
                    shrink: true,
                    className : classes.content,
                }}
                onChange={(e) => setRePwd(e.target.value)}
            />
            <div className={classes.buttons}>
                <GenBtn onPress={() => props.onComplate(false, {error : "close"})} title={'Cancel'} isCancel={true}/>
                <GenBtn onPress={() => {
                    if (pwd === rePwd) {
                        if (pwd && rePwd) {
                            if (pwd.length > 5) {
                                props.onComplate(true, {password : pwd});
                            }else{
                                props.onComplate(false, {error : "Please enter at least 6 digits"});
                            }
                        }else{
                            props.onComplate(false, {error : "please, enter your account password"});
                        }
                    }else{
                        props.onComplate(false, {error : "password is not match"});
                    }
                }} title={'Add'}/>
            </div>
        </Layout>
    )
}


AddAccount.defaultProps = {
    open : true,
    onComplate : (props) => console.log("close btn pressed", props),
    address : '0x3ea44e564d176c46ae29c549055012159494ee48',
};
