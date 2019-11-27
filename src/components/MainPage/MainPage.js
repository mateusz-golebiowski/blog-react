import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";

import Grid from '@material-ui/core/Grid';
import { fade, makeStyles } from '@material-ui/core/styles';


const styles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
        },
        card: {
            maxWidth: '100vw',
        },
        media: {
            height: 240,
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
    })
);

const tileData = [
    {
        img: 'https://picsum.photos/200/300',
        title: 'Image',
        author: 'author',
    },  {
        img: 'https://picsum.photos/200/300',
        title: 'Image',
        author: 'author',
    },  {
        img: 'https://picsum.photos/200/300',
        title: 'Image',
        author: 'author',
    },  {
        img: 'https://picsum.photos/200/300',
        title: 'Image',
        author: 'author',
    },{
        img: 'https://picsum.photos/200/300',
        title: 'Image',
        author: 'author',
    },{
        img: 'https://picsum.photos/200/300',
        title: 'Image',
        author: 'author',
    },
];

function MainPage() {
    const classes = styles();
    return (
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image="https://picsum.photos/400/300"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Lizard
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                            across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Share
                                    </Button>
                                    <Button size="small" color="primary">
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image="https://picsum.photos/200/300"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Lizard
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                            across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Share
                                    </Button>
                                    <Button size="small" color="primary">
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image="https://picsum.photos/200/300"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Lizard
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                            across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Share
                                    </Button>
                                    <Button size="small" color="primary">
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
    );
}

export default MainPage;
