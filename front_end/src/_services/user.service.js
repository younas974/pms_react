//import config from 'config';

import { authHeader } from '../_helpers';
import { history } from '../_helpers/history';
import {API_URL} from '../utils/constants'

export const userService = {
    login,
    logout,
    // register,
    // getAll,
    // getById,
    // update,
    // delete: _delete
};

 export async  function login(username, password) {
    
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        referrerPolicy: 'no-referrer',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    };

    return  await fetch(`${API_URL}/api/auth/signin`, requestOptions)
        .then(handleResponse)
        .then(user => {
          
            // store user details and jwt token in local storage to keep user logged in between page refreshes
         
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }).catch(err=>{
            console.log(err.message)
        });

        
}


 function   handleResponse(response) {
    
     return  response.text().then(text => {
        
        const data = text && JSON.parse(text);
        console.log(data)
        if (!response.ok) {
            if (response.status === 401 || response.status === 404) {
                // auto logout if 401 response returned from api
                logout();
               window.location.reload(true);
            }
           
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
      
        return data;
    });
}

export function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    history.push('/')
    window.location.reload(true)
}

// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }

// function getById(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
// }

// function register(user) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
// }

// function update(user) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
// }

// prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
// }

 