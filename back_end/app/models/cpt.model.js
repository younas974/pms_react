module.exports = (sequelize, Sequelize) => {
	const Cpt = sequelize.define('cpt', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		
		cpt: {
			type: Sequelize.STRING
		},

		dx1: {
			type: Sequelize.STRING
		},
		dx2: {
			type: Sequelize.STRING
		},
		dx3: {
			type: Sequelize.STRING
		},
		dx4: {
			type: Sequelize.STRING
		},

		mod1: {
			type: Sequelize.STRING
		},
		mod2: {
			type: Sequelize.STRING
		},
		mod3: {
			type: Sequelize.STRING
		},
		charges: {
			type: Sequelize.DECIMAL
		},

		paid_amount: {
			type: Sequelize.DECIMAL
		},

		balance: {
			type: Sequelize.DECIMAL
		},
		allowed_amount: {
			type: Sequelize.DECIMAL
		},
		patient_resp: {
			type: Sequelize.DECIMAL
		},
		patient_payment: {
            type: Sequelize.DECIMAL
          },
		insurance_payment: {
			type: Sequelize.DECIMAL
		},
		secondary_payment: {
			type: Sequelize.DECIMAL
		},
		other_payment: {
			type: Sequelize.DECIMAL
		},
		adjustment_amount: {
            type: Sequelize.DECIMAL
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

	return Cpt;
}