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
import Accounts from "./Accounts/Accounts";
import Languages from "./Languages/Languages";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginLeft: drawerWidth
    },
}));



export default function Dashboard(props) {
    let history = useHistory();
    const classes = useStyles();
    const intl = useIntl();
    const [page, setPage] = useState('/admin')
    history.listen((location, action) => {
        // location is an object like window.location
        console.log(action, location.pathname, location.state)
        setPage(location.pathname)
    });
    const moveToAccounts = () => {
        history.push('/admin/accounts')
    }
    const moveToLanguages = () => {
        history.push('/admin/languages')
    }

    return (
        <>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>

                        <ListItem button onClick={moveToAccounts}>
                            <ListItemIcon><MailIcon /></ListItemIcon>
                            <ListItemText primary={intl.formatMessage({ id: 'app.dashboard.accounts' })} />
                        </ListItem>
                        <ListItem button onClick={moveToLanguages}>
                            <ListItemIcon><MailIcon /></ListItemIcon>
                            <ListItemText primary={intl.formatMessage({ id: 'app.dashboard.languages' })} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
            <div className={classes.content}>
                {page === '/admin' && <div>d</div>}
                {page === '/admin/accounts' && <Accounts/>}
                {page === '/admin/languages' && <Languages/>}
            </div>

        </>
    );
}