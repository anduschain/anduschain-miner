import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { COLOR } from "../../constants";

const useStyles = makeStyles(theme => ({
    root: {
        display : 'flex',
        flexDirection :'column',
        flexGrow: 1,
        backgroundColor : COLOR.blue,
        height : '220px',
        width : '220px',
        position : "absolute",
        bottom : 0,
        alignItems: "center",
        justifyContent: "center",
    },
    images : {
        width : '130px',
        height : '130px',
    },
    white : {
        color : COLOR.white,
    },
}));

export default function BigRect({status, onClick}) {
    const classes = useStyles();

    return (
        <div className={classes.root} onClick={onClick}>
            <img src={
                status ? require('../../assects/images/icon-stop@3x.png') : require('../../assects/images/icon-start@3x.png')
            } className={classes.images}/>
            <Typography className={`${classes.white}`} variant="h6">{status ? 'STOP' : 'START'}</Typography>
            <Typography className={`${classes.white}`} variant="h6">MINING</Typography>
        </div>
    )
}

BigRect.defaultProps = {
    status : false,
    onClick : () => {console.log("pressed button")}
};
