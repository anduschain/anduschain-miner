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

export default function NodeOption(props) {
    const classes = useStyles();
    const [port, setPort] = useState(props.default.port);

    return(
        <Layout open={props.open} title={'Setting Node'} subtitle={"Setting Node Option"}>
            <TextField
                id='standard-input'
                label='Port'
                className={classes.textField}
                type="text"
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
                onChange={(e) => setPort(e.target.value)}
                value={port}
            />
            <div className={classes.buttons}>
                <GenBtn onPress={() => {
                    if (port) {
                        props.onComplate(true, {port : port});
                    }else{
                        props.onComplate(false, {error : "Please enter at node port"});
                    }
                }} title={'Start Node'}/>
            </div>
        </Layout>
    )
}


NodeOption.defaultProps = {
    open : true,
    onComplate : (props) => console.log("close btn pressed", props),
    default : {
        port : "50505"
    },
};
