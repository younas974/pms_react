import {Practice, PracticeList} from '../../model/Practiceprofile.model'

export const GET_WEATHER='GET_WEATHER';
export const SET_LOADING='SET_LOADING';
export const SET_ERROR='SET_ERROR';
export const GET_PROVIDER="GET_PROVIDER";
export const GET_PROVIDER_LOGINS ="GET_PROVIDER_LOGINS";
export const GET_PRACTICE_LOGINS ="GET_PRACTICE_LOGINS";



interface SetErrorAction{
    type: typeof SET_ERROR
    payload:any
}


    export interface ProviderLoginsecQ {
        id: number;
        question: string;
        answer: string;
        created_at: Date;
        updated_at: Date;
        deleted: boolean;
        login_id: number;
    }

    export interface ProviderLogin {
        id: number;
        applicationName: string;
        userName: string;
        link: string;
        password: string;
        effective_date: string;
        expiry_date: string;
        created_at: Date;
        deleted: boolean;
        updated_at: Date;
        provider_id: number;
        provider_loginsec_qs: ProviderLoginsecQ[];
    }






export interface providerList {
    providerId: number;
    providerFirstName: string;
    providerLastName: string;
    providerMiddleName: string;
    speciality: string;
    provider_profile_pic?: Provider_profile_pic
  
}

export interface Provider_profile_pic{
    id: number,
    imageType: string,
    data?: string,
    imageName: string,
    created_at: string,
    created_by: string,
    practice_id: number,
}

interface GetProviderAction{
    type: typeof GET_PROVIDER;
    payload: ProviderObject
}

interface getProviderLoginAction{
    type: typeof GET_PROVIDER_LOGINS;
    payload: ProviderLogin
}

interface getPracticeLoginAction{
    type: typeof GET_PRACTICE_LOGINS;
    payload: ProviderLogin
}


export interface ProviderLoginState{
    data: ProviderLogin |null;
    loading: boolean;
    error: string;
}

export interface PracticeLoginState{
    data: ProviderLogin |null;
    loading: boolean;
    error: string;
}



export interface ProviderState{
    data:   ProviderObject | null
    loading:boolean;
    error:string;
    
}


export interface Addresstype {
    id: number;
    name: string;
}


    export interface Address {
        id: number;
        streetaddress: string;
        city: string;
        state: string;
        zip: string;
        country?: any;
        deleted?: any;
        created_at: Date;
        updated_at: Date;
        addresstypeId: number;
        practicePId?: any;
        created_by?: any;
        updated_by?: any;
        providerProviderId: number;
        addresstype: Addresstype;
    }

    export interface StateLicence {
        id: number;
        title: string;
        author: string;
        effective_date: Date;
        expiry_date: Date;
        created_at: Date;
        updated_at: Date;
        deleted?: any;
        created_by?: any;
        updated_by?: any;
        provider_id: number;
    }

    export interface DrivingLicence {
        id: number;
        title: string;
        author: string;
        effective_date: Date;
        expiry_date: Date;
        created_at: Date;
        deleted?: any;
        updated_at: Date;
        created_by?: any;
        updated_by?: any;
        provider_id: number;
    }

    export interface DaeCertification {
        id: number;
        title: string;
        author: string;
        effective_date: Date;
        expiry_date: Date;
        created_at: Date;
        updated_at: Date;
        deleted?: any;
        created_by?: any;
        updated_by?: any;
        provider_id: number;
    }

    export interface PharmacyCertification {
        id: number;
        title: string;
        author: string;
        effective_date: Date;
        expiry_date: Date;
        created_at: Date;
        deleted?: any;
        updated_at: Date;
        created_by?: any;
        updated_by?: any;
        provider_id: number;
    }

    export interface CaqhCreditional {
        id: number;
        title: string;
        user_id?: any;
        password?: any;
        effective_date: Date;
        expiry_date: Date;
        created_at: Date;
        updated_at: Date;
        deleted?: any;
        created_by?: any;
        updated_by?: any;
        provider_id: number;
    }

    export interface ProviderObject {
        providerId: number;
        providerFirstName: string;
        providerLastName: string;
        providerMiddleName: string;
        SSN: number;
        individualNPI: number;
        DOB: string;
        providerTitle: string;
        gender: string;
        textId: number;
        speciality: string;
        phoneNumber: string;
        faxINTEGER: string;
        cellNumber: string;
        boardCertification: string;
        medicarePTAN: string;
        emailAddress: string;
        medicaidProviderNumber: string;
        officeEmailAddress: string;
        CARFAcceditation: string;
        CAQHID: string;
        contactOfficeEmail: string;
        CARFAcreditation: string;
        created_at: Date;
        updated_at: Date;
        deleted?: any;
        created_by?: any;
        updated_by?: any;
        p_id: number;
        addresses: Address[];
        state_licence: StateLicence;
        driving_licence: DrivingLicence;
        dae_certification: DaeCertification;
        pharmacy_certification: PharmacyCertification;
        caqh_creditional: CaqhCreditional;
        provider_profile_pic?: any;
    }




    export type ProviderAction= GetProviderAction | getProviderLoginAction | getPracticeLoginAction | any

