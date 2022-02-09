import React, {useEffect, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {getUserToken} from "../../../lib/user";
import {apiUrl, fetcher} from "../../../lib/config";
import {makeStyles} from "@material-ui/core/styles";
import useSWR from "swr";
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
export default function AddLanguage({editData, onEdit}) {
    const classes = useStyles();
    const intl = useIntl();

    const [languageData, setLanguageData] = useState({
        name: '',
        code: ''
    })
    const { mutate } = useSWR(`${apiUrl}/api/v1/language`, fetcher)
    useEffect(()=> {
        if (editData !== null) {
            setLanguageData({
                name: editData.name,
                code: editData.code,
            })
        }
    }, [editData])
    const addLanguage = async (e) => {
        e.preventDefault();
        const method = editData !== null ? 'put' : 'post'
        const url = editData !== null ?  editData.id : ''

        const data = {
            ...languageData
        };
        const response = await fetch(`${apiUrl}/api/v1/language/${url}`, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': getUserToken()
            },
            body: JSON.stringify(data)
        })
        await response.json()
        if (editData !== null) {
            onEdit();
        }
        setLanguageData({
            name: '',
            code: ''
        })
        await mutate();
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
                {editData === null ? intl.formatMessage({ id: 'app.admin.add' }) : intl.formatMessage({ id: 'app.admin.edit' })}
            </Typography>
            <form onSubmit={addLanguage} className={classes.form}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label={intl.formatMessage({ id: 'app.admin.name' })}
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
                    label={intl.formatMessage({ id: 'app.admin.code' })}
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
                    {editData === null ? intl.formatMessage({ id: 'app.admin.add' }) : intl.formatMessage({ id: 'app.admin.edit' })}
                </Button>

            </form>
        </div>
    )
}

