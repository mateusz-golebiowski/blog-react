import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import BlogAppBar from "../AppBar/AppBar";

import './App.css';

import MainPage from "../MainPage/MainPage";
import PostPage from "../PostPage/PostPage";
import SignInPage from "../SignInPage/SignInPage";
import Post from "../Post/Post";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {signOut, isUserSignedIn, getUserToken} from "../../lib/user";

const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#5D5C61'
            },
            secondary: {
                main: '#cadfee'
            },
            background: {
                default: "#F0F0F0"
            }
        }
    },
);

function App() {
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
                    <Route path="/:page" exact component={MainPage} />
                    <Route path="/post/:id" component={PostPage} />
                    <Route path="/post" component={Post} />
                    <Route path="/signIn" render={(props)=><SignInPage userToken={userToken} setUserToken={setUserToken}/>}/>
                    <Route path="/404" render={(props)=><>404</>}/>
                </Switch>
          </Router>

        </div>
      </MuiThemeProvider>
  );
}

export default App;
