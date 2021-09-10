module.exports = (sequelize, Sequelize, DataTypes) => {
    const Claim = sequelize.define(
      "claim", // Model name
      {
        // Attributes
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        
        },
        claim_id: {
          type: DataTypes.INTEGER,
          primaryKey:true,
          unique: true
        },
        rendering_provider: {
          type: DataTypes.STRING
        },
        insurance_name: {
          type: DataTypes.STRING
        },
        sec_insurance: {
          type: DataTypes.STRING
        },

        billing_provider: {
          type: DataTypes.STRING
        },
        facility_location: {
          type: DataTypes.STRING
        },
        patient_accountNo: {
          type: DataTypes.STRING
        },
        patient_DOB: {
          type: DataTypes.STRING
        },
        first_submission_date: {
          type: DataTypes.STRING
        },

        last_submission_date: {
          type: DataTypes.STRING
        },

        current_insurance: {
          type: DataTypes.STRING
        },
        insurance_payment: {
          type: DataTypes.STRING
        },

        insurance_address: {
          type: DataTypes.STRING
        },
        insurance_phone: {
          type: DataTypes.STRING
        },
        
        patient_name: {
          type: DataTypes.STRING
        },
        claim_date: {
            type: DataTypes.STRING
          },
          service_date: {
            type: DataTypes.STRING
          },
          charges: {
            type: DataTypes.DECIMAL
          },

          allowed_amount: {
            type: DataTypes.DECIMAL
          },
          balance: {
            type: DataTypes.DECIMAL
          },
          paid_amount: {
            type: DataTypes.DECIMAL
          },
          patient_resp: {
            type: DataTypes.DECIMAL
          },
          patient_payment: {
            type: DataTypes.DECIMAL
          },
          secondary_payment: {
            type: Sequelize.STRING
          },
          other_payment: {
            type: Sequelize.STRING
          },
          
          adjustment_amount: {
            type: DataTypes.DECIMAL
          },

          is_worked: {
            type: DataTypes.BOOLEAN
          },
          deleted: {
            type: DataTypes.INTEGER,
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
  
    // User.associate = models=>{
    //   User.belongsTo(models.practice,{foreignKey: 'P_id', targetKey: 'P_id'})
    // }
  
    return Claim;
  };
  