module.exports = (sequelize, Sequelize, DataTypes) => {
    const SubStatusZeroOut = sequelize.define(
      "sub_status_zero_out", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        sub_status_id: {
            type: DataTypes.INTEGER,
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
  
    return SubStatusZeroOut;
  };
  