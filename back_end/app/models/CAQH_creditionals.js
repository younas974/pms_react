module.exports = (sequelize, Sequelize, DataTypes) => {
    const CAQHCreditional = sequelize.define(
      "caqh_creditional", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        title: {
          type: DataTypes.STRING
        },
        user_id: {
          type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
          },
        effective_date: {
          type: DataTypes.DATE
        },
        expiry_date: {
            type: DataTypes.DATE
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
  
    return CAQHCreditional;
  };
  