import React from 'react';
import {makeStyles} from "@material-ui/core";
import {COLOR} from "../../constants";

const useStyles = makeStyles(theme => ({
    root: {
        display : 'flex',
        backgroundColor : COLOR.darkGray,
        width : '680px',
        height : '578px',
    },
    container : {
        width : '100%',
        height : '100%',
        flexDirection :'column',
        overflow: 'scroll',
        '&::-webkit-scrollbar' : {
            display: "none",
        },
        '&::-webkit-scrollbar-thumb' : {
            display: "none",
        },
    }
}));


export default function RightArea(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                {props.children}
            </div>
        </div>
    )
}
