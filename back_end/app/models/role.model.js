module.exports = (sequelize, Sequelize, DataTypes) => {
  const Role = sequelize.define(
    "role", // Model name
    {
      // Attributes
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      name: {
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

  return Role;
};
