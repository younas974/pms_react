module.exports = (sequelize, Sequelize, DataTypes) => {
    const Employee = sequelize.define(
      "employee", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        employee_id: {
          type: DataTypes.INTEGER,
          primaryKey:true,
          unique: true
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
          designation: {
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
  
    return Employee;
  };
  