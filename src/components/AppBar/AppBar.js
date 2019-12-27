import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {NavLink} from "react-router-dom";

import {signOut} from "../../lib/user";


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        fontWeight: 'bold'
    },
    root: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
}));



export default function BlogAppBar(props) {
    const classes = useStyles();
    const handleSignOut = () => {
        handleCloseMenu();
        signOut();
        props.setUserToken('');
    };
    const [anchorEl, setAnchorEl] = useState(null);


    const loginButton = () => {
        if (props.userToken !== '') {
            return null;
        } else {
            return (
                <NavLink to="/signIn" activeClassName="active">
                    <Button color="secondary" className={classes.button}>
                        Zaloguj się
                    </Button>
                </NavLink>
            );
        }

    };

    const addNewPostButton = () => {
        if(props.userToken !== ''){
            return (
                <NavLink to="/post" exact activeClassName="active">
                    <Button color="secondary" className={classes.button}>
                        Dodaj wpis
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
                    <Avatar>d</Avatar>
                </IconButton>
            )
        } else {
            return null;
        }
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" >
                    <Toolbar>
                        {showMenuButton()}
                        <NavLink to="/" exact activeClassName="active">
                            <Button color="secondary" className={classes.button}>
                                Strona główna
                            </Button>
                        </NavLink>
                        {loginButton()}
                        {addNewPostButton()}
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
                        <MenuItem onClick={handleCloseMenu}>Mój profil</MenuItem>
                    </NavLink>
                    <NavLink className={classes.link} to="/users" exact activeClassName="active">
                        <MenuItem onClick={handleCloseMenu}>Użytkownicy</MenuItem>
                    </NavLink>
                    <MenuItem onClick={handleSignOut}>Wyloguj się</MenuItem>
                </Menu>
            <Toolbar></Toolbar>
        </div>
    );
}