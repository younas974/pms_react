import {ThunkAction} from 'redux-thunk'
import { RootState } from '../index';
import {API_URL} from '../../utils/constants'
import { FollowUpActionDDV, FollowUpActions, GET_FOLLOWUPACTIONDD } from '../typesfolder/follow_up.types';
import { WeatherError } from '../types';
import { SET_ERROR } from '../typesfolder/provider.types';
import axios from 'axios';


const api = axios.create({
    baseURL: API_URL
  })

  

export  const  getFollowUpDDValues  =  () : ThunkAction<void, RootState, null , FollowUpActions>  => {
    
    return async dispatch => {
        try{
            const res= await fetch(`${API_URL}/api/claim/followupdd`);
            if(!res.ok){
                const resData: WeatherError =  await res.json();
                throw new Error(resData.message)
            }
            
            const resData:  FollowUpActionDDV = await res.json();  
           
            
            dispatch({
                type: GET_FOLLOWUPACTIONDD , 
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


export const getClaims =()=>{

 return api.get("/api/claim/findall")
.then(res => {       

  return res.data      
   // setData(res.data)
 })
 .catch(error=>{
     console.log("Error")
 })

}


export const getWorkedClaims =(data:any)=>{

    return api.post("/api/claim/getworkedclaims",data)
   .then(res => {       
   
     return res.data      
      // setData(res.data)
    })
    .catch(error=>{
        console.log("Error")
    })
   
   }


   export const getPendingClaims =(data:any)=>{

    return api.post("/api/claim/getpendingclaims",data)
   .then(res => {       
   
     return res.data      
      // setData(res.data)
    })
    .catch(error=>{
        console.log("Error")
    })
   
   }


export const saveClaimWorkSummary=(data: any)=>{

    return api.post("api/claim/followup/addworksummary", data)
    .then(res=>{
        return res
    }).catch(error=>{

        console.log(error)
    })

}

export const getClaimStatusSummary=(data: any)=>{

    return api.post("/api/claim/bystatus", data)
    .then(res => {       
    
      return res.data      
       // setData(res.data)
     })
     .catch(error=>{
         console.log("Error")
     })

}


export const getUsers=()=>{

    return api.get("/api/auth/getAllEmployees")
    .then(res => {       
    
      return res.data      
       // setData(res.data)
     })
     .catch(error=>{
         console.log("Error")
     })

}


export const getUserActivity=(data:any)=>{

    return api.post("/api/claim/userprodectivity", data)
    .then(res => {       
    
      return res.data      
       // setData(res.data)
     })
     .catch(error=>{
         console.log("Error")
     })

}






export const getClaimUserSummary=(data: any)=>{

    return api.post("/api/claim/byuser",data)
    .then(res => {       
    
      return res.data      
       // setData(res.data)
     })
     .catch(error=>{
         console.log("Error")
     })

}