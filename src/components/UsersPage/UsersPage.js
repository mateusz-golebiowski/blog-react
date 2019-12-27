import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {isUserSignedIn, setUserToken} from "../../lib/user";
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles(theme => ({

}));



const UsersPage = (props) => {
    const classes = useStyles();

    const isSignedIn = () => {
        if(isUserSignedIn()) {
            return null;
        } else {
            return (
                <Redirect to={'/'}/>
            )
        }
    };

    console.log(localStorage.getItem('ll'));

    return (
        <>
            {isSignedIn()}
            User test
        </>
    );
};
export default UsersPage;