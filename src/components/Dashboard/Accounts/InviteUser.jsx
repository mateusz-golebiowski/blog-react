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
import {apiUrl, fetcher} from "../../../lib/config";
import {makeStyles} from "@material-ui/core/styles";
import useSWR from "swr";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useSnackbar} from "notistack";

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
    },
    menuitem: {
        textAlign: 'left',
    }
}));
export default function InviteUser(props) {
    const classes = useStyles();
    const { data: rolesData, error,  } = useSWR(`${apiUrl}/api/v1/user/getRoles`, fetcher)
    const { data: users, mutate } = useSWR(`${apiUrl}/api/v1/user/getAllData`, fetcher)
    const { enqueueSnackbar } = useSnackbar();

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
        const resp = await response.json()
        if (resp.error) {
            enqueueSnackbar(resp.error, {variant: 'error'});

        } else {
            setUserData({
                email: '',
                role: 3,
                firstName: '',
                lastName: '',
            })
            await mutate()
        }

    };
    const handleUserData = (event) => {
        const {name, value} = event.target;
        const newData = {...userData};
        newData[name] = value
        setUserData(newData)
    }
    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Invite
            </Typography>
            <form onSubmit={inviteUser} className={classes.form}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    type={'email'}
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
                <FormControl fullWidth>
                    <InputLabel id="role">Role</InputLabel>
                    <Select
                        labelId="role"
                        id="role"
                        value={userData.role}
                        label="Role"
                        name="role"
                        className={classes.menuitem}
                        onChange={handleUserData}
                    >
                        {rolesData && rolesData.map((item) => (
                            <MenuItem className={classes.menuitem} key={item.id} value={item.id}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

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

