import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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