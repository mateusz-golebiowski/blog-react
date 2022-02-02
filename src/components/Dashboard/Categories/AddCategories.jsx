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
export default function AddCategories({editData, onEdit}) {
    const intl = useIntl();

    const classes = useStyles();
    const { data: languageData } = useSWR(`${apiUrl}/api/v1/language`, fetcher)

    const [categoryData, setCategoryData] = useState({
        name: '',
        languageData: []
    })
    const { mutate } = useSWR(`${apiUrl}/api/v1/category`, fetcher)
    useEffect(()=> {
        if (editData !== null) {
            setCategoryData({
                name: editData.name
            })
        }
    }, [editData])
    const addCategory = async (e) => {
        e.preventDefault();
        const method = editData !== null ? 'put' : 'post'

        const data = {
            ...categoryData
        };
        const url = editData !== null ?  editData.id : ''

        const response = await fetch(`${apiUrl}/api/v1/category/${url}`, {
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
        setCategoryData({
            name: ''
        })
        await mutate()
    };
    const handleCategoryData = (event) => {
        const {name, value} = event.target;
        const newData = {...categoryData};
        newData[name] = value
        setCategoryData(newData)
    }

    const handleLanguageData = (event) => {
        const {name, value} = event.target;

        const newData = {...categoryData};
        const found = categoryData.languageData.findIndex(item => item.code === name);
        if (found !== -1) {
            console.log(value)
            newData.languageData[found] = {code: newData.languageData[found].code, value: value};
        } else {
            newData.languageData.push({code: name, value: value});
        }
        setCategoryData(newData)
    }
    const getValueLang = (code) => {
        if (categoryData.languageData){
            const found = categoryData.languageData.find(item => item.code === code);
            if (found) {
                return found.value;
            }
        }

        return ''
    }
    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Add Category
            </Typography>
            <form onSubmit={addCategory} className={classes.form}>
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
                    value={categoryData.name}
                    onChange={handleCategoryData}
                />
                <Typography component="h4" variant="h6">
                    {intl.formatMessage({ id: 'app.addCategories.languages' })}
                </Typography>
                {languageData && languageData.map((item) => (
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label={item.name}
                        name={item.code}
                        value={getValueLang(item.code)}
                        onChange={handleLanguageData}
                    />
                ))}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                  Add Category
                </Button>

            </form>
        </div>
    )
}

