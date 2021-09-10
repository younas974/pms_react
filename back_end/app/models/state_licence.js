module.exports = (sequelize, Sequelize, DataTypes) => {
    const StateLicence = sequelize.define(
      "state_licence", // Model name
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
        author: {
          type: DataTypes.STRING
        },
        effective_date: {
          type: DataTypes.STRING
        },
        expiry_date: {
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
  
    return StateLicence;
  };
  