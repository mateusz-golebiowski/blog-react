import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = makeStyles(theme => ({
        embed: {
            border: 0,
            height: '100%',
            left: 0,
            position: 'absolute',
            top: 0,
            width: '100%',
        },
        embedContainer: {
            position: 'relative',
            maxWidth: '100%',
            paddingBottom: '56.25%',
            overflow: 'hidden',
        },
        embedDiv: {
            margin: 'auto',
            textAlign: 'left',
            width: '50%',
            [theme.breakpoints.down('md')]: {
                width: '100%',
            }
        }
    })
);

const EmbedObject = (props) => {
    const classes = styles();
    console.log(props.caption);
    return (
        <div className={classes.embedDiv}>
            <Typography variant={'h5'} component={'span'}>{props.caption}</Typography>
            <Typography className={classes.embedContainer} paragraph={true} variant="body1" component="p">
                <iframe title={props.title} className={classes.embed} src={props.src} allowFullScreen={true}/>
            </Typography>
        </div>
    );
};
export default EmbedObject;
