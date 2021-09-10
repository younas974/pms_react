import {ThunkAction} from 'redux-thunk'
import { RootState } from '../index';
import { userConstants } from '../../_constants';
import { login, userService } from '../../_services';
import { alertActions } from './alert.actions';
import { history } from '../../_helpers/history';
import {GET_PRACTICES, PracticeAction, SET_ERROR, USER_INFO, WeatherError} from '../types'
import { PracticeList } from '../../model/Practiceprofile.model';
import { BrowserHistory } from 'history';

export const userActions = {
   // signin,
    // logout,
    // register,
    // getAll,
    // delete: _delete
};


export function setUserInfo(data: any){

    return (dispatch: any )=>{
        dispatch({
            type: USER_INFO,
            payload: data
        })
    }
}


export  function  signin(username:any, password:any) {

      return async  (dispatch:any )=> {
        
       await   userService.login(username, password)
            .then(
                user => { 

                    let userinfo={
                                user_id:user.id,
                                employee_id: user.employee_id,
                                token: user.accessToken,
                                roles: user.roles,
                                p_id: 0
                    }
                    
                    dispatch({
                        type: GET_PRACTICES, 
                        payload: user.practices
                    })

                    dispatch({
                        type: USER_INFO,
                        payload: userinfo
                    })
                  
                },
                error => {
                    window.alert(error)
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user: any) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user:any) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error: any) { return { type: userConstants.LOGIN_FAILURE, error } }
}

export function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}





// function register(user) {
//     return async dispatch => {
//         dispatch(request(user));

//         userService.register(user)
//             .then(
//                 user => { 
//                     dispatch(success());
//                     history.push('/login');
//                     dispatch(alertActions.success('Registration successful'));
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };

//     function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
//     function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
// }


// function getAll() {
//     return dispatch => {
//         dispatch(request());

//         userService.getAll()
//             .then(
//                 users => dispatch(success(users)),
//                 error => dispatch(failure(error.toString()))
//             );
//     };

//     function request() { return { type: userConstants.GETALL_REQUEST } }
//     function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
// }

// prefixed function name with underscore because delete is a reserved word in javascript

// function _delete(id) {
//     return dispatch => {
//         dispatch(request(id));

//         userService.delete(id)
//             .then(
//                 user => dispatch(success(id)),
//                 error => dispatch(failure(id, error.toString()))
//             );
//     };

//     function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
//     function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
//     function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
// }