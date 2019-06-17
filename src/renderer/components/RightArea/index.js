import React from 'react';
import {makeStyles, Typography, GridList, GridListTile} from "@material-ui/core";
import {COLOR} from "../../constants";
import Daonbase from '../Daonbase';
import Account from '../Account';

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
        paddingBottom : '100px',
    },
    innerContainer : {
        paddingTop : '30px',
        paddingLeft : '40px',
        paddingRight : '40px',
    },
    title : {
        color : COLOR.white,
        marginTop : '20px',
        marginBottom : '20px',
    },
    accountContainer : {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
}));


export default function RightArea(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={classes.innerContainer}>
                    <Typography className={classes.title} variant="h6">Daonbase</Typography>
                    <Daonbase />
                    <Typography className={classes.title} variant="h6">Accounts</Typography>
                    <div className={classes.accountContainer}>
                        <Account />
                        <Account />
                        <Account />
                        <Account />
                        <Account />
                        <Account />
                        <Account />
                        <Account />
                        <Account />
                    </div>
                </div>
            </div>
        </div>
    )
}
