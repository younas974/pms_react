import { FollowUpActions, getFollowUpActionDDState, GET_FOLLOWUPACTIONDD } from "../typesfolder/follow_up.types";
import { SET_ERROR, SET_LOADING } from "../typesfolder/provider.types";

const initialStateDDValues: getFollowUpActionDDState={
    data: null,
    loading: false,
    error: ''

}


export  function getFollowUpActionDDV(state = initialStateDDValues ,action: FollowUpActions):  getFollowUpActionDDState {
    switch(action.type){
        case GET_FOLLOWUPACTIONDD:
        return{
            ...state,
            data: action.payload , 
            loading:false,
            error:''
        }

        case SET_LOADING:
        return {
            ...state, 
            loading:true
        }

        case SET_ERROR:{
            return{
                ...state,
                error: action.payload,
                loading:false
            }
        }

        default:{
            return state;
        }
    }
  }
