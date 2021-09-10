module.exports = (sequelize, Sequelize, DataTypes) => {
    const Provider = sequelize.define(
        "provider", // Model name
        {
            // Model attributes
            providerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            providerFirstName: {
                type: DataTypes.STRING
            },
            providerLastName: {
                type: DataTypes.STRING
            },
            providerMiddleName: {
                type: DataTypes.STRING
            },

            SSN: {
                type: DataTypes.INTEGER
            },

            individualNPI: {
                type: DataTypes.INTEGER
            },
            DOB: {
                type: DataTypes.STRING
            },
            providerTitle: {
                type: DataTypes.STRING
            },
           
            gender: {
                type: DataTypes.STRING
            },
           
            textId: {
                type: DataTypes.INTEGER
            },

            speciality: {
                type: DataTypes.STRING
            },
            phoneNumber: {
                type: DataTypes.STRING
            },
            faxINTEGER: {
                type: DataTypes.STRING
            },
           
            cellNumber: {
                type: DataTypes.STRING
            },
            
            boardCertification: {
                type: DataTypes.STRING
            },
            medicarePTAN: {
                type: DataTypes.STRING
            },

            emailAddress: {
                type: DataTypes.STRING
            },
            medicaidProviderNumber: {
                type: DataTypes.STRING
            },
           
            officeEmailAddress: {
                type: DataTypes.STRING
            },
           
            CARFAcceditation: {
                type: DataTypes.STRING
            },
            CAQHID: {
                type: DataTypes.STRING
            },
            contactOfficeEmail: {
                type: DataTypes.STRING
            },
            
            
            CARFAcreditation: {
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

    return Provider;
};
