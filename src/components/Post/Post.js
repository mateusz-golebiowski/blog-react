import React, {useState, useEffect} from 'react';
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
import {Redirect} from 'react-router-dom';


import {getUserToken, isUserSignedIn} from '../../lib/user';
import {makeStyles} from '@material-ui/core/styles';
import {setUserToken} from '../../lib/user';



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


    const [titleState, setTitleState] = useState('');
    const [imageState, setImageState] = useState('');

    const updateTitle = (e) => {
        e.preventDefault();
        setTitleState(e.target.value);
    };
    const updateImg = (e) => {
        setImageState(e.target.files[0]);

        console.log(imageState);

    };
    useEffect(() => {
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
                            byFile: 'http://localhost:4000/api/v1/image/upload', // Your backend file uploader endpoint
                            byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
                        }
                    }
                }
            }

        });
        console.log('mounted');
    }, []);


    const saveHandler = (e) => {
        e.preventDefault();
        editor.save().then((outputData) => {
            console.log('Article data: ', outputData);
            const formData = new FormData();
            formData.append('image', imageState);
            formData.append('auth', getUserToken());
            formData.append('title', titleState);
            formData.append('content', JSON.stringify(outputData));
            const data = {
                auth: getUserToken(),
                title: titleState,
                content: JSON.stringify(outputData),
            };

            fetch('http://127.0.0.1:4000/api/v1/post', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData
            }).then(function(response) {
                return response.json();
            }).then(function(data) {

                if(data.success) {
                    props.history.push(`/post/${data.data.id}`);
                }

            });
        }).catch((error) => {
            console.log('Saving failed: ', error)
        });
    };

    return (
        <>
            {isSignedIn()}
            <form onSubmit={saveHandler} className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <input
                            onChange={updateImg}
                            required={true}
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
                            <div className={classes.editor} id={'postEditor'} />
                        </Paper>
                        </Grid>
                </Grid>
            </form>

        </>
    );
}