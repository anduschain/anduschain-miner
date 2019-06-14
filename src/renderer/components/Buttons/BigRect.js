import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { COLOR } from "../../constants";

const useStyles = makeStyles(theme => ({
    root: {
        display : 'flex',
        flexGrow: 1,
        backgroundColor : COLOR.blue,
        height : '220px',
        width : '220px',
    },
}));

export default function BigRect() {
    const classes = useStyles();

    return (
        <div className={classes.root}>

        </div>
    )
}
