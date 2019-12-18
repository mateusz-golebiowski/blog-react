import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


import { Markup } from 'interweave';

import HeaderImage from "../HeaderImage/HeaderImage";

import { makeStyles } from '@material-ui/core/styles';



const styles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
            textAlign: 'center',
            padding: theme.spacing(5),
            margin: theme.spacing(5),
            marginLeft: theme.spacing(50),
            marginRight: theme.spacing(50),

        },
        img: {
            maxWidth: '90%'
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
                <Typography paragraph={true} variant="body1" component="span">
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
                <img alt={item.data.file.url} className={classes.img} src={item.data.file.url} />
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
                <Paper className={classes.root}>
                    { preparePost() }
                </Paper>
        </>
    );
}

export default PostPage;
