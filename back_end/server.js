const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
const cors = require("cors");
const config = require("./app/config/config.js");
const authRoutes = require('./app/routes/auth.routes')
const practiceRoutes = require('./app/routes/practice.routes')
const provierRoutes = require('./app/routes/provider.routes')
const claimRoutes = require('./app/routes/claim.routes')
const db = require("./app/models");
const await = require("await");
const path = require('path')

const app = express();
global.__basedir = __dirname;

const corsOptions = {
  origin:   "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cookieParser());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')))
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );

  next();
});

// database

const Role = db.role;
const Address = db.addressType;
const User= db.user
const Desiginatin=db.desiginiation
const Department=db.department

db.sequelize.sync(
  {

 // force: true
}
).then(() => {

  // initial(); // Just use it in development, at the first time execution!. Delete it in production
  // initialaddress();
  // initializeStatus();

});

// simple route
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



app.use('/api',authRoutes)
app.use('/api',practiceRoutes)
app.use('/api', provierRoutes)
app.use('/api', claimRoutes)

// set port, listen for requests
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Just use it in development, at the first time execution!. Delete it in production
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "teamLead"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
  Role.create({
    id: 4,
    name: "manager"
  });

  Role.create({
    id: 5,
    name: "superUser"
  });


User.create({
  id:1,
  username: "admin@prombs.com",
  password:"Admin",
  employee_id:1,
  first_name: 'Admin',
  last_name:'Admin'

}).then(data=>{
  Role.findAll().then(result=>{
        if(result){
          result.map(item=>{
            data.addRole(item.id, { through: { selfGranted: false } })
          })
         
        }
  })
}).catch(error=>{
  console.log(error)
})

User.create({
  id:4,
  username: "saif@prombs.com",
  password:"Saif@2021",
  employee_id:4,
  first_name: 'Saif',
  last_name:'Ullah'

}).then(data=>{
  Role.findAll().then(result=>{
        if(result){
          result.map(item=>{
            data.addRole(item.id, { through: { selfGranted: false } })
          })
         
        }
  })
}).catch(error=>{
  console.log(error)
})

User.create({
  id:5,
  username: "credentialing@prombs.com",
  password:"credentialing@2021",
  employee_id:5,
  first_name: 'Credentialing',
  last_name:'Credentialing'

}).then(data=>{
  Role.findAll().then(result=>{
        if(result){
          result.map(item=>{
            data.addRole(item.id, { through: { selfGranted: false } })
          })
         
        }
  })
}).catch(error=>{
  console.log(error)
})

User.create({
  id:2,
  username: "myounas@prombs.com",
  password:"123456",
  employee_id:2,
  first_name: 'Muhammad',
  last_name:'Younas'
})

User.create({
  id:3,
  username: "testing@prombs.com",
  password:"123456",
  employee_id:3,
  first_name: 'Testing',
  last_name:'Prombs'
})

Desiginatin.create({
  id:1,
  title:'billing Exective'
})
Desiginatin.create({
  id:2,
  title:'Team Lead'
})

Desiginatin.create({
  id:3,
  title:'Manager Operation'
})

Desiginatin.create({
  id:4,
  title:'Director Operation'
})

Department.create({
  id:1,
  title: 'IT'
})

Department.create({
  id:2,
  title: 'Operation'
})

Department.create({
  id:3,
  title: 'Creditionaling'
})

Department.create({
  id:4,
  title: 'Homan Resource'
})

Department.create({
  id:5,
  title: 'Admin'
})

}

function initialaddress() {

  Address.create({
    id:1,
    name:"home"
  })
  Address.create({
    id:2,
    name:"service"
  })
  Address.create({
    id:3,
    name:"mailing"
  })

  Address.create({
    id:4,
    name:"payto"
  })




}

