import React, {useState, useEffect} from 'react';
import Editor from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import {
    convertFromRaw,
    EditorState,
} from 'draft-js';

const imagePlugin = createImagePlugin();
const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

export default function Post(props) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    return (
        <>
            <Editor
                editorState={editorState}
                onChange={(x)=>{setEditorState(x)}}
                plugins={[imagePlugin, toolbarPlugin]}
            />
            <Toolbar />
        </>
    );
}