import {ThunkAction} from 'redux-thunk'
import { RootState } from '../index';
import { WeatherAction, WeatherData, WeatherError, GET_WEATHER, SET_LOADING, SET_ERROR, Weather, PracticeAction, GET_PRACTICES, GET_PRACTICE_BY_ID, SET_EDIT_PRACTICE_MODAL, UPDATE_PRACTICE_SUCCESS, SHOW_TOESTER, SetNotification, TOESTER_NOTIFICATION } from '../types';
import {PracticeList, PracticeProfile} from '../../model/Practiceprofile.model'
import {API_URL} from '../../utils/constants'
import { GET_PROVIDER, GET_PROVIDER_LOGINS, ProviderAction, ProviderLogin, ProviderObject } from '../typesfolder/provider.types';



export const getProviders = (userId: number): ThunkAction<void, RootState, null , PracticeAction> =>{
    
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


export const createProvider = (data: any): ThunkAction<void, RootState, null , ProviderAction> =>{
 
    const requestOptions = {
        method: 'POST',
        body: data
    };
    return async dispatch => {
        try{
            const res= await fetch(`${API_URL}/api/provider/create`, requestOptions);
            if(!res.ok){
                const resData: any =  await res.json();
                throw new Error(resData.message)
            }
            
            const resData:  any = await res.json();  
            
            let initialStateToester: SetNotification={
                message:'Provider is Created Successfully',
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
      
        }
        catch(err: any){
            dispatch({
                type: SET_ERROR,
                payload: err.message
            })
        }
    }
}

export const createProviderLogin = (data: any): ThunkAction<void, RootState, null , ProviderAction> =>{
 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return async dispatch => {
        try{
            const res= await fetch(`${API_URL}/api/provider/addProviderLoginInfo`, requestOptions);
            if(!res.ok){
                const resData: any =  await res.json();
                throw new Error(resData.message)
            }
            
            const resData:  ProviderLogin = await res.json();  
            
            let initialStateToester: SetNotification={
                message:'Log in is Created Successfully',
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
                type: GET_PROVIDER_LOGINS , 
                payload: resData
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


export const updateProvider= (data: any): ThunkAction<void, RootState, null , ProviderAction> =>{

    const requestOptions = {
        method: 'PUT',
        body: data
    };
    return async dispatch => {
        try{
            const res= await fetch(`${API_URL}/api/provider/update`, requestOptions);
            if(!res.ok){
                const resData: WeatherError =  await res.json();
                throw new Error(resData.message)
            }

            const resData:  any = await res.json();  
            let initialStateToester: SetNotification={
                message:'Provider is Updateed Successfully',
                appearance: 'success',
                show:false
            
            }
            
            dispatch({
                type: GET_PROVIDER , 
                payload: resData
            })
            
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
        catch(err: any){
            dispatch({
                type: SET_ERROR,
                payload: err.message
            })
        }
    }
}



export const getProviderById = (practiceId: number): ThunkAction<void, RootState, null , ProviderAction> =>{
    
    return async dispatch => {
       
        try{
            const res= await fetch(`${API_URL}/api/provider/findbyid/${practiceId}`);
            if(!res.ok){
                const resData: WeatherError =  await res.json();
                throw new Error(resData.message)
            }
            
            const resData:  ProviderObject = await res.json();   
           
            dispatch({
                type: GET_PROVIDER , 
                payload: resData
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


export const getProviderFindOne = (practiceId: number): ThunkAction<void, RootState, null , ProviderAction> =>{
    
    return async dispatch => {
       
        try{
            const res= await fetch(`${API_URL}/api/provider/findone/${practiceId}`);
            if(!res.ok){
                const resData: WeatherError =  await res.json();
                throw new Error(resData.message)
               
            }
            
            const resData:  ProviderObject = await res.json();  
           
                dispatch({
                    type: GET_PROVIDER , 
                    payload: resData
                })
            
          
        }
        catch(err: any){
            
            dispatch({
                type: GET_PROVIDER , 
                payload: null
            })

            dispatch({
                type: SET_ERROR,
                payload: err.message
            })
        }
    }
}


export const getProviderLogIn = (provider_id: number): ThunkAction<void, RootState, null , ProviderAction> =>{
    
    return async dispatch => {
       
        try{
            const res= await fetch(`${API_URL}/api/provider/getProviderLogin/${provider_id}`);
            if(!res.ok){
                const resData: WeatherError =  await res.json();
                throw new Error(resData.message)
               
            }
            
            const resData:  ProviderLogin = await res.json();  
           
                dispatch({
                    type: GET_PROVIDER_LOGINS , 
                    payload: resData
                })
            
        }
        catch(err: any){
       
            dispatch({
                type: GET_PROVIDER_LOGINS , 
                payload: null
            })

            dispatch({
                type: SET_ERROR,
                payload: err.message
            })
        }
    }
}

export const setEditProviderModal=(data:boolean): PracticeAction => {
    return {
        type: SET_EDIT_PRACTICE_MODAL,
        payload: data
    }
}

export const showToesterNotificationp=(data:boolean):PracticeAction=>{

    return {
        type: SHOW_TOESTER,
        payload: data
    }
    
}

export const setLoadingp=(): WeatherAction => {
    return {
        type: SET_LOADING
    }
}

export const setErrorp = (): WeatherAction=> {
    return{
        type: SET_ERROR,
        payload: ''
    }
}