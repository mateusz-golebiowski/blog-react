import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {isUserSignedIn, setUserToken} from "../../lib/user";
import {Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
}));



const ProfilePage = (props) => {
    const classes = useStyles();

    const isSignedIn = () => {
        if(isUserSignedIn()) {
            return null;
        } else {
            return (
                <Redirect to={'/'}/>
            )
        }
    };

    console.log(localStorage.getItem('ll'));

    return (
        <>
            {isSignedIn()}
            <Paper className={classes.root}>
                <Typography variant="h6" gutterBottom>
                    Dane Użytkownika
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography align={'left'} variant="h6" gutterBottom>
                            Dane podstawowe
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="Imię"
                            fullWidth
                            autoComplete="fname"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Nazwisko"
                            fullWidth
                            autoComplete="lname"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography align={'left'} variant="h6" gutterBottom>
                            Zmiana nazwy użytkownika i adresu email
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="username"
                            name="username"
                            label="Nazwa użytkownika"
                            fullWidth
                            autoComplete="username"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography align={'left'} variant="h6" gutterBottom>
                            Zmiana hasła
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Hasło"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            name="repeatPassword"
                            label="Powtórz Hasło"
                            type="password"
                            id="repeatPassword"
                            autoComplete="current-password"
                        />
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};
export default ProfilePage;