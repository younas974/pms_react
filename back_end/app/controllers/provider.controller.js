const { body } = require("express-validator");
const db = require("../models");
const { practice, address, addressType, user } = require("../models");
const { Sequelize, DataTypes, } = require("sequelize");
const Practice = db.practice;
const Address = db.address
const Provider= db.provider
const Op = db.Op;
const fs = require('fs');
const request = require('request')
let practicedata;
// Create and Save a new Book


exports.create = (req, res) => {

  let audioFile
  if(req.files.uploadfile){
    audioFile = req.files.uploadfile[0];
  }
  
  const audioGraphic = req.files.data[0];
  
 
  
 
 
   let d= fs.readFileSync('resources/static/assets/practice/uploads/'+audioGraphic.originalname)
  //fs.readFile(audioGraphic.buffer, handleFile)
  const provider= JSON.parse(d)

  const addresses= provider.addresses;
  const state_licence = provider.state_licence;
  const driving_licence = provider.driving_licence;
  const dae_certification = provider.dae_certification;
  const pharmacy_certification = provider.pharmacy_certification;
  const caqh_creditional = provider.caqh_creditional;
  let provider_id;
  
  return db.provider.create(provider)
  
    .then(provider => {

      provider_id=provider.providerId
      console.log(provider_id)
     return Promise.all([
      state_licence?  provider.createState_licence(state_licence) :'',
      driving_licence?  provider.createDriving_licence(driving_licence) :'',
      dae_certification?  provider.createDae_certification(dae_certification) :'',
      pharmacy_certification?  provider.createPharmacy_certification(pharmacy_certification) :'',
      caqh_creditional?  provider.createCaqh_creditional(caqh_creditional) :'',
      addresses.map((address)=>{
        provider.createAddress(address)
      })
     ]

     ).then((data)=>{

      Provider.findByPk(provider_id,{ 

        include:[{
      model:address,

      attributes: ['id', 'streetaddress', 'city','state','zip','country','addresstypeId'], 
     
    },
    {
         model:db.stateLicence
    },
     {
         model:db.drivingLicence
    },
    {
        model:db.DAECertification
   },
   {
    model:db.pharmacyCertification
},
{
    model:db.CAQHCreditionals
},
{
  model:db.providerProfilePic,
  attributes: ['imageType', 'imageName']
}
],
}
)
      .then(data => {
        res.send(data);
      })

    

     })
        
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book."
      });
    });


};

exports.getImage =(req, res)=>{

  const path = req.params.path;
 // const patht=req.body.path
  console.log(path)
  //console.log(patht)

  fs.readFile(path, function(err, data) {
  // fs.readFile('resources/static/assets/uploads/'+path, function(err, data) {
    if (err) {
      res.send(err)
    } // Fail if the file can't be read.
    else {
      res.writeHead(200, {'Content-Type': 'image/jpeg'});
      res.end(data); // Send the file data to the browser.
    }
  });
};



exports.deleteProviderDocument =(req,res) =>{

  let id= req.params.id
  db.providerDocument.update(
    { deleted:1}, {where:{
     id: id
    }}
  ).then(response=>{
    res.send({
      message: 'file deleted successfully'
    })
  }).catch(err =>{
    res.send(err)  
  })

}

exports.getProviderDocuments =(req,res) =>{

  let p_id=req.params.id;
  console.log(p_id)
  db.providerDocument.findAll({
    where: {
      provider_id: p_id,
      [Op.or]: [
        {
            deleted: 
            {
            [Op.is]: null
            }
        }, 
        {
            deleted: 
            {
                [Op.eq]: 0
            }
        }, 
    ]

    },
    attributes: [
      'id',
      'imageType',
      'imageName',
      'src',
      'category',
      [Sequelize.fn('date_format', Sequelize.col('created_at'), '%Y-%m-%d'), 'created_at'],
      [Sequelize.fn('date_format', Sequelize.col('updated_at'), '%Y-%m-%d'), 'updated_at'],
      'provider_id'
    ]
  }).then(result=>{

    res.send(result)

  }).catch(err =>{
    res.send(err)
  })
}


