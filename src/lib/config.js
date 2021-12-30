import {getUserToken} from "./user";

export const apiUrl = `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`;
export const fetcher = (url) => {
    console.log(url)
    return fetch(url,{
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'authorization': getUserToken()
        }
    }).then(res => res.json())
}

export const userFetcher = (url) => {
    console.log(url)
    return fetch(url,{
        method: 'get',
        headers: {
            'Accept': 'application/json',
        }
    }).then(res => res.json())
}
