module.exports = (sequelize, Sequelize, DataTypes) => {
    const PharmacyCertification = sequelize.define(
      "pharmacy_certification", // Model name
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
        deleted: {
          type: DataTypes.BOOLEAN,
          defaultStatus:0

        },
        updated_at: {
          allowNull: false,
          type: DataTypes.DATE
        }
      },
      {
        // Options
        timestamps: true,
        underscrored: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    );
  
    return PharmacyCertification;
  };
  