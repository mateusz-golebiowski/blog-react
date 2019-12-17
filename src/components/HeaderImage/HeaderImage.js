import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import { fade, makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';

import HeaderLogo from '../../assets/main.jpg';



const useStyles = makeStyles(theme => ({
    media: {
        height: '50vh',
        //paddingTop: '56.25%', // 16:9
    },
    overlay: {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        width: '100%',
        color: 'black',
        backgroundColor: 'rgba(0,0,0,.5);',
    },
    card: {
        position: 'relative',
    },
    title: {
        fontSize: '10vw',
        textAlign: 'center',
        color: theme.palette.secondary.main,

    }
}));



export default function HeaderImage(props) {
    const classes = useStyles();

    return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={props.img}

                />
                <CardContent className={classes.overlay}>
                    <div className={classes.title}>{props.title}</div>
                </CardContent>

            </Card>
    );
}