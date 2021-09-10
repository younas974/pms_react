const { body } = require("express-validator");
const db = require("../models");
const { practice, address, addressType, user } = require("../models");
const { Sequelize, DataTypes, Op } = require("sequelize");
const Practice = db.practice;
const Address = db.address
const fs = require('fs');
const await = require("await");
let practicedata;
// Create and Save a new Book
exports.create = async (req, res) => {


  let user_id = req.body.createdById;

  const practice = req.body

  // Save Book in database


  await Practice.create(req.body)

    .then(data => {

      db.user.findAll({
        //  where:{
        //           id:1
        //     }


      })


      console.log(data)
      data.addUser(1, { through: { selfGranted: false } })
      let id = data.p_id;

      console.log(data.p_id)
      Promise.all([
        req.body.addresses.map((item) => {
          Address.create({
            streetaddress: item.streetaddress,
            city: item.city,
            state: item.state,
            zip: item.zip,
            addresstypeId: item.addresstypeId,
            practicePId: data.p_id
          })
        })
      ]).then(async data  => {

        await    db.user.findAll({
              include: [{
                model: db.practice,
                attributes: ['p_id', 'PracticeName'],
                through: {
                  where: { userId: user_id },
                  attributes: []
                },
              }],
              where: {
                id: user_id
              },
              attributes: []
            }).then(practices => {
              console.log('below are the practices')

              let userpractice = [];
              if (practices[0].practices.length > 0) {
                userpractice = practices[0].practices
              }

              res.send(userpractice)
            })

            //    data.addUsers(user)

      })
    }).catch(err => {
      console.log(err)
    })


};


exports.deletePracticeDocument =(req,res) =>{

  let id= req.params.id
  db.practiceDocument.update(
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

exports.getPracticeDocuments =(req,res) =>{

  let p_id=req.params.id;
  db.practiceDocument.findAll({
    where: {
      practice_id: p_id,
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
      'practice_id'
    ]
  }).then(result=>{

    res.send(result)

  }).catch(err =>{
    res.send(err)
  })
}

exports.getPracticeLogin = (req, res) => {

  const id = req.params.id;

  db.practiceLogin.findAll(
    {

      include: [{
        model: db.PracticeLogInSecQ,
        // where: {
        //     deleted:{[Op.ne]: 1},
        // },
        attributes: ['question', 'answer']
      }],

      where: {
        [Op.and]: [
          { p_id: id },
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


exports.addPracticeLoginInfo = (req, res) => {

  const formvalue = req.body
  console.log(formvalue.practice_loginsec_qs[0])

  return db.practiceLogin.create(formvalue).then(function (login) {

    return Promise.all(
      [
        formvalue.practice_loginsec_qs.map((item) => {
          login.createPractice_loginsec_q(item)
        })
      ]
    ).then((ress) => {

      db.practiceLogin.findAll({
        include: [{
          model: db.PracticeLogInSecQ,
          attributes: ['question', 'answer']
        }
        ],
        where: {
          p_id: req.body.p_id
        }
      }

      ).then((result) => {
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


exports.getImage = (req, res) => {

  const path = req.params.path;
  fs.readFile('resources/static/assets/uploads/' + path, function (err, data) {
    if (err) throw err; // Fail if the file can't be read.
    else {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.end(data); // Send the file data to the browser.
    }
  });
};


exports.uploadProfilePicture = (req, res) => {

  const id = req.body.userId
  const p_id = req.body.practiceId


  db.practiceProfilePic.create({
    imageType: req.file.mimetype,
    imageName: req.file.originalname,
    practice_id: id,
    data: '/resources/static/assets/practice/uploads/' + req.file.filename
  }).then(image => {
    try {
      fs.writeFileSync(__basedir + '/resources/static/assets/practice/tmp/' + image.name, image.data);

      // exit node.js app
      res.json({ 'msg': 'File uploaded successfully!', 'file': req.file });
    } catch (e) {
      console.log(e);
      res.json({ 'err': e });
    }
  })
};


exports.uploadPracticeDocuments = (req, res) => {

  const id = req.body.practice_id
  const p_id = req.body.practiceId


  db.practiceDocument.create({
    imageType: req.file.mimetype,
    imageName: req.file.originalname,
    practice_id: id,
    category: req.body.category,
    created_by: req.body.created_by,
    updated_by: req.body.updated_by,
    src: '/resources/static/assets/practice/documents/' + req.file.filename
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



// Retrieve all Books from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Practice.findAll({
    include: [
      {
        model: db.user,
        as: 'createdBy',
      },

      {
        model: db.user,
        as: 'updatedBy',
      },

    ]

  }
  )
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





exports.getAllImage = (req, res) => {

  const id = req.params.id;

  db.practiceProfilePic.findAll(
    {
      include: [
        {
          model: db.user,
          as: 'createdBy',
        },

        {
          model: db.user,
          as: 'updatedBy',
        },

      ]

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



exports.findAllAdd = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Address.findAll({ include: addressType })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(500).send({
        message: err.message || "Some error accurred while retrieving books."
      });
    });
};

// upload file practice



// Find a single Book with an id
exports.findOne = (req, res) => {

  const id = req.params.id;

  Practice.findByPk(id, {
    include: [{
      model: address,
      attributes: ['id', 'streetaddress', 'city', 'state', 'zip', 'country', 'addresstypeId'],
      include: [{
        model: addressType,
        attributes: ['id', 'name']
      },


      ]
    },
    {
      model: db.provider,
      attributes: ['providerId', 'providerFirstName', 'providerLastName', 'providerMiddleName', 'speciality'],
      include:[{
        model: db.providerProfilePic
      }]
    },{
      model:db.practiceProfilePic
    }]
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



// Update a Book by the id in the request

exports.update = (req, res) => {

  console.log('update practice is called')
  const id = req.params.id;
  console.log(req.body)

  Practice.update(req.body, {
    where: { p_id: id }
  })
    .then(num => {

      if (num == 1) {

        Promise.all(req.body.addresses.map(item => {
          return Address.update(
            item, {
            where: {
              [Op.and]: [
                { id: item.id },
                { practicePId: req.body.p_id },
                { addresstypeId: item.addresstypeId },
              ]
            }
          }
          );
        })).then(function (result) {

          res.send({
            message: "Practice Data is updated successfully."
          });
        })
      }
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
