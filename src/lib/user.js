import jwt from 'jsonwebtoken';

export const isUserSignedIn = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
        const expDate = jwt.decode(token).exp;
        return expDate >= new Date().getTime()/1000;
    } else {
        return false;
    }

};

export const signOut = () => {

    localStorage.removeItem('token');

};

export const getUserToken = () => {
    return localStorage.getItem('token')
};

export const setUserToken = (value) => {
    return localStorage.setItem('token', value);
};