import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import jwt from 'jsonwebtoken';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import BlogAppBar from "../AppBar/AppBar";
import { fade, makeStyles } from '@material-ui/core/styles';

import './App.css';

import MainPage from "../MainPage/MainPage";
import PostPage from "../PostPage/PostPage";
import SignInPage from "../SignInPage/SignInPage";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {signOut, isUserSignedIn, getUserToken} from "../../lib/user";

const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#5D5C61'
            },
            secondary: {
                main: '#7395AE'
            }
        }
    },
);

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
        gridList: {
            width: 500,
            height: 450,
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


function App() {
    const classes = styles(theme);
    const [userToken, setUserToken] = useState('');
    useEffect(() => {

        if (isUserSignedIn()) {
            setUserToken(getUserToken());
        } else {
            signOut();
        }

    }, []);

  return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <CssBaseline />
           <Router>
                <BlogAppBar userToken={userToken} setUserToken={setUserToken} />
                <Switch>
                    <Route path="/" exact component={MainPage} />
                    <Route path="/post/:id" component={PostPage} />
                    <Route path="/signIn" render={(props)=><SignInPage userToken={userToken} setUserToken={setUserToken}/>}/>
                </Switch>
          </Router>

        </div>
      </MuiThemeProvider>
  );
}

export default App;
