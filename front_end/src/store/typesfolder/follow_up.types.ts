export const GET_FOLLOWUPACTIONDD='GET_FOLLOWUPACTIONDD'; 



export interface getFollowUpActionDDValuesAction{
    type: typeof GET_FOLLOWUPACTIONDD
    payload:  FollowUpActionDDV
}


export interface getFollowUpActionDDState{
   data: FollowUpActionDDV |null,
   loading: boolean,
   error: string

}




    export interface Status {
        id: number;
        title: string;
    }

    export interface SubStatu {
        id: number;
        title: string;
    }

    export interface SubStatusPaid {
        id: number;
        title: string;
        sub_status_id: number;
    }

    export interface SubStatusDenial {
        id: number;
        title: string;
        sub_status_id: number;
    }

    export interface SubStatusInProcess {
        id: number;
        title: string;
        sub_status_id: number;
    }

    export interface SubStatusNotReceived {
        id: number;
        title: string;
        sub_status_id: number;
    }

    export interface ClaimCorrectiveAction {
        id: number;
        title: string;
    }

    export interface ClaimDenialCategory {
        id: number;
        title: string;
    }


    export interface SubStatusVoicMessageLeft {
        id: number;
        title: string;
        sub_status_id: number;
    }
    
    export interface SubStatusZeroOut {
        id: number;
        title: string;
        sub_status_id: number;
    }
    export interface FollowUpActionDDV {
        status: Status[];
        subStatus: SubStatu[];
        subStatusPaid: SubStatusPaid[];
        subStatusDenial: SubStatusDenial[];
        subStatusInProcess: SubStatusInProcess[];
        subStatusNotReceived: SubStatusNotReceived[];
        claimCorrectiveAction: ClaimCorrectiveAction[];
        claimDenialCategory: ClaimDenialCategory[];
        subStatusVoicMessageLeft: SubStatusVoicMessageLeft[];
        subStatusZeroOut: SubStatusZeroOut[];
    }








    export type FollowUpActions= getFollowUpActionDDState | any