import React, {useEffect, useState} from 'react';

import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List'
import {makeStyles} from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';

import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useIntl, FormattedMessage } from 'react-intl';
import { useHistory } from "react-router-dom";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));



export default function Accounts(props) {
    const classes = useStyles();
    const intl = useIntl();


    return (
        <>
            <main className={classes.content}>
                <Toolbar />
                <Typography paragraph>
                   Accounts
                </Typography>
                <Typography paragraph>
                  Accountsyy
                </Typography>
            </main>
        </>
    );
}