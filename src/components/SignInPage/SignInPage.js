import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {getTokenDecoded, getUserToken, isUserSignedIn, setUserToken} from "../../lib/user";
import {Redirect} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import {useIntl} from "react-intl";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        backgroundColor: '#ffffff',


    }
}));



const SignInPage = (props) => {
    const intl = useIntl();

    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleShowSnackbar = (msg, variant) => {
        enqueueSnackbar(msg, {variant});
    };

    const SignIn = (e) => {
        const data = {
            email,
            password
        };
        fetch(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/api/v1/user/signIn`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            return response.json();
        }).then(function(response) {
            if(response.auth) {
                handleShowSnackbar(intl.formatMessage({ id: 'app.login.welcome' }, {email:data.email}), 'success');
                setUserToken(response.token, remember);
                props.setUserToken(response.token);
            } else {
                handleShowSnackbar(intl.formatMessage({ id: 'app.login.wrong' }), 'error');
            }
        });
        e.preventDefault();
    };
    const handleChangeUsername = (event) => {
        setEmail(event.target.value);
    };
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleChangeRemember = (event) => {
        setRemember(event.target.checked);
    };

    const isSignedIn = () => {
        if(isUserSignedIn()) {
            const role = getTokenDecoded().role.id
            if (role === '1') {
                return (
                    <Redirect to={'/admin'}/>
                )
            }
            return (
                <Redirect to={'/'}/>
            )

        } else {
            return null;
        }
    };


    return (
        <Container className={classes.root} component="main" maxWidth="xs">
            <CssBaseline />
            {isSignedIn()}
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {intl.formatMessage({ id: 'app.appbar.login' })}
                </Typography>
                <form onSubmit={SignIn} className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={intl.formatMessage({ id: 'app.login.email' })}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={handleChangeUsername}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={intl.formatMessage({ id: 'app.login.password' })}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handleChangePassword}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={remember} onChange={handleChangeRemember} value="remember" color="primary" />}
                        label={intl.formatMessage({ id: 'app.login.remember' })}

                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {intl.formatMessage({ id: 'app.appbar.login' })}
                    </Button>
                </form>
            </div>

        </Container>
    );
};
export default SignInPage;