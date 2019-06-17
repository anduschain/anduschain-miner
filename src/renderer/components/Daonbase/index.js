import React from 'react';
import {makeStyles, Typography} from "@material-ui/core";
import {COLOR, UNIT} from "../../constants";

const useStyles = makeStyles(theme => ({
    root: {
        display : 'flex',
        flexDirection : 'column',
        backgroundColor : COLOR.black,
        width : '100%',
        border : `solid 1px ${COLOR.blue}`,
        padding : "28px 36px",
    },
    container : {
        display : 'flex',
        flexDirection : 'row',
        padding: '5px',
    },
    title : {
        color : COLOR.blue,
        marginRight : '25px',
    },
    content : {
        color : COLOR.white,
    }
}));

export default function Daonbase(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Typography className={classes.title} variant="subtitle2">Address</Typography>
                <Typography className={classes.content} variant="subtitle2">{props.address}</Typography>
            </div>
            <div className={classes.container}>
                <Typography className={classes.title} variant="subtitle2">Balance</Typography>
                <Typography className={classes.content} variant="subtitle2">{UNIT(props.balance)}</Typography>
            </div>
        </div>
    )
}

Daonbase.defaultProps = {
    address : "0x3ea44e564d176c46ae29c549055012159494ee48",
    balance : "1000000000000000000",
};
