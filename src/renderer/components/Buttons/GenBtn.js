import React from 'react';
import {Button, makeStyles} from "@material-ui/core";
import {COLOR} from "../../constants";

const useStyles = makeStyles(theme => ({
    button: props => ({
        margin: theme.spacing(3),
        borderRadius: "25px",
        containedPrimary : props.isCancel ? COLOR.gray : COLOR.blue,
        backgroundColor : props.isCancel ? COLOR.gray : COLOR.blue,
    }),
}));

export default function GenBtn(props) {
    const classes = useStyles(props);

    return (
        <Button variant="contained" color="primary" className={classes.button} onClick={props.onPress}>{props.title}</Button>
    )
}

GenBtn.defaultProps = {
    isCancel : false,
    title : "gen btn",
    onPress : () => console.log('btn is pressed'),
};
