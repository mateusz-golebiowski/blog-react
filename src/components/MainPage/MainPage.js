import React, {useEffect, useState, useCallback } from 'react';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import useSWR from "swr";
import {apiUrl, userFetcher} from "../../lib/config";
import {LanguageContext} from "../../contexts/Languages";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {useIntl} from "react-intl";

const styles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
            padding: theme.spacing(5),
        },
        card: {
            display: 'flex',
        },
        details: {
            width: '75%',
        },
        content: {
            textAlign: 'left',
            flex: '1 0 auto',

        },
        img: {
            height: 0,
            paddingTop: '56.25%', // 16:9
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
    left: {
            textAlign: 'left'
    }
    })
);

const PostCard = (props) =>{
    const intl = useIntl();

    const classes = styles();
    return (
        <Card className={classes.card}>
            <Grid alignItems="center"  container spacing={3}>
                <Grid item xs={12} sm={5}>
                    <CardMedia
                        className={classes.img}
                        image={props.img}
                        title={props.title}
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <NavLink className={classes.link} to={`/post/${props.id}`} exact activeClassName="active">
                                <Typography component="h3" variant="h3">
                                    {props.title}
                                </Typography>
                            </NavLink>
                            <Typography variant="body2" component="p">
                                {intl.formatMessage({ id: 'app.main.author' })}: {props.author}

                            </Typography>
                        </CardContent>
                        <CardActions>
                            <NavLink to={`/post/${props.id}`} exact activeClassName="active">
                                <Button size="small">
                                    {intl.formatMessage({ id: 'app.main.read' })}
                                </Button>
                            </NavLink>
                        </CardActions>
                    </div>
                </Grid>
            </Grid>



        </Card>
    );
};

function MainPage(props) {
    const intl = useIntl();
    const classes = styles();

    const [filterState, setFilterState] = useState('');
    const [category, setCategory] = useState(0);
    const page = props.match.params.page !== undefined ? props.match.params.page : 1;
    const updateFilter = (e) => {
        setFilterState(e.target.value);
    };
    const [ state ] = React.useContext(LanguageContext)

    const { data: postsData } = useSWR(filterState.trim() === '' ? `${apiUrl}/api/v1/post/getAll/${state.language}/${page}?category=${category}`: `${apiUrl}/api/v1/post/getAll/${state.language}/${page}?category=${category}&title=${filterState.trim()}`, userFetcher)
    const { data: categoriesData } = useSWR(`${apiUrl}/api/v1/category?lang=${state.language}`, userFetcher)

    const updatePage = (page) => {
        props.history.push(`/page/${page}`);
    };
    const handleCategoryChange = (event) => {
        const {value} = event.target
        setCategory(value)
    };

    const goToFirstPage = useCallback( () => {
        props.history.push(`/`);
    }, [props.history]);

    useEffect(() => {
        goToFirstPage();
    }, [filterState, goToFirstPage]);
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
                                        placeholder={intl.formatMessage({ id: 'app.main.search' })}
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                            </Paper>

                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="Category"
                                    id="category"
                                    value={category}
                                    label={intl.formatMessage({ id: 'app.main.category' })}
                                    name="category"
                                    onChange={handleCategoryChange}
                                    className={classes.left}
                                >
                                    <MenuItem value={0}>{intl.formatMessage({ id: 'app.main.all' })}
                                    </MenuItem>

                                    {categoriesData && categoriesData.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </Grid>
                        {
                            postsData && postsData.posts.length > 0 ? postsData.posts.map( (it, key) => {
                                return it.title.toLowerCase().includes(filterState.toLowerCase().trim())  ? (<Grid key={key} item xs={12} sm={9}><PostCard author={`${it.user.firstName} ${it.user.lastName}` } img={`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/api/v1/image/${it.mainImage}`} title={it.title} id={it.id} /></Grid>) : null
                            }) : <Grid item xs={12} sm={9}>{postsData && postsData.posts.length ===0 ?  intl.formatMessage({ id: 'app.main.notFound' })
                                : (<CircularProgress />)}</Grid>
                        }

                        <Grid item xs={12} sm={9}>
                            <Pagination page={props.match.params.page !== undefined ? parseInt(props.match.params.page) : 1} end={postsData ? postsData.pages: 1} onChangePage={updatePage}/>
                        </Grid>

                    </Grid>
        </div>
    );
}

export default MainPage;
