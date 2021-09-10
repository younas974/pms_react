module.exports = (sequelize, Sequelize) => {
	const Payment_Src = sequelize.define('payment_src', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},

	
		src: {
			type: Sequelize.STRING
		},

		attachment: {
			type: Sequelize.STRING
		},
		deleted: {
			type: Sequelize.INTEGER
		},

		
	},
		{
			// Options
			timestamps: true,
			underscrored: true,
			createdAt: "created_at",
			updatedAt: "updated_at"
		});

	return Payment_Src;
}