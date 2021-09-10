module.exports = (sequelize, Sequelize, DataTypes) => {
    const ProviderLogin = sequelize.define(
      "provider_login", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        applicationName: {
          type: DataTypes.STRING
        },
        userName: {
          type: DataTypes.STRING
        },
        link: {
          type: DataTypes.STRING
        },
        password: {
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
  
    return ProviderLogin;
  };
  