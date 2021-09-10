module.exports = (sequelize, Sequelize) => {
	const UsePractice = sequelize.define('user_practice', {
	
		practicePId: {
			type: Sequelize.INTEGER
		},
		userId: {
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

	return UsePractice;
}