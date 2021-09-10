module.exports = (sequelize, Sequelize, DataTypes) => {
    const ClaimDenialCategory = sequelize.define(
      "claim_denial_category", // Model name
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
  
    return ClaimDenialCategory;
  };
  