exports.uploadProviderDocuments = (req, res) => {

  const id = req.body.provider_id
  const p_id = req.body.practiceId


  db.providerDocument.create({
    imageType: req.file.mimetype,
    imageName: req.file.originalname,
    provider_id: id,
    category: req.body.category,
    created_by: req.body.created_by,
    updated_by: req.body.updated_by,
    src: '/resources/static/assets/provider/documents/' + req.file.filename
  }).then(image => {
    try {
      fs.writeFileSync(__basedir + '/resources/static/assets/practice/tmp/' + image.name, image.src);

      // exit node.js app
      res.json({ 'msg': 'File uploaded successfully!', 'file': req.file });
    } catch (e) {
      console.log(e);
      res.json({ 'err': e });
    }
  })
};


exports.uploadProfilePicture = (req, res) => {	
    console.log(req.file.originalname)
    console.log(req.body.name)

	db.providerProfilePic.create({
		imageType: req.file.mimetype,
		imageName: req.file.originalname,
    provider_id: req.body.provider_id,
		data: '/resources/static/assets/practice/providers/pimage/' + req.file.filename
	}).then(image => {
		try{
			fs.writeFileSync(__basedir + '/resources/static/assets/tmp/' + image.name, image.data);		
			
			// exit node.js app
			res.json({'msg': 'File uploaded successfully!', 'file': req.file});
		}catch(e){
			console.log(e);
			res.json({'err': e});
		}
	})
};

// Retrieve all Books from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Practice.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(500).send({
        message: err.message || "Some error accurred while retrieving books."
      });
    });
};

// retrieve address

exports.findAllAdd = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Address.findAll({include:addressType})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(500).send({
        message: err.message || "Some error accurred while retrieving books."
      });
    });
};




// Find a single Book with an id

exports.findAllProvider = (req, res) => {

    const id = req.params.id;
    console.log('hello i ma in find all')

    Provider.findAll({ 

        include:[{
      model:address,

      attributes: ['id', 'streetaddress', 'city','state','zip','country','addresstypeId'], 
      include:[{
        model:addressType,
        attributes: ['id','name']
      },
      ]

    },
    {
         model:db.stateLicence
    },
     {
         model:db.drivingLicence
    },
    {
        model:db.DAECertification
   },
   {
    model:db.pharmacyCertification
},
{
    model:db.CAQHCreditionals
},
{
    model:db.user
},
{
  model:db.providerProfilePic,
  attributes: ['imageType', 'imageName']
}
],
}
)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: `Error retrieving Book with id = ${id}`
        });
      });
  };
  



exports.findOnebyPK = (req, res) => {

  const id = req.params.id;

  db.provider.findByPk(id,{ 
    include:[{
      model:address,
  
      attributes: ['id', 'streetaddress', 'city','state','zip','country','addresstypeId'], 
      include:{
        model:addressType,
        attributes: ['id','name']
      }
    },
    {
         model:db.stateLicence
    },
     {
         model:db.drivingLicence
    },
    {
        model:db.DAECertification
   },
   {
    model:db.pharmacyCertification
  },
  {
    model:db.CAQHCreditionals
  },
  {
  model:db.providerProfilePic,
  // attributes: ['imageType', 'imageName']
  }
  ],

})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Book with id = ${id}`
      });
    });
};


exports.findOne = (req, res) => {

  const id = req.params.id;

  db.provider.findOne(
    { 

include:[{
    model:address,

    attributes: ['id', 'streetaddress', 'city','state','zip','country','addresstypeId'], 
    include:{
      model:addressType,
      attributes: ['id','name']
    }

  },
  {
       model:db.stateLicence
  },
   {
       model:db.drivingLicence
  },
  {
      model:db.DAECertification
 },
 {
  model:db.pharmacyCertification
},
{
  model:db.CAQHCreditionals
},
{
model:db.providerProfilePic,
// attributes: ['imageType', 'imageName']
}
],
where:{
  p_id:id
}
}
  )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Book with id = ${id}`
      });
    });
};

// get provider log in

exports.getProvider=(req,res)=>{
  
  const id = req.params.id;

  db.providerLogin.findAll(
    { 

      include:[{
        model:db.ProviderLogInSecQ,
        // where: {
        //     deleted:{[Op.ne]: 1},
        // },
        attributes: ['question', 'answer']
      }],

  where: {
    [Op.and]: [
      { provider_id:id},
      //{deleted:{[Op.ne]: 1},}
    ]
  }

}
  )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `No Log in Information Found `
      });
    });


}


