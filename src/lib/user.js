import jwt from 'jsonwebtoken';

export const isUserSignedIn = () => {
    const localToken = localStorage.getItem('token');
    const sessionToken = sessionStorage.getItem('token');
    if (sessionToken !== null || localToken !== null) {
        const token = sessionToken !== null ? sessionToken : localToken;
        const expDate = jwt.decode(token).exp;
        return expDate >= new Date().getTime()/1000;
    } else {
        return false;
    }

};

export const signOut = () => {

    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

};

export const getUserToken = () => {
    const local = localStorage.getItem('token');
    const session = sessionStorage.getItem('token');
    if (session !== null)
        return session;
    else
        return local;
};

export const setUserToken = (value, remember) => {
    if (remember) {
        return localStorage.setItem('token', value);

    } else {
        return sessionStorage.setItem('token', value);
    }

};