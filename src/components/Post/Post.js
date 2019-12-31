import React, {useState, useEffect, useRef} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import CodeTool from '@editorjs/code';
import Embed from '@editorjs/embed';
import {Redirect} from 'react-router-dom';
import ImageIcon from '@material-ui/icons/Image';

import {getUserToken, isUserSignedIn} from '../../lib/user';
import {makeStyles} from '@material-ui/core/styles';
import {useSnackbar} from 'notistack';




const styles = makeStyles(theme => ({
    editor: {
        textAlign: 'left'
    },
    root: {
        textAlign: 'left',
        padding: theme.spacing(5),
    },
    textField: {
        paddingBottom: theme.spacing(2),
        width: '100%'
    },
    img: {
        maxWidth: '100%',
    },
    imgIcon: {
        margin: 'auto',
        textAlign: 'center'
    }


}));

const isSignedIn = () => {
    if(!isUserSignedIn()) {
        return (
            <Redirect to={'/'}/>
        )
    } else {
        return null;
    }
};
let editor;

export default function Post(props) {

    const classes = styles();

    console.log(props.match.params.id);
    const [titleState, setTitleState] = useState('');
    const [imageState, setImageState] = useState('');
    const [imageUrlState, setImageUrlState] = useState('');
    const imgInputRef = useRef();
    const editorRef = useRef();

    const { enqueueSnackbar } = useSnackbar();

    const handleShowSnackbar = (msg, variant) => {
        enqueueSnackbar(msg, {variant});
    };

    const updateTitle = (e) => {
        e.preventDefault();
        setTitleState(e.target.value);
    };
    const updateImg = (e) => {
        setImageState(e.target.files[0]);
        setImageUrlState(URL.createObjectURL(e.target.files[0]));
    };
    useEffect(() => {
        setImageUrlState('');
        setTitleState('');
        setImageState('');
        editorRef.current.innerHTML = '';
        async function createFile(url, name){
            let response = await fetch(url);
            let data = await response.blob();
            let metadata = {
                type: data.type
            };
            let file = new File([data], name, metadata);
            return file;
        }

        const createEditor = (blocks) => {
            editor = new EditorJS({
                /**
                 * Id of Element that should contain the Editor
                 */
                holder: 'postEditor',

                /**
                 * Available Tools list.
                 * Pass Tool's class or Settings object for each Tool you want to use
                 */
                tools: {
                    header: Header,
                    list: List,
                    Quote: Quote,
                    image: {
                        class: ImageTool,
                        config: {
                            endpoints: {
                                byFile: `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/api/v1/image/upload`, // Your backend file uploader endpoint
                                byUrl: `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/fetchUrl`, // Your endpoint that provides uploading by Url
                            },
                            additionalRequestHeaders: {
                                'authorization': getUserToken()
                            }
                        }
                    },
                    code: CodeTool,
                    embed: Embed,
                },
                data: blocks,
            });
        };

        let blocks = {};
        if (props.match.params.id) {
            fetch(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/api/v1/post/show/${props.match.params.id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        createFile(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/api/v1/image/${data.img}`, data.img)
                            .then( file => {
                                setImageState(file);
                                setImageUrlState(URL.createObjectURL(file));
                            });

                        setTitleState(data.title);
                        blocks = JSON.parse(data.content);
                        createEditor(blocks);
                    } else {
                        props.history.push(`/404`);
                    }

                });
        } else {
            createEditor(blocks);
        }


        console.log('mounted');
    }, [props.history, props.match.params.id]);


    const saveHandler = (e) => {
        e.preventDefault();
        if(imageState === '') {

        } else {
            editor.save().then((outputData) => {
                console.log('Article data: ', outputData);
                const formData = new FormData();
                formData.append('image', imageState);
                formData.append('title', titleState);
                formData.append('content', JSON.stringify(outputData));

                const url = props.match.params.id ? `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/api/v1/post/${props.match.params.id}` : `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/api/v1/post`;
                const method = props.match.params.id ? `put` : `post`;

                fetch(url, {
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        'authorization': getUserToken()
                    },
                    body: formData
                }).then(function(response) {
                    return response.json();
                }).then(function(data) {

                    if(data.success) {
                        handleShowSnackbar(props.match.params.id ? 'Zmiany zostały zapisane' : 'Wpis został pomyślnie dodany', 'success');
                        props.history.push(`/post/${data.data.id}`);
                    } else {
                        handleShowSnackbar('Nie udało się dodać wpisu', 'error');
                    }

                });
            }).catch((error) => {
                console.log('Saving failed: ', error)
            });
        }
    };

    return (
        <>
            {isSignedIn()}
            <form onSubmit={saveHandler} className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper >
                            {imageUrlState.length>0 ? <img className={classes.img} alt={'preview'} src={imageUrlState} /> : <div className={classes.imgIcon}><ImageIcon fontSize={'large'}/></div>}
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <input
                            ref={imgInputRef}
                            onChange={updateImg}
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            type="file"
                        />

                        <label htmlFor="raised-button-file">
                            <Button variant="contained" component="span" className={classes.button}>
                                Obraz
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={6}>
                        <Button type={'submit'} variant="contained" color="primary">
                            Zapisz
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField  className={classes.textField} value={titleState} onChange={updateTitle} required id="standard-required" label="Tytuł" />
                        <Typography variant={'h3'}>
                            Treść wpisu
                        </Typography>
                        <Paper className={classes.root}>
                            <div className={classes.editor} ref={editorRef} id={'postEditor'} />
                        </Paper>
                        </Grid>
                </Grid>
            </form>

        </>
    );
}