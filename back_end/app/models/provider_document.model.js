module.exports = (sequelize, Sequelize, DataTypes) => {
    const ProviderDocument = sequelize.define(
      "provider_document", // Model name
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
        src: DataTypes.STRING ,
        category:  DataTypes.STRING ,
        
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
  
    return ProviderDocument;
  };
  