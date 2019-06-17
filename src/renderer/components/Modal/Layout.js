import React from 'react';
import {Dialog, makeStyles, Typography} from '@material-ui/core';
import {COLOR} from "../../constants";

const useStyles = makeStyles(theme => ({
    root : {
        display : 'flex',
        backgroundColor : COLOR.darkGray,
        alignItems: "center",
        flexDirection :'column',
        padding : "20px",
    },
    white : {
        color : COLOR.white,
    },
    body : {
        display : 'flex',
        flexDirection :'column',
        alignItems: "center",
        paddingTop : '30px',
        paddingLeft : '40px',
        paddingRight : '40px',
    },
    subtitle : {
        color : COLOR.gray,
    }
}));

export default function Layout(props) {

    const classes = useStyles();

    return(
        <Dialog
            aria-labelledby="customized-dialog-title"
            open={props.open}>
            <div className={classes.root}>
                <Typography className={classes.white} variant="h6">{props.title}</Typography>
                <Typography className={classes.subtitle} variant="caption">{props.subtitle}</Typography>
                <div className={classes.body}>
                    {props.children}
                </div>
            </div>
        </Dialog>
    )
}


Layout.defaultProps = {
    open : true,
    subtitle : "consectetur adipisicing elit",
    title : "modal",
};
