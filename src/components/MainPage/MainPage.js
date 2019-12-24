import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Grid from '@material-ui/core/Grid';
import { fade, makeStyles } from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Pagination from '../Pagination/Pagination';

const styles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
            padding: theme.spacing(5),
        },
        card: {

            display: 'flex',
        },
        details: {
            display: 'flex',
            width: '100%',
            padding: theme.spacing(5),
            flexDirection: 'column',
        },
        content: {
            textAlign: 'left',
            flex: '1 0 auto',

        },
        img: {
            minWidth: 555,
            minHeight: 255,
        },
        link: {
            textDecoration: 'none',
            color: theme.palette.primary.main
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
            width: '60vw',
        },
        paper: {
            textAlign: 'left',
            backgroundColor: '#DEDEDE'
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },

            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
    })
);

const PostCard = (props) =>{
    const classes = styles();
    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.img}
                image={props.img}
                title={props.title}
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <NavLink className={classes.link} to={`/post/${props.id}`} exact activeClassName="active">
                        <Typography component="h3" variant="h3">
                            {props.title}
                        </Typography>
                    </NavLink>
                    <Typography variant="body2" component="p">
                        Autor: {props.author}

                    </Typography>
                </CardContent>
                <CardActions>
                    <NavLink to={`/post/${props.id}`} exact activeClassName="active">
                        <Button size="small">Czytaj</Button>
                    </NavLink>
                </CardActions>
            </div>

        </Card>
    );
};

function MainPage(props) {
    const classes = styles();
    const [postsState, setPostsState] = useState([]);
    const [paginationState, setPaginationState] = useState(1);
    const [filterState, setFilterState] = useState('');
    const updateFilter = (e) => {
        setFilterState(e.target.value);
        console.log(e.target.value);
    };

    const updatePage = (page) => {
        props.history.push(`/page/${page}`);
    };
    useEffect(() => {
        const page = props.match.params.page !== undefined ? props.match.params.page : 1;
        fetch(`http://127.0.0.1:4000/api/v1/post/${page}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPaginationState(data.pages);
                setPostsState(data.posts);

            });
        console.log('mounted');
    }, [props.match.params.page]);
    return (
        <div className={classes.root}>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={9}>
                            <Paper className={classes.paper}>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        value={filterState}
                                        onChange={updateFilter}
                                        placeholder="Szukaj…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                            </Paper>

                        </Grid>
                        {
                            postsState.length > 0 ? postsState.map( (it, key) => {
                                return it.title.toLowerCase().includes(filterState.toLowerCase())  ? (<Grid key={key} item xs={12} sm={9}><PostCard author={it.User.username} img={it.img} title={it.title} id={it.id} /></Grid>) : null
                            }) : <Grid item xs={12} sm={9}>Nic tu nie ma</Grid>
                        }

                        <Grid item xs={12} sm={9}>

                            <Pagination page={props.match.params.page !== undefined ? parseInt(props.match.params.page) : 1} end={paginationState} onChangePage={updatePage}/>
                        </Grid>

                    </Grid>
        </div>
    );
}

export default MainPage;