async function  initializeStatus(){


await db.claimStatus.bulkCreate(
  [
  {title: 'Paid'},
  {title: 'Denied'},
  {title: 'In Process'},
  {title: 'Not Received'},
  {title: 'Zeroed Out'},
  {title: 'Voice Message Left'},]

)

await db.claimSubStatus.bulkCreate(
  [

    {title: 'Paid Not Posted'  },
    {title: 'Paid Not Cleared' },
    {title: 'Zeroed Out'       },
    {title: 'Denied-  Refiled/Reprocessing'},
    {title: 'Denied - Office Assistance'},
    {title: 'Appeal - Denied'},
    {title: 'Denied - Coding Assistance'},
    {title: 'Claim- Inprocess'},
    {title: 'Appeal - Inprocess'},
    {title: 'Approved to Pay'},
    {title: 'Not Received - Refiled '},
    {title: 'Zeroed Out'},
    {title: 'Voice Message Left'},
  ]
)


await db.subStatusPaid.bulkCreate(
  [

    {title: 'Paid Not Posted', sub_status_id: 1},
    {title: 'Paid Not Cleared', sub_status_id: 2},
    {title: 'Zeroed Out', sub_status_id: 3},
  ]

)

await db.subStatusDenial.bulkCreate(
  [
    {title: 'Denied-  Refiled/Reprocessing' , sub_status_id: 4},
    {title: 'Denied - Office Assistance' , sub_status_id: 5},
    {title: 'Appeal - Denied' , sub_status_id: 6},
    {title: 'Denied - Coding Assistance' , sub_status_id: 7},
  ]

)
await db.subStatusInProcess.bulkCreate(
  [
    {title: 'Claim- Inprocess' , sub_status_id: 8},
    {title: 'Appeal - Inprocess' , sub_status_id: 9},
    {title: 'Approved to Pay' , sub_status_id: 10},
  ]

)

await db.subStatusNotReceived.create(
  {title: 'Not Received - Refiled ' , sub_status_id: 11}
)

await db.subStatusZeroOut.create(
  {title: 'Zeroed Out' , sub_status_id: 12}
)

await db.subStatusVoicMessageLeft.create(
  {title: 'Voice Message Left',  sub_status_id: 13}
)


await db.claimCorrectiveAction.bulkCreate(

  [
    {title: 'Refiled - Electronic'},
    {title: 'Denied - Office Assistance'},
    {title: 'Escalated to Posting'},
    {title: 'Submitted Medical Record'},
    {title: 'Patient Billed'},
    {title: 'Reprocessed'},
    {title: 'Payment posted'},
    {title: 'Appealed'},
    {title: 'Write - Off'},
    {title: 'Fax\Email Sent'},
    {title: 'Denied - Coding Assistance'},
    {title: 'Voice Message Left'},
    {title: 'Zeroed Out'},

  ]

)



await db.claimDenialCategory.bulkCreate(

  [
    {title: 'Denial Category'},
    {title: 'Authorization/Referral'},
    {title: 'Requesting Medical Records'},
    {title: 'Medical Necessity'},
    {title: 'Incorrect/Inaccurate - Insurance Billed'},
    {title: 'Covered by another payer'},
    {title: 'Non Covered - LCD/ NCD '},
    {title: 'Requesting Additional Information - Patien'},
    {title: 'Requesting Additional Information - Provid'},
    {title: 'Billing/Coding Issue'},
    {title: 'Bundled'},
    {title: 'Coordination of Benefits'},
    {title: 'Dx Inconsistent with CPT'},
    {title: 'Invalid/Inaccurate - Claim Information'},
    {title: 'Invalid/Inaccurate - Patient Demographics'},
    {title: 'Maximum Benefits Reached'},
    {title: 'Requesting Primary EOB'},
    {title: 'Non - Covered Service - Provider'},
    {title: 'Non - Covered Service - Patient'},
    {title: 'Missing/Invalid - CPT'},
    {title: 'Missing/Invalid - Taxonomy'},
    {title: 'Missing/Invalid Modifier'},
    {title: 'Missing/Invalid Place of Service'},
    {title: 'Credentialing Issue'},
    {title: 'Policy Inactive'},
    {title: 'Missing/ Invalid provider details'},
    {title: 'Paid to Another provider'},
    {title: 'Out Of Network Provider'},
    {title: 'Reffering Physician Required'},
    {title: 'Pre - Existing Investigation'},
    {title: 'Primary Paid More than Secondary Allowable'},
    {title: 'Requesting Accident Information'},
    {title: 'Work - Related Injury'},
    {title: 'Timely Filing'},
    {title: 'Denied in Error'},
    {title: 'Units/Frequency & Global Limitations'},
    {title: 'Appeal Denied'},
    {title: 'Patient Died'},
    {title: 'Captation'},
    {title: 'Duplicate'},
    {title:'Benefit Exhausted'},
  ]

)

}