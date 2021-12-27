import React, {useEffect, useState} from 'react';
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {getUserToken, setUserToken} from "../../../lib/user";
import {apiUrl} from "../../../lib/config";
import {makeStyles} from "@material-ui/core/styles";
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
export default function InviteUser(props) {
    const classes = useStyles();

    const [userData, setUserData] = useState({
        email: '',
        role: 3,
        firstName: '',
        lastName: '',
    })
    const inviteUser = async (e) => {
        e.preventDefault();

        const data = {
            ...userData
        };
        const response = await fetch(`${apiUrl}/api/v1/user/invite`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': getUserToken()

            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        console.log(result)

    };
    const handleUserData = (event) => {
        const {name, value} = event.target;
        const newData = {...userData};
        newData[name] = value
        setUserData(newData)
    }
    return (
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form onSubmit={inviteUser} className={classes.form}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={userData.email}
                    onChange={handleUserData}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="firstName"
                    name="firstName"
                    autoComplete="firstName"
                    autoFocus
                    value={userData.firstName}
                    onChange={handleUserData}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="lastName"
                    name="lastName"
                    autoComplete="lastName"
                    autoFocus
                    value={userData.lastName}
                    onChange={handleUserData}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                  Invite
                </Button>

            </form>
        </div>
    )
}

