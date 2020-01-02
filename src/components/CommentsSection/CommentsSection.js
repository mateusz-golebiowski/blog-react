import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Comment from '../Comment/Comment';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InsertCommentIcon from '@material-ui/icons/InsertComment';

const styles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        marginLeft: '10vw',
        marginRight: '10vw',
        textAlign: 'left'
    },
    inputs: {
        width: '100%',
        margin: theme.spacing(1)
    },
    icon: {
        margin: 'auto',
        textAlign: 'center'
    }

}));

const CommentsSection = (props) => {
    const classes = styles();

    return (
        <div className={classes.root}>
            <form>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            className={classes.inputs}
                            label="Użytkownik"
                            placeholder="Użytkownik"
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            className={classes.inputs}
                            label="Email"
                            placeholder="Email"
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.inputs}
                            label="Komentarz"
                            placeholder="Komentarz"
                            multiline
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.icon}><Button type={'submit'}><InsertCommentIcon  fontSize={'large'}/></Button></div>
                    </Grid>
                </Grid>
            </form>
            <Typography variant={"h3"}>Komentarze</Typography>

            <Comment author={'user'} date={'01.01.2019'} content={'dfgfdgdfgfdgdf'}/>
        </div>
    )
};

export default CommentsSection