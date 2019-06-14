import React from 'react';
import {makeStyles} from "@material-ui/core";
import {COLOR} from "../../constants";

const useStyles = makeStyles(theme => ({
    root: {
        display : 'flex',
        flexDirection :'column',
        flexGrow: 1,
        backgroundColor : COLOR.black,
        width : '220px',
    },
}));


export default function LeftArea(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {props.children}
        </div>
    )
}
