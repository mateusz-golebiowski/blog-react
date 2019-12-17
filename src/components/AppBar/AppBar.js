import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import {NavLink} from "react-router-dom";

import {isUserSignedIn, signOut} from "../../lib/user";


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        fontWeight: 'bold'
    },
    input: {
        display: 'none',
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    overlay: {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        width: '100%',
        color: 'black',
    },
    card: {
        position: 'relative',
    },
    title: {
        fontSize: '10vw',
        textAlign: 'center',

    }
}));



export default function BlogAppBar(props) {
    const classes = useStyles();
    const handleSignOut = () => {
      signOut();
      props.setUserToken('');
    };
    const loginButton = () => {
        if (props.userToken !== '') {
            return (
                <Button onClick={handleSignOut} color="secondary" className={classes.button}>
                    Wyloguj się
                </Button>

            );
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

    return (
        <div className={classes.root}>
            <AppBar position="fixed" >
                    <Toolbar>
                        <NavLink to="/" exact activeClassName="active">
                            <Button color="secondary" className={classes.button}>
                                Strona główna
                            </Button>
                        </NavLink>
                        {loginButton()}
                        {addNewPostButton()}
                            <Button color="secondary" className={classes.button}>
                                Kontakt
                            </Button>

                    </Toolbar>
                </AppBar>
            <Toolbar></Toolbar>
        </div>
    );
}