import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import {getTokenDecoded, isUserSignedIn} from '../../lib/user';

const styles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    content: {
        marginTop: theme.spacing(2),
    },
    deleteButton: {
        textAlign: 'right'
    }
}));

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth() >= 9 ?  date.getMonth()+1 : `0${date.getMonth()+1}`;

    return `${day}.${month}.${year}`;
};

const isModeratorOrAdmin = () => {
  return getTokenDecoded().role.id === '2' || getTokenDecoded().role.id === '1'
}

const Comment = (props) => {
    const classes = styles();
    return (
        <Paper className={classes.root}>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Typography variant={'h6'}> {props.author}</Typography>
                </Grid>
                {isUserSignedIn()  && isModeratorOrAdmin()? (
                    <Grid item xs={12} sm={6}>
                        <div className={classes.deleteButton}><Button onClick={ () => {props.onDelete(props.id)}}><DeleteForeverIcon /></Button></div>
                    </Grid>
                ) : null}
                <Grid item xs={12}>
                    <Typography variant={'caption'}> {formatDate(props.date)}</Typography>
                </Grid>
            </Grid>
            <Divider />
            <div className={classes.content} ><Typography style={{whiteSpace: 'pre-line'}} variant={'body1'}> {props.content}</Typography></div>

        </Paper>
    )
};

export default Comment