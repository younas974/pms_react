
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
        ProviderName: string;
        SSN: number;
        DOB: Date;
        ProviderTitle: string;
        gender: string;
        groupNPI: number;
        licenceNo: string;
        textId: number;
        drivingLicense: string;
        speciality?: any;
        malPractice?: any;
        DEACertification?: any;
        CDSPharmacyCertification?: any;
        phoneINTEGER?: any;
        faxINTEGER?: any;
        hospitalAffiiation?: any;
        cellINTEGER?: any;
        boardCertification?: any;
        medicarePTAN?: any;
        emailAddress?: any;
        medicaidTPIGroup?: any;
        CAQHCredentials?: any;
        officeEmailAddress?: any;
        CAQHID?: any;
        autorizedOfficialEmail?: any;
        CARFAcceditation?: any;
        contactOfficialEmail?: any;
        CAQHEnrollhub?: any;
        County?: any;
        created_at: Date;
        updated_at: Date;
        addresses?: Address[];
    }