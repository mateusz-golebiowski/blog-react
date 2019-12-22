import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Markup } from 'interweave';

import HeaderImage from "../HeaderImage/HeaderImage";

import { makeStyles } from '@material-ui/core/styles';



const styles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
            textAlign: 'left',
            padding: theme.spacing(5),
            margin: theme.spacing(5),
            marginLeft: theme.spacing(50),
            marginRight: theme.spacing(50),

        },
        imgContainer: {
            maxWidth: '100%',
            textAlign: 'center',
        },
        embed: {
            border: 0,
            height: '100%',
            left: 0,
            position: 'absolute',
            top: 0,
            width: '100%',
        },
        embedContainer: {
            position: 'relative',
            maxWidth: '100%',
            paddingBottom: '56.25%',
            overflow: 'hidden',
        },
        imgCaption: {
            textAlign: 'center'
        },
        quote: {
            display: 'block',
            borderWidth: '2px 0',
            borderStyle: 'solid',
            borderColor: '#eee',
            padding: '1.5em 0 0.5em',
            margin: '1.5em 0',
            position: 'relative',
            "&:before": {
                position: 'absolute',
                top: '0em',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#fff',
                width: '3rem',
                height: '2rem',
                font: '6em/1.08em \'PT Sans\', sans-serif',
                color: '#666',
                textAlign: 'center',
            },
            "&:after": {
                content: 'attr(cite)',
                display: 'block',
                textAlign: 'right',
                fontSize: '0.875em',
                color: '#e74c3c',
            }
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
                <Paper className={classes.imgContainer}>
                    <img alt={item.data.file.url} src={item.data.file.url} />
                    <Typography className={classes.imgCaption} variant="h5" component="h3">
                        {item.data.caption}
                    </Typography>
                </Paper>

            )
        }else if (item.type === 'embed') {
            return (
                <Typography className={classes.embedContainer} paragraph={true} variant="body1" component="p">
                    <iframe className={classes.embed} src={item.data.embed} allowFullScreen={true}/>
                </Typography>

            )
        }else if (item.type === 'code') {
            return (
                <SyntaxHighlighter style={dark}>
                    {item.data.code}
                </SyntaxHighlighter>

            )
        }else if (item.type === 'list') {
            if (item.data.style === 'ordered') {
                return (
                    <ol>
                        {item.data.items.map((i, key)=>(<li>{i}</li>))}
                    </ol>

                )
            } else {
                return (
                    <ul>
                        {item.data.items.map((i, key)=>(<li>{i}</li>))}
                    </ul>

                )
            }

        }else if (item.type === 'Quote') {
            return (

                <blockquote className={classes.quote} cite={item.data.caption}>{item.data.text}</blockquote>

        )

        }else{
            console.log(item);
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
