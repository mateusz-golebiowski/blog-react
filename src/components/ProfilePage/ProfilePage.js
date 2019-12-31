import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {getUserId, getUserToken, isUserSignedIn} from '../../lib/user';
import {Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
}));

const ProfilePage = (props) => {
    const classes = useStyles();
    const [usernameState, setUsernameState] = useState('');
    const [firstnameState, setFirstnameState] = useState('');
    const [lastnameState, setLastnameState] = useState('');
    const [emailState, setEmailState] = useState('');
    const [oldPasswordState, setOldPasswordState] = useState('');
    const [newPasswordState, setNewPasswordState] = useState('');
    const [repeatPasswordState, setRepeatPasswordState] = useState('');

    const [newPasswordHelperState, setNewPasswordHelperState] = useState('');
    const [oldPasswordHelperState, setOldPasswordHelperState] = useState('');
    const [usernameHelperState, setUsernameHelperState] = useState('');

    const { enqueueSnackbar } = useSnackbar();


    const handleShowSnackbar = (msg, variant) => {
        enqueueSnackbar(msg, {variant});
    };

    const formFields = {
        username: usernameState,
        firstname: firstnameState,
        lastname: lastnameState,
        email: emailState
    };
    const handleFormSubmit = e => {
        e.preventDefault();
        const data = {};
        let correct = true;
        for (let item in formFields) {
            if (formFields[item].length > 0 ){
                data[item] = formFields[item];
            }

            if(newPasswordState.length > 0 || repeatPasswordState.length > 0) {
                if (newPasswordState === repeatPasswordState && oldPasswordState.length > 0) {
                    data.oldPassword = oldPasswordState;
                    data.newPassword = newPasswordState;
                } else {
                    correct = false;
                    if (newPasswordState !== repeatPasswordState)
                        setNewPasswordHelperState('Hasła powinny być takie same');
                    if (oldPasswordState.length === 0)
                        setOldPasswordHelperState('Żeby zmienić hasło należy podać aktualne hasło');
                }
            }

        }
        if (Object.keys(data).length > 0 && correct) {
            fetch(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/api/v1/user/updateMyProfile`, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': getUserToken()
                },
                body: JSON.stringify(data)
            }).then(function(response) {
                return response.json();
            }).then(function(data) {
                if(data.success) {
                    setRepeatPasswordState('');
                    setNewPasswordState('');
                    setOldPasswordState('');
                    setNewPasswordHelperState('');
                    setOldPasswordHelperState('');
                    setUsernameHelperState('');
                    handleShowSnackbar('Profil został zaktualizowany', 'success');
                } else {

                    data.fields.forEach(item => {
                        console.log(item);
                        if(item.fieldName === 'username') {
                            setUsernameHelperState('Nazwa użytkownika jest już zajęta');
                        }
                    });
                    handleShowSnackbar(`Błąd zapisu profilu. Powód: ${data.message}`, 'error');
                }
            });
        } else {
            handleShowSnackbar(`Nie udało się zapisać danych`, 'error');
        }


    };

    const isSignedIn = () => {
        if(isUserSignedIn()) {
            return null;
        } else {
            return (
                <Redirect to={'/'}/>
            )
        }
    };


    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/api/v1/user/getData/${getUserId()}`,{
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'authorization': getUserToken()
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log(data);
                    setUsernameState(data.data.username);
                    setFirstnameState(data.data.firstname ? data.data.firstname : '');
                    setLastnameState(data.data.lastname ? data.data.lastname : '');
                    setEmailState(data.data.email ? data.data.email : '');
                } else {
                    props.history.push(`/404`);
                }

            });
        console.log('mounted');
    }, [props.history]);

    return (
        <>
            {isSignedIn()}
            <Paper className={classes.root}>
                <Typography variant="h6" gutterBottom>
                    Dane Użytkownika
                </Typography>
                <form onSubmit={handleFormSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography align={'left'} variant="h6" gutterBottom>
                                Dane podstawowe
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={firstnameState}
                                id="firstName"
                                name="firstName"
                                label="Imię"
                                fullWidth
                                autoComplete="fname"
                                onChange={e => {setFirstnameState(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={lastnameState}
                                id="lastName"
                                name="lastName"
                                label="Nazwisko"
                                fullWidth
                                autoComplete="lname"
                                onChange={e => {setLastnameState(e.target.value)}}
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
                                value={usernameState}
                                id="username"
                                name="username"
                                label="Nazwa użytkownika"
                                fullWidth
                                autoComplete="username"
                                onChange={e => {
                                    setUsernameHelperState('');
                                    setUsernameState(e.target.value)
                                }}
                                helperText={usernameHelperState}
                                error={usernameHelperState.length>0}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                value={emailState}
                                id="email"
                                name="email"
                                label="Email"
                                fullWidth
                                autoComplete="email"
                                onChange={e => {setEmailState(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align={'left'} variant="h6" gutterBottom>
                                Zmiana hasła
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                value={oldPasswordState}
                                fullWidth
                                name="oldPassword"
                                label="Stare Hasło"
                                type="password"
                                id="oldPassword"
                                autoComplete="password"
                                onChange={e => {
                                    setOldPasswordHelperState('');
                                    setOldPasswordState(e.target.value);
                                }}
                                helperText={oldPasswordHelperState}
                                error={oldPasswordHelperState.length>0}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={newPasswordState}
                                fullWidth
                                name="password"
                                label="Nowe Hasło"
                                type="password"
                                id="password"
                                autoComplete="password"
                                onChange={e => {
                                    setNewPasswordHelperState('');
                                    setNewPasswordState(e.target.value);
                                }}
                                helperText={newPasswordHelperState}
                                error={newPasswordHelperState.length>0}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={repeatPasswordState}
                                fullWidth
                                name="repeatPassword"
                                label="Powtórz Hasło"
                                type="password"
                                id="repeatPassword"
                                autoComplete="password"
                                onChange={e => {
                                    setNewPasswordHelperState('');
                                    setRepeatPasswordState(e.target.value);
                                }}
                                helperText={newPasswordHelperState}
                                error={newPasswordHelperState.length>0}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button
                                type={"submit"}
                                fullWidth
                                variant={"contained"}
                                color={"primary"}
                            >
                                Zapisz
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </>
    );
};
export default ProfilePage;