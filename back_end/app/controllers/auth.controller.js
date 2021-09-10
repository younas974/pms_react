const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const expressJwt = require('express-jwt')
const { practice, address, addressType } = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Op;

exports.signup = (req, res) => {
  // Save user to database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // User role 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll=(req,res) => {
  const id =req.params.id

User.findAll({include:[{
  model:practice, 
  attributes: ['p_id', 'PracticeName'], 
  through: {
    where: { userId: id },
    attributes: []
  },
}],
where:{
id:id
},
attributes: ['id','username',]
}).then(result=>{
  res.send(result);
 
}).catch(err => {
  res.send(500).send({
    message: err.message || "Some error accurred while retrieving books."
  });
})
}

exports.findAllUsers=(req, res)=>{


  // db.desiginiation.findAll({
  //   include:{
  //     model:  db.user,
  //         as: 'user',
  //   }
  // }).then(data=>{
  //   res.send(data)
  // }).then(error=>{
  //   res.send(error)
  // })

  db.user.findAll({
    attributes:['employee_id','first_name','last_name'],
    include:[{
      model:  db.desiginiation,
      as: 'desigination',
      attributes:[],
      where:{
        id:1
      }
     
    }]
  }).then(data=>{

    res.send(data)

  }).catch(error=>{
    res.send(error)
  })

}

exports.findAllAdmin=(req,res)=>{

  db.user.findAll(

  {
   where:{
     include: db.role,
    through: {
      where: { role_id: 3 },
      attributes: []
    },

   }
  }
  //  {
  //   include:{
  //     model: db.role,
  //     through: {
  //       where: { role_id: 3 },
  //       attributes: []
  //     },
  //   },
  
  //  }
  ).then(data=>{
    
    res.send(data)
  }).catch(error=>{
    res.send(error)
  })

}


exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
     
      let passwordIsValid=false

      // let passwordIsValid = bcrypt.compareSync(
      //   req.body.password,
      //   user.password
      // );

      if(req.body.password==user.password){
        passwordIsValid=true
      }
     
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      const  JWT_SECRET= '4DF456D4FS64FD46545';
      const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '1d'});      
      // let token = jwt.sign({ id: user.id }, config.auth.secret, {
      //   expiresIn: 86400 // 24 hours
      // });

      res.cookie('token', token, {expiresIn: '1d'});
      let authorities = [];
      
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        User.findAll({include:[{
  model:practice, 
  attributes: ['p_id', 'PracticeName'], 
  through: {
    where: { userId: user.id },
    attributes: []
  },
},
{
  model: db.department,
 as :'department', attributes:['id', 'title']
}],
where:{
id:user.id
},
attributes: []
}).then(practices=>{
  console.log('below are the practices')
  console.log(practices)
  let userpractice=[];
  if(practices[0].practices.length>0){
   userpractice= practices[0].practices
  }

  res.status(200).send({
    id: user.id,
    username: user.username,
    email: user.email,
    roles: authorities,
    accessToken: token,
    practices: userpractice,
    employee_id: user.employee_id,
    department: practices[0].department

  });
 
})
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.requireSignin = expressJwt({

  secret: '4DF456D4FS64FD46545', algorithms: ['RS256']
})

exports.signout = (req,res)=>{
  
  res.clearCookie("token")
  res.json({
      message: "sign out succesfully"
  });
};


