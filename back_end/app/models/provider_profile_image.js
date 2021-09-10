module.exports = (sequelize, Sequelize, DataTypes) => {
    const ProviderProfilePic = sequelize.define(
      "provider_profile_pic", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        imageType: DataTypes.STRING,
        imageName: DataTypes.STRING,
        data: DataTypes.BLOB('long') ,
        
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
  
    return ProviderProfilePic;
  };
  