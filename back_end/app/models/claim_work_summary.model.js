module.exports = (sequelize, Sequelize, DataTypes) => {
    const ClaimWorkSummary = sequelize.define(
      "work_summary", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
      
        claim_date: {
            type: DataTypes.STRING
          },
          
          remarks: {
            type: DataTypes.TEXT
          },
          billed_after_patient: {
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
  
    return ClaimWorkSummary;
  };
  