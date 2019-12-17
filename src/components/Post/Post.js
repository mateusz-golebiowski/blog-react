import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';

import {getUserToken} from '../../lib/user';
import {makeStyles} from '@material-ui/core/styles';
import {setUserToken} from '../../lib/user';



const styles = makeStyles(theme => ({
    editor: {
        textAlign: 'left'
    },
    root: {
        padding: theme.spacing(3, 2),
    },


}));


export default function Post(props) {

    const classes = styles();
    const editor = new EditorJS({
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
    const [editorState, setEditorState] = useState({});

    const saveHandler = () => {
        editor.save().then((outputData) => {
            console.log('Article data: ', outputData);
            const data = {
                auth: getUserToken(),
                title: 'd',
                content: JSON.stringify(outputData)
            };
            fetch('http://127.0.0.1:4000/api/v1/post', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
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
            <button onClick={saveHandler}>Save</button>
            <Paper className={classes.root}>
                <div className={classes.editor} id={'postEditor'} />
            </Paper>
        </>
    );
}