module.exports = (sequelize, Sequelize, DataTypes) => {
    const ProviderLoginSecQ = sequelize.define(
      "provider_loginsec_q", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        question: {
          type: DataTypes.STRING
        },
        answer: {
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
  
    return ProviderLoginSecQ;
  };
  