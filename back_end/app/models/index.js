const config = require("../config/config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASS,
 
  
  {
    host: config.db.DB_HOST,
    dialect: config.db.dialect,
    operatorsAliases: false,
    timezone: 'Asia/Karachi', // your timezone comes here, ex.: 'US/Hawaii'

    poll: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.books = require("./book.model.js")(sequelize, Sequelize, DataTypes);
db.user = require("./user.model.js")(sequelize, Sequelize, DataTypes);
db.role = require("./role.model.js")(sequelize, Sequelize, DataTypes);
db.practice = require("./practice.model.js")(sequelize, Sequelize, DataTypes);
db.address= require("./address.model")(sequelize, Sequelize, DataTypes)
db.addressType= require("./addressType.model")(sequelize, Sequelize, DataTypes)
db.provider=require("./provider.model")(sequelize, Sequelize, DataTypes)
db.stateLicence=require("./state_licence")(sequelize, Sequelize, DataTypes)
db.drivingLicence=require("./driving_licence")(sequelize, Sequelize, DataTypes)
db.DAECertification=require("./DAE_certification")(sequelize, Sequelize, DataTypes)
db.pharmacyCertification=require("./pharmacy_certification")(sequelize, Sequelize, DataTypes)
db.CAQHCreditionals=require("./CAQH_creditionals")(sequelize, Sequelize, DataTypes)
db.providerProfilePic=require("./provider_profile_image")(sequelize, Sequelize, DataTypes)
db.practiceProfilePic=require("./practice_profile_image")(sequelize, Sequelize, DataTypes)
db.employee= require("./employees.model")(sequelize, Sequelize, DataTypes)
db.claims= require("./claim.model")(sequelize, Sequelize, DataTypes)
db.workSummary= require("./claim_work_summary.model")(sequelize, Sequelize, DataTypes)
db.customer= require("./customer.model")(sequelize, Sequelize, DataTypes)
db.claimStatus= require("./status.model")(sequelize, Sequelize, DataTypes)
db.subStatusPaid= require("./substatuspaid.model")(sequelize, Sequelize, DataTypes)
db.subStatusDenial=require("./sub_status_denial")(sequelize, Sequelize, DataTypes)
db.subStatusInProcess=require("./sub_status_inprocess")(sequelize, Sequelize, DataTypes)
db.subStatusNotReceived=require("./substatus_notreceived")(sequelize, Sequelize, DataTypes)
db.subStatusZeroOut=require("./substatus_zeroout")(sequelize, Sequelize, DataTypes)
db.subStatusVoicMessageLeft=require("./substatus_voicemessage_left")(sequelize, Sequelize, DataTypes)
db.claimSubStatus=require("./sub_status")(sequelize, Sequelize, DataTypes)
db.claimCorrectiveAction=require("./corrective_action")(sequelize, Sequelize, DataTypes)
db.claimDenialCategory=require("./claim_denial_category")(sequelize, Sequelize, DataTypes)
db.providerLogin=require("./provider_login.model")(sequelize, Sequelize, DataTypes)
db.ProviderLogInSecQ=require("./providerloginsec_q")(sequelize, Sequelize, DataTypes)
db.practiceLogin=require("./practice_login.model")(sequelize, Sequelize, DataTypes)
db.PracticeLogInSecQ=require("./practiceloginsec_q")(sequelize, Sequelize, DataTypes)
db.Cpt=require("./cpt.model")(sequelize, Sequelize, DataTypes)
db.paymentSource=require("./payment_src.model")(sequelize, Sequelize, DataTypes)
db.team=require("./team.model")(sequelize, Sequelize, DataTypes)
db.desiginiation=require("./desigination.model")(sequelize, Sequelize, DataTypes)
db.department=require("./department.model")(sequelize, Sequelize, DataTypes)
db.practiceDocument=require("./practice_documnts.model")(sequelize, Sequelize, DataTypes)
db.providerDocument=require("./provider_document.model")(sequelize, Sequelize, DataTypes)


db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "role_id",
  otherKey: "user_id"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "user_id",

  otherKey: "role_id"
});



db.ROLES = ["user", "admin", "moderator"];

// associations

// practice and user practice module
db.practice.belongsToMany(db.user, {through: "user_practices"})
db.user.belongsToMany(db.practice, {through: "user_practices"})

// address and address-type
db.address.belongsTo(db.addressType);
db.addressType.hasMany(db.address)

db.address.belongsTo(db.practice)
db.practice.hasMany(db.address)

// created by updated by association all tables 

