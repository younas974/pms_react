import {Practice, PracticeList} from '../model/Practiceprofile.model'
import { providerList } from './typesfolder/provider.types';

export const GET_WEATHER='GET_WEATHER';
export const SET_LOADING='SET_LOADING';
export const SET_ERROR='SET_ERROR';
export const SET_ALERT='SET_ALERT';
export const GET_PRACTICES='GET_PRACTICES'
export const GET_PRACTICE_BY_ID='GET_PRACTICE_BY_ID'
export const CREATE_PRACTICE='CREATE_PRACTICE'
export const SET_EDIT_PRACTICE_MODAL ='SET_EDIT_PRACTICE_MODAL'
export const UPDATE_PRACTICE_SUCCESS ='UPDATE_PRACTICE_SUCCESS'
export const TOESTER_NOTIFICATION = "TOESTER_NOTIFICATION"
export const SHOW_TOESTER = "SHOW_TOESTER"
export const USER_INFO = "USER_INFO"



    
    export interface LocalStorageItem {
        id: string;
        username: string;
        email?: any;
        roles: any[];
        accessToken: string;
        practices: Practice[];
    }




export interface Weather{
    dispcription:string;
    icon:string;
    id:number;
    main:string;


}

export interface WeatherData{
    base:string;
    clouds:{
        all:number;

    };
    code:number;
    coord:{
        lon:number;
        late:number;
    };
    dt:number;
    id:number;
    main:{
        feels_like:number;
        humidety:number;
        pressure:number;
        temp:number;
        temp_max:number;
        temp_min:number;

    };
    name:string;
    sys:{
        country:string;
        id:number;
        sunrise:number;
        sunset:number;
        type:number;

    };
    timezone:number;
    visibility:number;
    weather:Weather[];
    wind:{
        speed: number;
        deg:number;

    }
}

export interface Addresstype {
    id: number;
    name: string;
}

export interface Address {
    id: string;
    streetaddress: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    addresstypeId: number;
    addresstype: Addresstype;
}


    
    export interface practiceprofile {
        p_id: number;
        PracticeName: string;
        groupNPI: number;
        licenceNo: string;
        textId: number;
        malPractice: string;
        DEACertification: string;
        CDSPharmacyCertification: string;
        phoneINTEGER: string;
        faxINTEGER: string;
        hospitalAffiiation: string;
        cellNumber?: any;
        medicarePTAN?: any;
        emailAddress?: any;
        medicaidTPIGroup?: any;
        officeEmailAddress?: any;
        autorizedOfficialEmail?: any;
        CARFAcceditation?: any;
        contactOfficialEmail?: any;
        County?: any;
        created_at: Date;
        updated_at: Date;
        addresses: Address[];
        providers: providerList[];
        practice_profile_pic?: Practice_profile_pic
    }
export interface Practice_profile_pic{
    id: number,
    imageType: string,
    data?: string,
    imageName: string,
    created_at: string,
    created_by: string,
    practice_id: number,

}

export interface WeatherError{
    code:string;
    message:string
}

export interface WeatherState{
    data:   WeatherData |null;
    loading:boolean;
    error:string;
    
}

export interface PracticeState{
    data:   PracticeList[] | []
    loading:boolean;
    error:string;
    
}


export interface UserState{
    practices: Practice[] | [];
    loading: boolean;
    error: string;

}


export interface PracticeByIdState{
    data: practiceprofile | null;
    loading:boolean;
    error:string;
}

export interface updatePracticeState{
    message: string;
    loading:boolean;
    error:string;
    setmodel:boolean
}


interface GetWeatherAction{
    type: typeof GET_WEATHER;
    payload: WeatherData
}

interface GetPracticesAction{
    type: typeof GET_PRACTICES;
    payload: PracticeList[]
}


interface GetUserInfoAction{
    tyep: typeof USER_INFO;
    payload: UserInfo
}

interface UserInfo{
    user_id: number;
    p_id: number;
    token: string;
    roles: Role[];
    employee_id: number;

}

interface UserInfoS{
    user_id: number;
    employee_id: number;
    p_id: number;
    token: string;
    roles: Role[];

}

export interface UserInfoState{
  user: UserInfoS
}



interface Role{
    id: number;
    name: string;
}

interface CreatePractice{
    type: typeof CREATE_PRACTICE;
    payload: any
}

interface initialStateCreatePractice{
    loading: boolean;
    erro: string;
}

 interface CreatePracticepayl{
    loading: boolean;
    error: string;
}


interface getPracticeByIdAction{
    type: typeof GET_PRACTICE_BY_ID,
    payload:  practiceprofile

}


interface SetLoadingAction{
    type: typeof SET_LOADING
}

interface SetErrorAction{
    type: typeof SET_ERROR
    payload:any
}


interface SetEditPracticeModelAction{
    type: typeof SET_EDIT_PRACTICE_MODAL
    payload: boolean
}

export interface ShowToesterAction{
    type: typeof SHOW_TOESTER
    payload:boolean
}

export interface SetNotification{
    message:any,
    appearance: any,
    show: boolean
}

interface SetToesterNotification {
    type: typeof TOESTER_NOTIFICATION,
    payload: SetNotification
}

export type WeatherAction= GetWeatherAction | SetLoadingAction| SetErrorAction

export type PracticeAction= GetPracticesAction | getPracticeByIdAction | SetLoadingAction| SetErrorAction | CreatePractice | any |SetEditPracticeModelAction |SetNotification



export type UserAction =  SetLoadingAction | SetErrorAction | GetPracticesAction  | GetUserInfoAction | any

export interface AlertAction{
    type: typeof SET_ALERT
    payload: string
}


export interface AlertState{
    message:string;

}
