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
export default function AddLanguage(props) {
    const classes = useStyles();
    const [languageData, setLanguageData] = useState({
        name: '',
        code: ''
    })
    const addLanguage = async (e) => {
        e.preventDefault();

        const data = {
            ...languageData
        };
        const response = await fetch(`${apiUrl}/api/v1/language`, {
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
    const handleLanguageData = (event) => {
        const {name, value} = event.target;
        const newData = {...languageData};
        newData[name] = value
        setLanguageData(newData)
    }
    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Add
            </Typography>
            <form onSubmit={addLanguage} className={classes.form}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={languageData.name}
                    onChange={handleLanguageData}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="code"
                    label="Code"
                    name="code"
                    autoComplete="code"
                    autoFocus
                    value={languageData.code}
                    onChange={handleLanguageData}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                  Add
                </Button>

            </form>
        </div>
    )
}

