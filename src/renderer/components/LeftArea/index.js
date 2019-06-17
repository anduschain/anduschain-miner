import React from 'react';
import {makeStyles, Typography} from "@material-ui/core";
import {COLOR} from "../../constants";
import {Buttons} from "../index";
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    root: {
        display : 'flex',
        flexDirection :'column',
        flexGrow: 1,
        backgroundColor : COLOR.black,
        width : '220px',
        alignItems : 'center',
        paddingTop : "45px",
    },
    image : {
        width : "80px",
        height : "80px",
    },
    white : {
        color : COLOR.white,
    },
    status : {
        marginTop : '10px',
        marginBottom : '10px',
    },
    statusRect: {
        display : 'flex',
        alignItems: "center",
        justifyContent: "center",
        borderRadius : "19px",
        width: "120px",
        height: "38px",
        border : `solid 1px ${COLOR.blue}`,
        marginBottom : '25px',
    },
    time : {
        marginBottom : '15px',
    },
    blockNumber : {
        marginBottom : '20px',
    },
    blue : {
        color : COLOR.blue,
    }
}));


export default function LeftArea(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img src={require('../../../resources/icon.png')} className={classes.image}/>
            <Typography className={`${classes.status} ${classes.white}`} variant="h6">Status</Typography>
            <div className={classes.statusRect}>
                <Typography variant="button" display="block" className={classes.blue}>
                    {props.status ? "MINING" : "STOP"}
                </Typography>
            </div>
            <Typography className={classes.white} variant="h6">#Block Height</Typography>
            <Typography className={`${classes.white} ${classes.time}`} variant="caption">{`${moment()}`}</Typography>
            <Typography className={`${classes.white} ${classes.blockNumber}`} variant="h6">#100201</Typography>
            <Buttons.BigRect status={props.status} />
        </div>
    )
}

LeftArea.defaultProps = {
    status : false,
}
