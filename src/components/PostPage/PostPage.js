import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

import { Markup } from 'interweave';

import HeaderImage from "../HeaderImage/HeaderImage";


import BlogAppBar from "../AppBar/AppBar";
import { fade, makeStyles } from '@material-ui/core/styles';



const styles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
        },
        gridList: {
            width: 500,
            height: 450,
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
        img: {
            maxWidth: '90vw'
        }
    })
);

const hLevel = (lv) => `h${lv}`;




function PostPage(props) {
    const classes = styles();
    const [titleState, setTitleState] = useState('');
    const [image, setImage] = useState('');
    const [contentState, setContentState] = useState({blocks: []});
    const wrapper = (item) => {
        if(item.type === 'paragraph'){
            return (
                <Typography paragraph={true} variant="body1">
                    <Markup content={item.data.text} />
                </Typography>
            )
        } else if (item.type === 'header') {
            return (
                <Typography variant={hLevel(item.data.level)}>
                    {item.data.text}
                </Typography>
            )
        }else if (item.type === 'image') {
            return (
                <img className={classes.img} src={item.data.file.url} />
            )
        }
    };
    const preparePost = () => {

       return contentState.blocks.map((item, key) => wrapper(item))
    };
    useEffect(() => {
        fetch(`http://127.0.0.1:4000/api/v1/post/show/${props.match.params.id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTitleState(data.title);
                setImage(data.img);
                setContentState(JSON.parse(data.content));
                console.log(JSON.parse(data.content));
            });
        console.log('mounted');
    }, []);

    return (
        <>
                <CssBaseline />
                <HeaderImage img={image} title={titleState}/>
                <div className={classes.root}>
                    { preparePost() }
                </div>
        </>
    );
}

export default PostPage;
