module.exports = (sequelize, Sequelize, DataTypes) => {
  const User = sequelize.define(
    "user", // Model name
    {
      // Attributes
      id: {
        type: DataTypes.INTEGER,
       // defaultValue: Sequelize.UUIDV4,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
      //  autoIncrement: true,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
    
      deleted: {
          type: DataTypes.BOOLEAN,
          defaultStatus:0

        },
      first_name: {
        type: DataTypes.STRING
      },
      last_name: {
        type: DataTypes.STRING
      },
      
      middle_name: {
          type: DataTypes.STRING
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

  return User;
};
