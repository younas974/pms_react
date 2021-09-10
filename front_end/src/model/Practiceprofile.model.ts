import { ComponentType, FC } from "react";


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

    export interface PracticeProfile {
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
        addresses?: Address[];

    }


    export interface Practice {
        p_id: number;
        PracticeName?: string;
    }

    export interface PracticeList {
        id: number;
        username: string;
        practices: Practice[] ;
    }

   