db.Cpt.belongsTo(db.user, { as: 'createdBy',foreignKey: 'created_by', allowNull: false,  defaultValue:1});
db.Cpt.belongsTo(db.user, {as: 'updatedBy', foreignKey: 'updated_by', allowNull: false, defaultValue:1});

db.practice.belongsTo(db.user, { as: 'createdBy',foreignKey: 'created_by', allowNull: false,  defaultValue:1});
db.practice.belongsTo(db.user, {as: 'updatedBy', foreignKey: 'updated_by', allowNull: false, defaultValue:1});

db.practiceProfilePic.belongsTo(db.user, { as: 'createdBy',foreignKey: 'created_by' , defaultValue:1});
db.practiceProfilePic.belongsTo(db.user, {as: 'updatedBy',foreignKey: 'updated_by',  defaultValue:1});

db.address.belongsTo(db.user, { as: 'createdBy',foreignKey: 'created_by' , defaultValue:1});
db.address.belongsTo(db.user, {as: 'updatedBy',foreignKey: 'updated_by',  defaultValue:1});

db.addressType.belongsTo(db.user, { as: 'createdBy',foreignKey: 'created_by' , defaultValue:1});
db.addressType.belongsTo(db.user, {as: 'updatedBy',foreignKey: 'updated_by',  defaultValue:1});

db.CAQHCreditionals.belongsTo(db.user, { as: 'createdBy',foreignKey: 'created_by' , defaultValue:1});
db.CAQHCreditionals.belongsTo(db.user, {as: 'updatedBy',foreignKey: 'updated_by',  defaultValue:1});

db.DAECertification.belongsTo(db.user, { as: 'createdBy',foreignKey: 'created_by' , defaultValue:1});
db.DAECertification.belongsTo(db.user, {as: 'updatedBy',foreignKey: 'updated_by',  defaultValue:1});

db.drivingLicence.belongsTo(db.user, { as: 'createdBy',foreignKey: 'created_by' , defaultValue:1});
db.drivingLicence.belongsTo(db.user, {as: 'updatedBy',foreignKey: 'updated_by',  defaultValue:1});

db.pharmacyCertification.belongsTo(db.user, { as: 'createdBy',foreignKey: 'created_by' , defaultValue:1});
db.pharmacyCertification.belongsTo(db.user, {as: 'updatedBy',foreignKey: 'updated_by',  defaultValue:1});

db.providerProfilePic.belongsTo(db.user, { as: 'createdBy',foreignKey: 'created_by' , defaultValue:1});
db.providerProfilePic.belongsTo(db.user, {as: 'updatedBy',foreignKey: 'updated_by',  defaultValue:1});

db.role.belongsTo(db.user, { as: 'createdBy',foreignKey: 'created_by' , defaultValue:1});
db.role.belongsTo(db.user, {as: 'updatedBy',foreignKey: 'updated_by',  defaultValue:1});

db.stateLicence.belongsTo(db.user, { as: 'createdBy',foreignKey: 'created_by' , defaultValue:1});
db.stateLicence.belongsTo(db.user, {as: 'updatedBy',foreignKey: 'updated_by',  defaultValue:1});

db.user.belongsTo(db.user, { as: 'createdBy',foreignKey: 'created_by' , defaultValue:1});
db.user.belongsTo(db.user, {as: 'updatedBy',foreignKey: 'updated_by',  defaultValue:1});

db.provider.belongsTo(db.user, { as: 'createdBy',foreignKey: 'created_by' , defaultValue:1});
db.provider.belongsTo(db.user, {as: 'updatedBy',foreignKey: 'updated_by',  defaultValue:1});

db.employee.belongsTo(db.user, { as: 'createdBy',foreignKey: 'created_by' , defaultValue:1});
db.employee.belongsTo(db.user, {as: 'updatedBy',foreignKey: 'updated_by',  defaultValue:1});
db.employee.belongsTo(db.user, {as: 'credentials',foreignKey: 'user_id',  defaultValue:1});

db.claims.belongsTo(db.user, { as: 'createdBy',foreignKey: 'created_by' , defaultValue:1});
db.claims.belongsTo(db.user, {as: 'updatedBy',foreignKey: 'updated_by',  defaultValue:1});
db.claims.belongsTo(db.user, {as: 'assignedBy',foreignKey: 'assigned_by', targetKey: 'employee_id',  defaultValue:1});
db.claims.belongsTo(db.user, {as: 'assignedTo',foreignKey: 'assigned_to', targetKey: 'employee_id',   defaultValue:1});

db.workSummary.belongsTo(db.user, { as: 'createdBy',foreignKey: 'created_by' , targetKey: 'employee_id', defaultValue:1});
db.workSummary.belongsTo(db.user, {as: 'updatedBy',foreignKey: 'updated_by',   targetKey: 'employee_id', defaultValue:1});

