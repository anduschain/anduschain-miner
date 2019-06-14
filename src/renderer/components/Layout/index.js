import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display : 'flex',
        flexGrow: 1,
        flexDirection :'row',
        overflow : 'hidden',
    },
    left : {

    },
    right : {

    }
}));


export default function Layout(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.left}>
                {props.Left}
            </div>
            <div className={classes.right}>
                {props.Right}
            </div>
        </div>
    );
}


Layout.defaultProps = {
    Left : (<div>LeftLeftLeftLeftLeftLeft</div>),
    Right : (<div>RightRightRightRightRight</div>)
}