exports.addProviderLoginInfo=(req,res)=>{

  const formvalue= req.body
  console.log(formvalue.practice_loginsec_qs[0])

  return db.providerLogin.create(formvalue).then(function(login) {


   
      return Promise.all(
        [
          formvalue.practice_loginsec_qs.map((item)=>{
          login.createProvider_loginsec_q(item)
        })
        ]
      ).then((ress)=>{
    
          db.providerLogin.findAll({
            include:[{
              model: db.ProviderLogInSecQ,
              attributes: ['question', 'answer']
            }
            ],
            where:{
              provider_id: req.body.provider_id
            }
          }
          
          ).then((result)=>{
            res.send(result)
          })
      })
    
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating ."
    });
  });

}

// Update a Book by the id in the request

exports.update = (req, res) => {
  
  
  let audioFile
  if(req.files.uploadfile){
    audioFile = req.files.uploadfile[0];
  }
  
  const audioGraphic = req.files.data[0];
  
 
   let d= fs.readFileSync('resources/static/assets/practice/uploads/'+audioGraphic.originalname)
  //fs.readFile(audioGraphic.buffer, handleFile)
  const provider= JSON.parse(d)

  const addresses= provider.addresses;
  const state_licence = provider.state_licence;
  const driving_licence = provider.driving_licence;
  const dae_certification = provider.dae_certification;
  const pharmacy_certification = provider.pharmacy_certification;
  const caqh_creditional = provider.caqh_creditional;
  let provider_id= provider.providerId;
  
  return db.provider.update(provider,
    { where: {
      providerId: provider_id 
    }
    })
  
    .then(provider => {
   
  //  console.log(provider.hasDrivingLicence)
  
  console.log(driving_licence)
     return Promise.all([

      driving_licence && driving_licence.id ?  db.drivingLicence.update(driving_licence,
        { where: {
           [Op.and]: [
             { id: driving_licence.id },
             { provider_id: provider_id },
           ]
         }
       })  :'',

       driving_licence && !driving_licence.id ?  db.drivingLicence.create(driving_licence)  :'',



      state_licence && state_licence.id ?  db.stateLicence.update(state_licence,
       { where: {
          [Op.and]: [
            { id: state_licence.id },
            { provider_id: provider_id },
          ]
        }
      }) :'',

      state_licence && !state_licence.id ?  db.stateLicence.create(state_licence)  :'',

      dae_certification && dae_certification.id?  db.DAECertification.update(dae_certification,
        { where: {
           [Op.and]: [
             { id: dae_certification.id },
             { provider_id: provider_id },
           ]
         }
       }) :'',

       dae_certification && !dae_certification.id ?  db.DAECertification.create(dae_certification)  :'',

       pharmacy_certification && pharmacy_certification.id?  db.pharmacyCertification.update(pharmacy_certification,
        { where: {
           [Op.and]: [
             { id: pharmacy_certification.id },
             { provider_id: provider_id },
           ]
         }
       }) :'',

       pharmacy_certification && !pharmacy_certification.id ?  db.pharmacyCertification.create(pharmacy_certification)  :'',

       caqh_creditional && caqh_creditional.id ?  db.CAQHCreditionals.update(caqh_creditional,
        { where: {
           [Op.and]: [
             { id: caqh_creditional.id },
             { provider_id: provider_id },
           ]
         }
       }) :'',
 
       caqh_creditional && !caqh_creditional.id ?  db.CAQHCreditionals.create(caqh_creditional)  :'',

       
      addresses.map((address)=>{
        Address.update(
          address,{
                where: {
                  [Op.and]: [
                    { id: address.id },
                    { providerProviderId: provider_id},
                    { addresstypeId: address.addresstypeId },
                  ]
                }
              }
          );
      })


     ]

     ).then((data)=>{

    
      Provider.findByPk(provider_id,{ 

        include:[{
      model:address,

      attributes: ['id', 'streetaddress', 'city','state','zip','country','addresstypeId'], 
      include:{
        model:addressType,
        attributes: ['id','name']
      }
    },
    {
         model:db.stateLicence
    },
     {
         model:db.drivingLicence
    },
    {
        model:db.DAECertification
   },
   {
    model:db.pharmacyCertification
},
{
    model:db.CAQHCreditionals
},
{
  model:db.providerProfilePic,
  attributes: ['imageType', 'imageName']
}
],
}
)
      .then(data => {
        
        res.send(data);
      })

     })
        
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Practice with id=" + id + err
      });
    });
};



// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Book.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Book was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Book with id=" + id
      });
    });
};

// Delete all Books from the database.
exports.deleteAll = (req, res) => {
  Book.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Books were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all books."
      });
    });
};

// Find all published Books
exports.findAllPublished = (req, res) => {
  Book.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving books."
      });
    });
};
