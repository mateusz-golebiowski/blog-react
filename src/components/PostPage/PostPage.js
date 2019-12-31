import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Markup } from 'interweave';

import HeaderImage from "../HeaderImage/HeaderImage";

import { makeStyles } from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom';
import {getUserToken, isUserSignedIn} from '../../lib/user';
import {useSnackbar} from 'notistack';

import EmbedObject from '../EmbedObject/EmbedObject';



const styles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
            textAlign: 'left',
            padding: theme.spacing(2),
            [theme.breakpoints.up('md')]: {
                margin: theme.spacing(5),
            },

        },
        imgContainer: {
            maxWidth: '100%',
            textAlign: 'center',
        },
        img: {
            maxWidth: '100%',
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

    const { enqueueSnackbar } = useSnackbar();

    const handleShowSnackbar = (msg, variant) => {
        enqueueSnackbar(msg, {variant});
    };

    const wrapper = (item) => {
        if(item.type === 'paragraph'){
            return (
                <Typography paragraph={true} variant="body1" component="div">
                    <Markup content={item.data.text} />
                </Typography>
            )
        } else if (item.type === 'header') {
            return (
                <Typography paragraph={true} variant={hLevel(item.data.level)}>
                    {item.data.text}
                </Typography>
            )
        }else if (item.type === 'image') {
            return (
                <Paper className={classes.imgContainer}>
                    <img className={classes.img} alt={item.data.file.url} src={item.data.file.url} />
                    <Typography className={classes.imgCaption} variant="h5" component="h3">
                        {item.data.caption}
                    </Typography>
                </Paper>

            )
        }else if (item.type === 'embed') {
            return (
                <EmbedObject title={item.data.source} src={item.data.embed} caption={item.data.caption}/>
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

       return contentState.blocks.map((item, key) => <span key={key}>{wrapper(item)}</span>);
    };
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/api/v1/post/show/${props.match.params.id}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log(data);
                    setTitleState(data.title);
                    setImage(data.img);
                    setContentState(JSON.parse(data.content));
                    console.log(JSON.parse(data.content));
                } else {
                    props.history.push(`/404`);
                }

            });
        console.log('mounted');
    }, [props.history, props.match.params.id]);

    const handleDeletePost = () => {
        const url = `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/api/v1/post/${props.match.params.id}`;
        const method = `delete`;

        fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'authorization': getUserToken()
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {

            if(data.success) {
                handleShowSnackbar('Wpis został usunięty', 'success');
                props.history.push(`/`);
            } else {
                handleShowSnackbar('Nie udało się usunąć wpisu', 'error');
            }

        });
    };

    return (
        <>
                <CssBaseline />
                <HeaderImage img={`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/api/v1/image/${image}`} title={titleState}/>
                <Paper>
                    {isUserSignedIn() ? (
                        <Toolbar>
                            <NavLink to={`/editPost/${props.match.params.id}`} exact activeClassName="active">
                                <Button>Edytuj</Button>
                            </NavLink>
                            <Button onClick={handleDeletePost}>Usuń</Button>
                        </Toolbar>
                    ) : null}

                </Paper>
                <Paper className={classes.root}>
                    { preparePost() }
                </Paper>
        </>
    );
}

export default PostPage;
