import React from 'react';
import {makeStyles, Typography} from "@material-ui/core";
import {COLOR, UNIT} from "../../constants";
import {clipboard} from "electron";


const useStyles = makeStyles(theme => ({
    root: {
        display : 'flex',
        flexDirection : 'column',
        backgroundColor : COLOR.black,
        width : '290px',
        padding : "25px 30px",
        margin : "5px 3px",
    },
    container : {
        display : 'flex',
        flexDirection : 'column',
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

export default function Account(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Typography className={classes.title} variant="subtitle2">Address</Typography>
                <Typography className={classes.content} variant="subtitle2" noWrap={true} onClick={() =>{
                    clipboard.writeText(props.address);
                    alert(`Copied ${props.address}`);
                }}>{props.address}</Typography>
            </div>
            <div className={classes.container}>
                <Typography className={classes.title} variant="subtitle2">Balance</Typography>
                <Typography className={classes.content} variant="subtitle2">{UNIT(props.balance)}</Typography>
            </div>
        </div>
    )
}

Account.defaultProps = {
    address : "0x3ea44e564d176c46ae29c549055012159494ee48",
    balance : "100000",
};
