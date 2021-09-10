module.exports = (sequelize, Sequelize, DataTypes) => {
    const Address = sequelize.define(
      "address", // Model name
      {
        // Attributes
        id: {
             type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true

        },
        streetaddress: {
          type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING
          },
          state: {
            type: DataTypes.STRING
          },
        zip: {
          type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING
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
  
    // User.associate = models=>{
    //   User.belongsTo(models.practice,{foreignKey: 'P_id', targetKey: 'P_id'})
    // }
  
    return Address;
  };