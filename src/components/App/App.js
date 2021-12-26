import React, {useState, useEffect, useRef} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { SnackbarProvider} from 'notistack';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import BlogAppBar from "../AppBar/AppBar";

import './App.css';

import MainPage from "../MainPage/MainPage";
import PostPage from "../PostPage/PostPage";
import SignInPage from "../SignInPage/SignInPage";
import ProfilePage from '../ProfilePage/ProfilePage';
import Post from "../Post/Post";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {signOut, isUserSignedIn, getUserToken} from "../../lib/user";
import Dashboard from "../Dashboard/Dashboard";
import {IntlProvider} from 'react-intl'
import pl from '../../locale/pl.json'
import en from '../../locale/en.json'
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
    const snackbarRef = useRef();
    const handleCloseSnackBar = (key) => () => {
        snackbarRef.current.closeSnackbar(key);
    };
    useEffect(() => {

        if (isUserSignedIn()) {
            setUserToken(getUserToken());
        } else {
            signOut();
        }

    }, [userToken]);

  return (
      <IntlProvider messages={en} locale="en" defaultLocale="en">
      <MuiThemeProvider theme={theme}>
          <SnackbarProvider
              ref={snackbarRef}
              maxSnack={3}
              action={(key) => (
                  <Button color="inherit" size="small" onClick={handleCloseSnackBar(key)}>
                      <CancelIcon />
                  </Button>
              )}
          >

          <div className="App">
          <CssBaseline />
           <Router>
                <BlogAppBar userToken={userToken} setUserToken={setUserToken} />
                <Switch>
                    <Route path="/" exact component={MainPage} />
                    <Route path="/page/:page" component={MainPage} />
                    <Route path="/post/:id" component={PostPage} />
                    <Route path="/post" component={Post} />
                    <Route path="/editPost/:id" component={Post} />
                    <Route path="/signIn" render={(props)=><SignInPage userToken={userToken} setUserToken={setUserToken}/>}/>
                    <Route path="/profile" component={ProfilePage} />
                    <Route path="/admin" component={Dashboard} />
                    <Route path="/404" render={(props)=><>404</>}/>
                </Switch>
          </Router>

        </div>
          </SnackbarProvider>
      </MuiThemeProvider>
      </IntlProvider>
  );
}

export default App;
