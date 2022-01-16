import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {NavLink, useHistory} from "react-router-dom";

import {signOut, getUserId, getUserToken, isUserSignedIn, getTokenDecoded} from '../../lib/user';

import {FormattedMessage, useIntl} from "react-intl";
import useSWR from "swr";
import {apiUrl, fetcher, userFetcher} from "../../lib/config";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {LanguageContext} from "../../contexts/Languages";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        fontWeight: 'bold'
    },
    root: {
        flexGrow: 1,
    },
    appbar: {
        zIndex: theme.zIndex.drawer + 1
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    btnContainer: {
        display:'flex',
        width: 'calc(100% - 120px)'
    },
    language: {
        width: '120px',
    }
}));



export default function BlogAppBar(props) {
    const intl = useIntl();
    let history = useHistory();

    const classes = useStyles();
    const handleSignOut = () => {
        handleCloseMenu();
        signOut();
        history.push('/')
        props.setUserToken('');
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const [initialsState, setInitialsState] = useState('');
    const { data: languagesData, error } = useSWR(`${apiUrl}/api/v1/language`, userFetcher)
    const [ state, dispatch ] = React.useContext(LanguageContext)
    const handleLanguageChange = (event) => {
        const value = event.target.value;
        dispatch({ type: "setAppLanguage", value })
        localStorage.setItem('language', value)
    }
    useEffect(() => {
        const language = localStorage.getItem('language') || 'en';
        dispatch({ type: "setAppLanguage", value: language })

    }, [])
    useEffect(() => {
        if(isUserSignedIn()) {
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
                        if(data.data.firstName === null || data.data.lastName === null) {
                            setInitialsState(data.data.email[0].toUpperCase());
                        } else {
                            const initials = `${data.data.firstName[0]}${data.data.lastName[0]}`.toUpperCase();
                            setInitialsState(initials);
                        }
                    }

                });

            const data = getTokenDecoded()
            console.log(data)
        }

    }, [props.userToken]);

    const loginButton = () => {
        if (props.userToken !== '') {
            return null;
        } else {
            return (
                <NavLink to="/signIn" activeClassName="active">
                    <Button color="secondary" className={classes.button}>
                        {intl.formatMessage({ id: 'app.appbar.login' })}
                    </Button>
                </NavLink>
            );
        }

    };

    const addNewPostButton = () => {
        if(props.userToken !== '' && getTokenDecoded().role.id === '3'){
            return (
                <NavLink to="/post" exact activeClassName="active">
                    <Button color="secondary" className={classes.button}>
                        {intl.formatMessage({ id: 'app.appbar.add' })}
                    </Button>
                </NavLink>
            )
        } else {
            return null;
        }
    };

    const adminPanel = () => {
        if(props.userToken !== '' && getTokenDecoded().role.id === '1'){
            return (
                <NavLink to="/admin" exact activeClassName="active">
                    <Button color="secondary" className={classes.button}>
                        <FormattedMessage
                            id="app.admin.dashboard"
                        />
                    </Button>
                </NavLink>
            )
        } else {
            return null;
        }
    };
    const handleClickMenu = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const showMenuButton = () => {
        if(props.userToken !== ''){
            return (
                <IconButton edge="start" className={classes.menuButton} onClick={handleClickMenu} color="inherit" aria-label="menu">
                    <Avatar>{initialsState}</Avatar>
                </IconButton>
            )
        } else {
            return null;
        }
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed"  className={classes.appbar}>
                    <Toolbar>
                        {showMenuButton()}
                        <NavLink to="/" exact activeClassName="active">
                            <Button color="secondary" className={classes.button}>
                                {intl.formatMessage({ id: 'app.appbar.main' })}
                            </Button>
                        </NavLink>
                        <div className={classes.btnContainer}>
                            {loginButton()}
                            {addNewPostButton()}
                            {adminPanel()}
                        </div>
                        <div className={classes.language}>
                            <FormControl fullWidth>
                                <InputLabel id="role">{intl.formatMessage({ id: 'app.appbar.language' })}</InputLabel>
                                <Select
                                    labelId="language"
                                    id="language"
                                    value={state.language}
                                    label="Language"
                                    name="language"
                                    onChange={handleLanguageChange}
                                >
                                    {languagesData && languagesData.map((item) => (
                                        <MenuItem key={item.id} value={item.code}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                    </Toolbar>
                </AppBar>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                >
                    <NavLink className={classes.link} to="/profile" exact activeClassName="active">
                        <MenuItem onClick={handleCloseMenu}>{intl.formatMessage({ id: 'app.appbar.myProfile' })}</MenuItem>
                    </NavLink>
                    <MenuItem onClick={handleSignOut}>{intl.formatMessage({ id: 'app.appbar.logout' })}</MenuItem>

                </Menu>

            <Toolbar></Toolbar>
        </div>
    );
}