db.practiceDocument.belongsTo(db.user, { as: 'createdBy',foreignKey: 'created_by' , targetKey: 'employee_id', defaultValue:1});
db.practiceDocument.belongsTo(db.user, {as: 'updatedBy',foreignKey: 'updated_by',   targetKey: 'employee_id', defaultValue:1});

db.providerDocument.belongsTo(db.user, { as: 'createdBy',foreignKey: 'created_by' , targetKey: 'employee_id', defaultValue:1});
db.providerDocument.belongsTo(db.user, {as: 'updatedBy',foreignKey: 'updated_by',   targetKey: 'employee_id', defaultValue:1});

db.user.belongsTo(db.desiginiation, {as: 'desigination', foreignKey: "desigination_id" })
db.desiginiation.hasOne(db.user, {as: 'user', foreignKey: "desigination_id" } )


db.user.belongsTo(db.department, {as: 'department', foreignKey: "department_id" })
db.department.hasOne(db.user, {as: 'user', foreignKey: "department_id" })

db.user.belongsTo(db.team, {as: 'team', foreignKey:  'team_id'})
db.team.hasOne(db.user, {as: 'user', foreignKey:  'team_id'})

db.practice.hasOne(db.practiceProfilePic, {foreignKey: "practice_id"})
db.practice.hasMany(db.practiceDocument, {foreignKey: "practice_id"})
db.practiceDocument.belongsTo(db.practice, {foreignKey: "practice_id"})

db.provider.hasMany(db.providerDocument, {foreignKey: "provider_id"})
db.providerDocument.belongsTo(db.provider, {foreignKey: "provider_id"})

// claim and claim work summary association

db.workSummary.belongsTo(db.claims, {foreignKey: "claim_id", targetKey: "claim_id"})
db.claims.hasMany(db.workSummary,{foreignKey: "claim_id", sourceKey: "claim_id" })
db.claims.hasMany(db.Cpt,{foreignKey: "claim_id", sourceKey: "claim_id"})
db.Cpt.belongsTo(db.claims, { foreignKey: "claim_id", targetKey: "claim_id"})
db.Cpt.hasMany(db.paymentSource,{foreignKey: "cpt_id", sourceKey: "id"})
db.claims.hasMany(db.paymentSource,{foreignKey: "claim_id", sourceKey: "claim_id"})

// provider module associations

db.provider.belongsTo(db.practice, { foreignKey: "p_id"})
db.practice.hasMany(db.provider,{ foreignKey: "p_id"})

// provider table related associations
db.provider.hasOne(db.stateLicence, {foreignKey: "provider_id"})
db.provider.hasOne(db.drivingLicence, {foreignKey: "provider_id"})
db.provider.hasOne(db.DAECertification, {foreignKey: "provider_id"})
db.provider.hasOne(db.pharmacyCertification, {foreignKey: "provider_id"})
db.provider.hasOne(db.CAQHCreditionals, {foreignKey: "provider_id"})
db.provider.hasOne(db.providerProfilePic, {foreignKey: "provider_id"})
db.provider.hasOne(db.providerLogin, {foreignKey: "provider_id"})
db.practice.hasOne(db.practiceLogin, {foreignKey: "p_id"})
db.providerProfilePic.belongsTo(db.user, {foreignKey: {field: 'created_by'}})
db.providerProfilePic.belongsTo(db.user, {foreignKey: {field: 'updated_by'}})
db.providerLogin.hasMany(db.ProviderLogInSecQ, {foreignKey:'login_id'})
db.practiceLogin.hasMany(db.PracticeLogInSecQ, {foreignKey:'login_id'})

// work summary one to N association


//db.claimStatus.hasMany(db.workSummary,{foreignKey:  'claim_status', sourceKey: 'id'})
db.workSummary.belongsTo(db.claimStatus, { as: 'status',foreignKey: 'claim_status' , defaultValue:0});
db.workSummary.belongsTo(db.claimSubStatus, { as: 'sub_status',foreignKey: 'substatus' , defaultValue:0});
db.workSummary.belongsTo(db.claimCorrectiveAction, { as: 'action',foreignKey: 'creative_action' , defaultValue:0});
db.workSummary.belongsTo(db.claimDenialCategory, { as: 'denialCategory',foreignKey: 'denial_category' , defaultValue:0});


// provider addresses 
db.address.belongsTo(db.provider,)
db.provider.hasMany(db.address)


// claim association with practice

db.practice.hasMany(db.claims,{foreignKey:'p_id'})
db.provider.hasMany(db.claims, {foreignKey: 'provider_id'})





module.exports = db;
