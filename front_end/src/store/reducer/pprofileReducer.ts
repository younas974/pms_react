import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import { WeatherState, WeatherAction, GET_WEATHER, SET_LOADING, SET_ERROR ,PracticeState, PracticeAction, GET_PRACTICES, PracticeByIdState, GET_PRACTICE_BY_ID, updatePracticeState, UPDATE_PRACTICE_SUCCESS, SET_EDIT_PRACTICE_MODAL, SetNotification, SHOW_TOESTER, TOESTER_NOTIFICATION } from '../types';
import { GET_PRACTICE_LOGINS, GET_PROVIDER_LOGINS, PracticeLoginState, ProviderAction, ProviderLoginState } from '../typesfolder/provider.types';

const initialState: PracticeState={
    data: [
        {
            id: 0,
            username: "",
            practices: [
                {
                    p_id: 0,
                    PracticeName: "Please Select"
                },
            ]
        }
    ],
    loading:false,
    error:''
}

const initialStatePprofile: PracticeByIdState={
    data: null,
    loading:false,
    error:''
}

const intialStatesUpdatePractice: updatePracticeState={
    message:'',
    loading:false,
    error:'',
    setmodel:false
}

const initialStateToester: SetNotification={
    message:'',
    appearance: '',
    show:false

}

const initialStateProviderLogIn: ProviderLoginState={
    data:null,
    loading: false,
    error:''
}


export  function practice(state = initialState, action:PracticeAction): PracticeState {
    switch(action.type){
        case GET_PRACTICES:
        return{
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


  export  function practicebyid(state = initialStatePprofile ,action:PracticeAction):  PracticeByIdState {
    switch(action.type){
        case GET_PRACTICE_BY_ID:
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
    
  export  function editPracticeReducer(state = intialStatesUpdatePractice ,action:PracticeAction):  updatePracticeState {
    switch(action.type){
        case UPDATE_PRACTICE_SUCCESS:
        return{
            ...state,
            message:'Practice update successfully',
            loading:false,
            setmodel:false
        }

        case SET_LOADING:
        return {
            ...state, 
            loading:true
        }
        case SET_EDIT_PRACTICE_MODAL:
            return{
                ...state,
                setmodel:action.payload

            }

        case SET_ERROR:{

            return{
                ...state,
                error: action.payload,
                loading:false,
                setmodel:false
            }
        }

        default:{
            return state;
        }
    }
  }

  export  function getToesterNotification(state = initialStateToester ,action:PracticeAction):  SetNotification {
    switch(action.type){
        case SHOW_TOESTER:
        return{
            ...state,
            show:action.payload
        }

        case TOESTER_NOTIFICATION:
        return {
            ...state, 
            message:action.payload.message,
            appearance: action.payload.appearance
        }
       
        default:{
            return state;
        }
    }
  }
  

  export  function getPracticeLogin(state = initialStateProviderLogIn ,action: ProviderAction):  PracticeLoginState {
    switch(action.type){
        case GET_PRACTICE_LOGINS:
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
