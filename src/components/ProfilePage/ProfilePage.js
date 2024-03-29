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
import {useIntl} from "react-intl";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
}));

const ProfilePage = (props) => {
    const intl = useIntl();

    const classes = useStyles();
    const [firstnameState, setFirstnameState] = useState('');
    const [lastnameState, setLastnameState] = useState('');
    const [emailState, setEmailState] = useState('');
    const [oldPasswordState, setOldPasswordState] = useState('');
    const [newPasswordState, setNewPasswordState] = useState('');
    const [repeatPasswordState, setRepeatPasswordState] = useState('');

    const [newPasswordHelperState, setNewPasswordHelperState] = useState('');
    const [oldPasswordHelperState, setOldPasswordHelperState] = useState('');

    const { enqueueSnackbar } = useSnackbar();


    const handleShowSnackbar = (msg, variant) => {
        enqueueSnackbar(msg, {variant});
    };

    const validateEmail = () =>{
        if(emailState.length === 0)
            return false;
        //eslint-disable-next-line
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !re.test(emailState.toLowerCase());
    };
    const formFields = {
        firstName: firstnameState,
        lastName: lastnameState,
        email: emailState
    };
    const handleFormSubmit = e => {
        e.preventDefault();
        const data = {};
        let correct = true;
        for (let item in formFields) {
            if (formFields[item].length > 0) {
                data[item] = formFields[item];
            }
        }
        if (validateEmail()) {
            correct = false;

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
                    handleShowSnackbar(intl.formatMessage({ id: 'app.profile.success' }), 'success');
                } else {
                    handleShowSnackbar(`Błąd zapisu profilu. Powód: ${data.message}`, 'error');
                }
            });
        } else {

            handleShowSnackbar(intl.formatMessage({ id: 'app.profile.failSave' }), 'error');
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
                    setFirstnameState(data.data.firstName ? data.data.firstName : '');
                    setLastnameState(data.data.lastName ? data.data.lastName : '');
                    setEmailState(data.data.email ? data.data.email : '');
                } else {
                    props.history.push(`/404`);
                }

            });
    }, [props.history]);

    return (
        <>
            {isSignedIn()}
            <Paper className={classes.root}>
                <Typography variant="h6" gutterBottom>
                    {intl.formatMessage({ id: 'app.profile.userData' })}
                </Typography>
                <form onSubmit={handleFormSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography align={'left'} variant="h6" gutterBottom>
                                {intl.formatMessage({ id: 'app.profile.personal' })}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={firstnameState}
                                id="firstName"
                                name="firstName"
                                label={intl.formatMessage({ id: 'app.profile.name' })}
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
                                label={intl.formatMessage({ id: 'app.profile.lastName' })}
                                fullWidth
                                autoComplete="lname"
                                onChange={e => {setLastnameState(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align={'left'} variant="h6" gutterBottom>
                                {intl.formatMessage({ id: 'app.profile.dataChange' })}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                value={emailState}
                                id="email"
                                name="email"
                                label={intl.formatMessage({ id: 'app.login.email' })}
                                fullWidth
                                error={validateEmail()}
                                autoComplete="email"
                                onChange={e => {setEmailState(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align={'left'} variant="h6" gutterBottom>
                                {intl.formatMessage({ id: 'app.profile.passwordChange' })}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                value={oldPasswordState}
                                fullWidth
                                name="oldPassword"
                                label={intl.formatMessage({ id: 'app.profile.oldPassword' })}
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
                                label={intl.formatMessage({ id: 'app.profile.newPassword' })}
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
                                label={intl.formatMessage({ id: 'app.profile.repeat' })}
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
                                {intl.formatMessage({ id: 'app.post.save' })}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </>
    );
};
export default ProfilePage;