import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";


import Grid from '@material-ui/core/Grid';
import { fade, makeStyles } from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom';


const styles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
            padding: theme.spacing(5),
        },
        card: {

            display: 'flex',
        },
        media: {
            height: 240,
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
        },
        img: {
            minWidth: 555,
            minHeight: 255,
        },
    })
);

const PostCard = (props) =>{
    const classes = styles();
    console.log(props.id);
    const handleOpenPost = () => {

    };
    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.img}
                image={props.img}
                title={props.title}
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <NavLink to={`/post/${props.id}`} exact activeClassName="active">
                        <Typography onClick={handleOpenPost} component="h5" variant="h5">
                            {props.title}
                        </Typography>
                    </NavLink>
                    <NavLink to={`/post/${props.id}`} exact activeClassName="active">
                        <Button onClick={handleOpenPost} variant="contained" component="span" >
                            Czytaj..
                        </Button>
                    </NavLink>
                </CardContent>
            </div>

        </Card>
    );
};

function MainPage() {
    const classes = styles();
    const [postsState, setPostsState] = useState([]);
    useEffect(() => {
        fetch(`http://127.0.0.1:4000/api/v1/post/1`)
            .then(response => response.json())
            .then(data => {
                setPostsState(data);
                console.log(data);
            });
        console.log('mounted');
    }, []);
    return (
        <div className={classes.root}>
                    <Grid container spacing={3}>
                        {
                            postsState.map( (item, key) => {
                                return <Grid item xs={12} sm={9}><PostCard img={item.img} title={item.title} id={item.id} key={key}/></Grid>
                            })
                        }
                    </Grid>
        </div>
    );
}

export default MainPage;
