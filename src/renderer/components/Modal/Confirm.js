import React from 'react';
import {Typography, makeStyles} from '@material-ui/core';
import Layout from './Layout';
import { GenBtn } from '../Buttons';
import {COLOR} from "../../constants";

const useStyles = makeStyles(theme => ({
    white : {
        color : COLOR.white,
    }
}));

export default function Confirm(props) {
    const classes = useStyles();

    return(
        <Layout open={props.open} title={props.error ? 'Error' : 'Confirm'} subtitle={""}>
            <Typography className={`${classes.white}`} variant="body1">{props.body}</Typography>
            <GenBtn onPress={props.close} title={'Confirm'}/>
        </Layout>
    )
}


Confirm.defaultProps = {
    open : true,
    error : false,
    body : "body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur",
    close : () => console.log("close btn pressed")
};
