module.exports = (sequelize, DataTypes) => {
    const Practice = sequelize.define(
        "practice", // Model name
        {
            // Model attributes
            p_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            PracticeName: {
                type: DataTypes.STRING
            },
            groupNPI: {
                type: DataTypes.BIGINT
            },
            licenceNo: {
                type: DataTypes.STRING
            },
            textId: {
                type: DataTypes.INTEGER
            },
           
            malPractice: {
                type: DataTypes.STRING
            },
           
            DEACertification: {
                type: DataTypes.STRING
            },

            CDSPharmacyCertification: {
                type: DataTypes.STRING
            },
            phoneINTEGER: {
                type: DataTypes.STRING
            },
            faxINTEGER: {
                type: DataTypes.STRING
            },
            hospitalAffiiation: {
                type: DataTypes.STRING
            },
            cellNumber: {
                type: DataTypes.STRING
            },
            
            medicarePTAN: {
                type: DataTypes.STRING
            },
            emailAddress: {
                type: DataTypes.STRING
            },
            medicaidTPIGroup: {
                type: DataTypes.STRING
            },
           
            officeEmailAddress: {
                type: DataTypes.STRING
            },
           
            autorizedOfficialEmail: {
                type: DataTypes.STRING
            },
            CARFAcceditation: {
                type: DataTypes.STRING
            },
            contactOfficialEmail: {
                type: DataTypes.STRING
            },
            
            County: {
                type: DataTypes.STRING
            },

            created_at: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE
            },
            deleted: {
                type: DataTypes.BOOLEAN,
                defaultStatus:0
      
              },
            
        },

        {
            // Options
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

  
    
    return Practice;
};
