import {ThunkAction} from 'redux-thunk'
import { RootState } from '../index';
import { WeatherAction, WeatherData, WeatherError, GET_WEATHER, SET_LOADING, SET_ERROR, Weather, PracticeAction, GET_PRACTICES, GET_PRACTICE_BY_ID, SET_EDIT_PRACTICE_MODAL, UPDATE_PRACTICE_SUCCESS, SHOW_TOESTER, SetNotification, TOESTER_NOTIFICATION } from '../types';
import {PracticeList, PracticeProfile} from '../../model/Practiceprofile.model'
import {API_URL} from '../../utils/constants'
import { GET_PRACTICE_LOGINS, GET_PROVIDER_LOGINS, ProviderLogin } from '../typesfolder/provider.types';



export const getPractices = (userId: number): ThunkAction<void, RootState, null , PracticeAction> =>{
    
    return async dispatch => {
        try{
            const res= await fetch(`${API_URL}/api/auth/findall/${userId}`);
            if(!res.ok){
                const resData: WeatherError =  await res.json();
                throw new Error(resData.message)
            }
            
            const resData:  PracticeList[] = await res.json();  
            console.log('i am in practice list action')
            console.log(resData[0].practices)
            dispatch({
                type: GET_PRACTICES , 
                payload: resData[0].practices
            })
        }
        catch(err: any){
            dispatch({
                type: SET_ERROR,
                payload: err.message
            })
        }
    }
}


export const createPractice = (data: any): ThunkAction<void, RootState, null , PracticeAction> =>{

 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return async dispatch => {
       
        try{
            const res= await fetch(`${API_URL}/api/practice/create`, requestOptions);
            if(!res.ok){
             //   const resData: WeatherError =  await res.json();
              //  throw new Error(resData.message)

            }
            
            const resData:  any = await res.json();   
      
                console.log(resData)
            dispatch({
                type: GET_PRACTICES, 
                payload: resData
            })
           
        }
        catch(err:any){
            dispatch({
                type: SET_ERROR,
                payload: err.message
            })
        }
    }
}


export const updatePractice = (data: any): ThunkAction<void, RootState, null , PracticeAction> =>{

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return async dispatch => {
        try{
            const res= await fetch(`${API_URL}/api/practice/update/${data.p_id}`, requestOptions);
            if(!res.ok){
                const resData: WeatherError =  await res.json();
                throw new Error(resData.message)
            }

            const resData:  any = await res.json();  
            let initialStateToester: SetNotification={
                message:resData.message,
                appearance: 'success',
                show:false
            
            }
            
            dispatch({
                type: TOESTER_NOTIFICATION,
                payload:initialStateToester
            })
            dispatch({
                type: SHOW_TOESTER,
                payload:true
            })

            setTimeout(() => {
                dispatch({
                    type:SHOW_TOESTER,
                    payload: false
                })
            }, 1000);


            dispatch({
                type:UPDATE_PRACTICE_SUCCESS,
                payload:false
            })
             

        }
        catch(err:any){
            dispatch({
                type: SET_ERROR,
                payload: err.message
            })
        }
    }
}



export const getPracticeById = (practiceId: number): ThunkAction<void, RootState, null , PracticeAction> =>{
    
    return async dispatch => {
       
        try{
            const res= await fetch(`${API_URL}/api/practice/${practiceId}`);
            if(!res.ok){
                const resData: WeatherError =  await res.json();
                throw new Error(resData.message)
            }
            
            const resData:  PracticeProfile = await res.json();   
           
            dispatch({
                type: GET_PRACTICE_BY_ID , 
                payload: resData
            })
        }
        catch(err:any){
            dispatch({
                type: SET_ERROR,
                payload: err.message
            })
        }
    }
}


export const getPracticeLogIn = (provider_id: number): ThunkAction<void, RootState, null , PracticeAction> =>{
    
    return async dispatch => {
       
        try{
            const res= await fetch(`${API_URL}/api/practice/getPracticeLogin/${provider_id}`);
            if(!res.ok){
                const resData: WeatherError =  await res.json();
                throw new Error(resData.message)
               
            }
            
            const resData:  ProviderLogin = await res.json();  
           
                dispatch({
                    type: GET_PRACTICE_LOGINS , 
                    payload: resData
                })
            
        }
        catch(err:any){
       
            dispatch({
                type: GET_PRACTICE_LOGINS , 
                payload: null
            })

            dispatch({
                type: SET_ERROR,
                payload: err.message
            })
        }
    }
}


export const createPracticeLogin = (data: any): ThunkAction<void, RootState, null , PracticeAction> =>{
 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return async dispatch => {
        try{
            const res= await fetch(`${API_URL}/api/practice/addPracticeLoginInfo`, requestOptions);
            if(!res.ok){
                const resData: any =  await res.json();
                throw new Error(resData.message)
            }
            
            const resData:  ProviderLogin = await res.json();  
            
            let initialStateToester: SetNotification={
                message:'Login is Created Successfully',
                appearance: 'success',
                show:false
            
            }
            
            dispatch({
                type: TOESTER_NOTIFICATION,
                payload:initialStateToester
            })
            dispatch({
                type: SHOW_TOESTER,
                payload:true
            })

            setTimeout(() => {
                dispatch({
                    type:SHOW_TOESTER,
                    payload: false
                })
            }, 1000);
         
            dispatch({
                type: GET_PRACTICE_LOGINS , 
                payload: resData
            })

      
        }
        catch(err:any){
            dispatch({
                type: SET_ERROR,
                payload: err.message
            })
        }
    }
}


export const setEditPracticeModal=(data:boolean): PracticeAction => {
    return {
        type: SET_EDIT_PRACTICE_MODAL,
        payload: data
    }
}

export const showToesterNotification=(data:boolean):PracticeAction=>{

    return {
        type: SHOW_TOESTER,
        payload: data
    }
    
}

export const setLoading=(): WeatherAction => {
    return {
        type: SET_LOADING
    }
}

export const setError = (): WeatherAction=> {
    return{
        type: SET_ERROR,
        payload: ''
    }
}