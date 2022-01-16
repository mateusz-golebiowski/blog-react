import React, {useState} from 'react';
import List from '@material-ui/core/List'
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TranslateIcon from '@material-ui/icons/Translate';
import CategoryIcon from '@material-ui/icons/Category';
import { useIntl } from 'react-intl';
import { useHistory } from "react-router-dom";
import Accounts from "./Accounts/Accounts";
import Languages from "./Languages/Languages";
import Categories from "./Categories/Categories";

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
    const moveToCategories = () => {
        history.push('/admin/categories')
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
                            <ListItemIcon><AccountCircle /></ListItemIcon>
                            <ListItemText primary={intl.formatMessage({ id: 'app.dashboard.accounts' })} />
                        </ListItem>
                        <ListItem button onClick={moveToLanguages}>
                            <ListItemIcon><TranslateIcon /></ListItemIcon>
                            <ListItemText primary={intl.formatMessage({ id: 'app.dashboard.languages' })} />
                        </ListItem>
                        <ListItem button onClick={moveToCategories}>
                            <ListItemIcon><CategoryIcon /></ListItemIcon>
                            <ListItemText primary={intl.formatMessage({ id: 'app.dashboard.categories' })} />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <div className={classes.content}>
                {page === '/admin' && <Accounts/>}
                {page === '/admin/accounts' && <Accounts/>}
                {page === '/admin/languages' && <Languages/>}
                {page === '/admin/categories' && <Categories/>}
            </div>

        </>
    );
}