import { GET_PRACTICES, SET_ERROR, SET_LOADING, UserAction, UserState, UserInfoState, USER_INFO } from "../types";


const initialState: UserState={
    practices: [],
    loading: false,
    error:''
}

const initialStateUser : UserInfoState={
  user:{
    employee_id: 0,
    user_id: 0,
    p_id: 0,
    token: '',
    roles: []
  }
    

}

export  function assignedpractices(state = initialState, action:UserAction): UserState {
    switch(action.type){
        case GET_PRACTICES:
        return{
            practices: action.payload , 
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

  export  function userInfo(state = initialStateUser, action:UserAction): UserInfoState {
    switch(action.type){
        case USER_INFO:
        return{
            ...state,
            user: action.payload 
            
        }

        default:{
            return state;
        }
    }
  }