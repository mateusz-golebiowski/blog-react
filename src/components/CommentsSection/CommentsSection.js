import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Comment from '../Comment/Comment';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import {useSnackbar} from 'notistack';
import Pagination from '../Pagination/Pagination';
import {getUserToken} from '../../lib/user';


const styles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        marginLeft: '10vw',
        marginRight: '10vw',
        textAlign: 'left'
    },
    inputs: {
        width: '100%',
        margin: theme.spacing(1)
    },
    icon: {
        margin: 'auto',
        textAlign: 'center'
    }

}));

const CommentsSection = (props) => {
    const classes = styles();
    const { enqueueSnackbar } = useSnackbar();

    const handleShowSnackbar = (msg, variant) => {
        enqueueSnackbar(msg, {variant});
    };
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [comments, setComments] = useState([]);

    const validateEmail = () =>{
        if(email.length === 0)
            return false;

        //eslint-disable-next-line
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !re.test(email.toLowerCase());
    };

    const refreshComments = () => {

        const url = `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/api/v1/comment/${props.postId}/${page}`;
        const method = `get`;
        fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            if(page > data.pages){
                setPage(data.pages);
            }
            setPages(data.pages);
            setComments(data.comments);
        })
    };

    useEffect(refreshComments, [page, props.postId]);

    const handlePageChange = (page) => {
        setPage(page);
    };
    const handleDelete = (id) => {
        const url = `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/api/v1/comment/${id}`;
        const method = "delete";

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
                handleShowSnackbar('Komentarz został usunięty', 'success');
                refreshComments();
            } else {
                handleShowSnackbar('Nie udało się usunąć komentarza', 'error');
            }

        });
    };
    const handleCommentsAdding = (e) => {
        e.preventDefault();
        const data = {
            username,
            email,
            content
        };
        if (!validateEmail()){
            const url = `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/api/v1/comment/${props.postId}`;
            const method = `post`;
            fetch(url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(function(response) {
                return response.json();
            }).then(function(data) {

                if(data.success) {
                    handleShowSnackbar('Komentarz został dodany', 'success');
                    setContent('');
                    setEmail('');
                    setUsername('');
                    setPage(1);
                    refreshComments();
                } else {
                    handleShowSnackbar('Nie udało się dodać komentarza', 'error');
                }

            });
        }

    };

    return (
        <div className={classes.root}>
            <form onSubmit={handleCommentsAdding}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            className={classes.inputs}
                            label="Użytkownik"
                            placeholder="Użytkownik"
                            variant="outlined"
                            required
                            value={username}
                            onChange={(e)=>{setUsername(e.target.value)}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            className={classes.inputs}
                            label="Email"
                            placeholder="Email"
                            variant="outlined"
                            required
                            value={email}
                            error={validateEmail()}
                            onChange={(e)=>{setEmail(e.target.value)}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.inputs}
                            label="Komentarz"
                            placeholder="Komentarz"
                            multiline
                            variant="outlined"
                            required
                            value={content}
                            onChange={(e)=>{setContent(e.target.value)}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.icon}><Button type={'submit'}><InsertCommentIcon  fontSize={'large'}/></Button></div>
                    </Grid>
                </Grid>
            </form>
            <Typography variant={"h3"}>Komentarze</Typography>
            {comments.map((item, key)=><Comment onDelete={handleDelete} id={item.id} key={key} author={item.username} date={item.createdAt} content={item.content}/>)}

            <Pagination page={page} end={pages} onChangePage={handlePageChange} />
        </div>
    )
};

export default CommentsSection