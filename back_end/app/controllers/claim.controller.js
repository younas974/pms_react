var stream = require('stream');
var await = require('await')
const db = require("../models");
const Customer = db.customer
const Claim = db.claims
const WorkSummary= db.WorkSummary
const excel = require('exceljs');

const readXlsxFile = require('read-excel-file/node');
const { Sequelize, DataTypes, Op } = require("sequelize");
const { RSA_NO_PADDING } = require('constants');
const { claims } = require('../models');
const { currentDateByTimeZone } = require('../middlewares/helper/date');
const customers = [];
const updatecustomers=[];

function isIdUnique (id) {
    return Claim.count({ where: { claim_id: id } })
      .then(count => {
        if (count != 0) {
          return false;
        }
        return true;
    });
}

async function  findon(customer){
  await  db.claims.findOne  ({ where: { claim_id: customer.claim_id } }).then(result=>{
        if(result!=null){
            updatecustomers.push(customer)
           
        }
        else{
            customers.push(customer);
        }     
    })
}

exports.uploadFile =   (req, res) => {

    try{
        let filePath = __basedir + "/resources/static/assets/uploads/" + req.file.filename;

       readXlsxFile  (filePath).then( async rows => {

            rows.shift();
            
            let length = rows.length;
    
            for  (let i=0; i<length; i++) {
    
                let customer = {
                    claim_id: rows[i][0],
                    rendering_provider: rows[i][1],
                    insurance_name: rows[i][2],
                    patient_name: rows[i][3],
                    claim_date: rows[i][4],
                    service_date: rows[i][5],
                    charges: rows[i][6],
                    balance: rows[i][7],
                    paid_amount:rows[i][8],
                    patient_resp:rows[i][9],
                    patient_payment:rows[i][10],
                    adjustment_amount:rows[i][11],
                    p_id:rows[i][12],

                }   

            await    findon(customer)
        
               
            }
          
         await   Claim.bulkCreate(customers).then(() => {

                    if(updatecustomers.length>0){
                        return Promise.all(
                            updatecustomers.map(item=>{
                                Claim.update(item, {
                                    where:{
                                        claim_id:item.claim_id
                                    }
                                })
                            })
                        ).then(data=>{
                            updatecustomers.length=0
                            customers.length=0
                           
                            const result = {
                                status: "ok",
                                filename: req.file.originalname,
                                message: "Upload Successfully!",
                            }
                           
                            res.json(result);
                        })
                    }
                else{
                    updatecustomers.length=0
                    customers.length=0
               
                    const results = {
                        status: "ok",
                        filename: req.file.originalname,
                        message: "Upload Successfully!",
                    }
    
                    res.json(results);
                }

                
          
            });


        });
    }catch(error){
        const result = {
            status: "fail",
            filename: req.file.originalname,
            message: "Upload Error! message = " + error.message
        }
        res.json(result);
    }
}


exports.findClaim=(req, res)=>{
    
    db.workSummary.findAll({
        include:[{
            model:db.claims,
            as: 'claim status',
        }]
    }).then(result=>{
        res.send(result)

    }).catch(err=>{
        res.send(err)
    })
}


exports.getFollowUpdd = async (req,res)=>{


    let datadd;
    let status;
    let subStatus;
    let subStatusPaid
    let subStatusDenial;
    let subStatusInProcess;
    let subStatusNotReceived;
    let claimCorrectiveAction;
    let claimDenialCategory;
    let subStatusZeroOut;
    let subStatusVoicMessageLeft;

    db.claimStatus.findAll({
        attributes:['id','title']
    }).then(data=>{
        status=data;
      
        db.claimSubStatus.findAll({
            attributes:['id','title']
        }
        ).then(data=>{
         subStatus=data
         db.subStatusPaid.findAll( {
                attributes:['id','title','sub_status_id']
             }).then(data=>{
                subStatusPaid=data;
                db.subStatusDenial.findAll({
                    attributes:['id','title','sub_status_id']
                }).then(data=>{
                    subStatusDenial=data;
                    db.subStatusInProcess.findAll({
                        attributes:['id','title','sub_status_id']
                    }).then(data=>{
                        subStatusInProcess=data
                        db.subStatusNotReceived.findAll({
                            attributes:['id','title','sub_status_id']
                        }).then(data=>{
                            subStatusNotReceived=data;
                            db.claimCorrectiveAction.findAll({
                                attributes:['id','title']
                            }).then(data=>{
                                claimCorrectiveAction=data;
                                db.claimDenialCategory.findAll({
                                    attributes:['id','title']
                                }).then(data=>{
                                    claimDenialCategory=data;
                                    db.subStatusVoicMessageLeft.findAll({
                                        attributes:['id','title','sub_status_id']
                                    }).then(data=>{
                                        subStatusVoicMessageLeft=data
                                        db.subStatusZeroOut.findAll({
                                            attributes:['id','title','sub_status_id']
                                        }).then(data=>{
                                            subStatusZeroOut=data;

                                            datadd={
                                                status:status,
                                                subStatus: subStatus,
                                                subStatusPaid: subStatusPaid,
                                                subStatusDenial : subStatusDenial,
                                                subStatusInProcess : subStatusInProcess,
                                                subStatusNotReceived : subStatusNotReceived,
                                                claimCorrectiveAction : claimCorrectiveAction,
                                                claimDenialCategory : claimDenialCategory,
                                                subStatusVoicMessageLeft: subStatusVoicMessageLeft,
                                                subStatusZeroOut: subStatusZeroOut
                                            }
                                            res.send(datadd)

                                        })
                                    })
                                   
                                })
                                
                            })


                            
                        })
                        
                    })
                   
                })
              
             })
        })
    }).catch(error=>{
        console.log(error)
    })

}



exports.getPendingClaims = (req,res) =>{

    let is_worked= req.body.is_worked;
    let assigned_to= req.body.assigned_to;

    let whereClause;

    if (assigned_to !==null) {
        whereClause = {
             [Op.and]: [{assigned_to:assigned_to}, {is_worked: is_worked}],
             
             
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
         }
        
    }

    else{
        whereClause = {
            [Op.and]: [
                
                {
                    is_worked:
                     {
                         [Op.eq]: null
                        } 
                        }
                
                , 

                // {
                //     is_worked:{
                //         [Op.eq]: 0
                //     }
                // }
            
            ],
            
      
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
        }
    }

      db.claims.findAll({
        include: [
         {
             model: db.workSummary,
             attributes:['remarks','updated_at'],
             order: [['updated_at', 'DESC' ]],
            // limit:2,
             include:[
                 {
                     model:  db.claimStatus,
                     attributes: ['title', 'updated_at'],
                     as: 'status' ,
                     order: [['updated_at', 'DESC' ]],
                   //  limit:1
                 }
             ]
         },
         {
             model: db.user,
             as: 'assignedTo',
             attributes:['id','employee_id', 'first_name', 'last_name']
           },],
         
         where: whereClause  ,
 
         limit: 50 
     }
       
        ).then(async result=>{
            
         let claim= await  calculatte_ar_table(result)
         
         res.send(claim)
 
     }).catch(err=>{
         res.send(err)
     })
}

exports.getWorkedClaims = (req,res) =>{

    let is_worked= req.body.is_worked;
    let assigned_to= req.body.assigned_to;

    let whereClause;

    if (assigned_to !==null) {
        whereClause = {
             [Op.and]: [{assigned_to:assigned_to}, {is_worked: is_worked}],
             
             
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
         }
        
    }

    else{
        whereClause = {
            [Op.and]: [{is_worked: is_worked}],
            
            
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
        }
    }



      db.claims.findAll({
        include: [
         {
             model: db.workSummary,
             attributes:['remarks','updated_at'],
             order: [['updated_at', 'DESC' ]],
            // limit:2,
             include:[
                 {
                     model:  db.claimStatus,
                     attributes: ['title', 'updated_at'],
                     as: 'status' ,
                     order: [['updated_at', 'DESC' ]],
                   //  limit:1
                 }
             ]
         },
         {
             model: db.user,
             as: 'assignedTo',
             attributes:['id','employee_id', 'first_name', 'last_name']
           },],
         
         where: whereClause  ,
         limit: 50 
     }
       
        ).then(async result=>{
            
         let claim= await  calculatte_ar_table(result)
         
         res.send(claim)
 
     }).catch(err=>{
         res.send(err)
     })
}

exports.findAllClaims=async (req, res)=>{
    
   await  db.claims.findAll({
       include: [
        {
            model: db.workSummary,
            attributes:['remarks','updated_at'],
            order: [['updated_at', 'DESC' ]],
           // limit:2,
            include:[
                {
                    model:  db.claimStatus,
                    attributes: ['title', 'updated_at'],
                    as: 'status' ,
                    order: [['updated_at', 'DESC' ]],
                  //  limit:1
                }
            ]
        },
        {
            model: db.user,
            as: 'assignedTo',
            attributes:['id','employee_id', 'first_name', 'last_name']
          },],
        
        where:{
            
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
        }  ,

       // limit: 50 
    }
      
       ).then(async result=>{
           
        let claim= await  calculatte_ar_table(result)
        
        res.send(claim)

    }).catch(err=>{
        res.send(err)
    })
}



exports.addClaimWorkSummaryBulk= async(req,res)=>{

    db.workSummary.bulkCreate(req.body).then(data=>{
        res.send({
            message: "updated successfully"
        })
    }).catch(error=>{
        console.log(error)
    })
}

exports.addClaimWorkSummary =async(req,res)=>{
    claim_id=req.body.claim_id
    let date= currentDateByTimeZone()

    console.log(currentDateByTimeZone())
    db.claims.findOne({
        where: {
            claim_id:claim_id
        },
        attributes:['is_worked']
    }).then(data=>{
       
     
       if(data.is_worked){
           res.status(208).send({
               message: "already worked"
           })
       }
       else{
        db.workSummary.create(req.body).then(data=>{
            db.claims.update({
                is_worked: true },
            { where: { claim_id: claim_id } }
           ).then(result=>{
            res.status(200).send({
            
                message: 'Work Summary is Saved Successfully'
            })
    
           })
          
        })
       }
       
    })
  
   .catch(error=>{
        res.status(500).send({
            message: error.message
        })
    })
}

exports.getWorkSummary =async(req,res)=>{

    db.workSummary.findAll({
        include: {
            model: db.claimStatus
        }
    }).then(data=>{
    res.send(data)    
    
    }).catch(error=>{
        res.send(error)
    })
}


exports.getClaimByStatus= async (req,res)=>{

    
    let date= req.body.date


//     db.workSummary.findAll(
//        {
//         include:[{
//           model:  db.claimStatus,
//            as: 'status',
//         },
//         {
//             model:  db.claimSubStatus,
//              as: 'sub_status',
//           },
//           {
//             model:  db.claimCorrectiveAction,
//              as: 'action',
//           },
//           {
//             model:  db.claimDenialCategory,
//              as: 'denialCategory',
//           },
    
//     {
//         model: db.claims
//     }]
//    }
//     ).then(data=>{
//        res.send(data)
//     }).catch(error=>{
//         res.send(error)
//     })



 
db.workSummary.findAll({

       
    attributes: { 
        include: [[Sequelize.fn("COUNT", Sequelize.col("claim_status")), "claims"],[Sequelize.fn("SUM", Sequelize.col("claim.balance")), "balance"]],
       
    },
    group: ['claim_status'],
    raw: true,
    include: [{
        model: db.claims, attributes: []
    }
    
    ,{
        model:  db.claimStatus, attributes: ['title'],
           as: 'status' ,
    }
 ],
 where:{
    updated_at:  Sequelize.where(Sequelize.fn('date', Sequelize.col('work_summary.updated_at')), '=', date),
    claim_status: {
        [Op.ne]: null
      }
 }
}).then(data=>{
    res.send(data)
}).catch(error=>{
    res.send(error)
});
 
    // db.workSummary.findAndCountAll({
    //     // where: {
    //     //     claim_status: 1
    //     // },
    //     attributes: ['claim_id', 'remarks'],
     
    //     include:{
    //         model: db.claims
    //     },
    //     group: ['claim_status'],
    // }).then(data=>{
    //     res.send(data)
    // }).catch(err=>{
    //     res.send(err)
    // })
   
}


exports.getClaimByUser= async (req,res)=>{

    let date= req.body.date

    db.workSummary.findAll({
            attributes: { 
                include: [[Sequelize.fn("COUNT", Sequelize.col("work_summary.updated_by")), "claims"],[Sequelize.fn("SUM", Sequelize.col("claim.balance")), "balance"]],
               
            },
           group: ['work_summary.updated_by'],
            //raw: true,
            include: [
                {
                model: db.claims, attributes: []
            }
            
            ,
            {
                model:  db.user, 
                   as: 'updatedBy' ,
                   attributes: ['first_name', 'last_name'],
            }
         ],
         where:{
            updated_at:  Sequelize.where(Sequelize.fn('date', Sequelize.col('work_summary.updated_at')), '=', date)
         }
        }).then(data=>{
            res.send(data)
        }).catch(error=>{
            res.send(error)
        });

    
        // db.workSummary.findAll({
        //     attributes: { 
        //         include: [[Sequelize.fn("COUNT", Sequelize.col("updated_by")), "claims"],[Sequelize.fn("SUM", Sequelize.col("claim.balance")), "balance"]],
               
        //     },
        //     group: ['updated_by'],
        //     raw: true,
        //     include: [
        //         {
        //         model: db.claims, attributes: []
        //     }
            
        //     //,
        //     // {
        //     //     model:  db.user, attributes: ['first_name', 'last_name'],
        //     //        as: 'updatedBy' ,
        //     // }
        //  ]
        // }).then(data=>{
        //     res.send(data)
        // }).catch(error=>{
        //     res.send(error)
        // });
    
     
    }
    

    exports.getUserProdactivity= (req,res)=>{

    
           
            let date= req.body.date
            let user= req.body.employee_id
        
        
        //     db.workSummary.findAll(
        //        {
        //         include:[{
        //           model:  db.claimStatus,
        //            as: 'status',
        //         },
        //         {
        //             model:  db.claimSubStatus,
        //              as: 'sub_status',
        //           },
        //           {
        //             model:  db.claimCorrectiveAction,
        //              as: 'action',
        //           },
        //           {
        //             model:  db.claimDenialCategory,
        //              as: 'denialCategory',
        //           },
            
        //     {
        //         model: db.claims
        //     }]
        //    }
        //     ).then(data=>{
        //        res.send(data)
        //     }).catch(error=>{
        //         res.send(error)
        //     })
        
        
        
            db.workSummary.findAll({
        
               
                attributes: { 
                    include: [[Sequelize.fn("COUNT", Sequelize.col("claim_status")), "claims"],[Sequelize.fn("SUM", Sequelize.col("claim.balance")), "balance"]],
                   
                },
                group: ['claim_status'],
                raw: true,
                include: [{
                    model: db.claims, attributes: []
                }
                
                ,{
                    model:  db.claimStatus, attributes: ['title'],
                       as: 'status' ,
                }
                ,{
                    model:  db.user, attributes: ['first_name','last_name'],
                       as: 'updatedBy',
                       where: {
                        employee_id:user
                       }
                       
                }
             ],
             where:{
                updated_at:  Sequelize.where(Sequelize.fn('date', Sequelize.col('work_summary.updated_at')), '=', date),
              //  updated_by:  Sequelize.where(Sequelize.fn('updated_by', Sequelize.col('work_summary.updated_by')), '=', 1),
                claim_status: {
                    [Op.ne]: null
                  }
             }
            }).then(data=>{
                res.send(data)
            }).catch(error=>{
                res.send(error)
            });
        
         
            // db.workSummary.findAndCountAll({
            //     // where: {
            //     //     claim_status: 1
            //     // },
            //     attributes: ['claim_id', 'remarks'],
             
            //     include:{
            //         model: db.claims
            //     },
            //     group: ['claim_status'],
            // }).then(data=>{
            //     res.send(data)
            // }).catch(err=>{
            //     res.send(err)
            // })
           
 

    }



exports.getCptsByClaim = async(req,res)=>{
    
let claim_id= req.body.claim_id

await db.Cpt.findAll({
    where:{
        
    claim_id:claim_id,
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
    // deleted:{  [Op.is]:null },
    // deleted:{  [Op.is]:0 },


    },
    attributes:['id','claim_id', 'cpt', 'charges' ,'paid_amount', 'patient_resp','allowed_amount' ],
    include:[
        {
        model: db.paymentSource,
        order: [['updated_at', 'DESC' ]],
        limit:1
    }
    ,
    {
        model: db.claims,
        attributes: ['service_date']
    }
]
}).then(data=>{
    // let obj;
    // let resData=[]
    // if(data.length){
    //     data.map(item=>{
    //         console.log('i am in data')
    //         obj={
    //             id: item.id,
    //             claim_id: item.claim_id,
    //             cpt: item.cpt,
    //             paid_amount: item.paid_amount,
    //             patient_resp: item.patient_resp,
    //             allowed_amount: item.allowed_amount,
    //            // payment_srcs: item.payment_srcs[0].src,
    //             service_date: claim.service_date
    //         }
    //         resData.push(obj)
    //     })

    // }

    res.send(data)
}).catch(error=>{


res.send(error)

})


}


exports.upateCptInfoByClaim =  (req,res)=>{
    let claim_id= req.body.claim_id;
    let cpt_id= req.body.id;


    db.Cpt.update( req.body,{
        where:{
            [Op.and]: [{id: cpt_id}, {claim_id: claim_id}]
        }
    }).then(data=>{
        if(data==1){
            db.paymentSource.create({
                src: req.body.payment_srcs, 
                cpt_id: cpt_id,
                claim_id: req.body.claim_id
            }).then(result=>{
            res.send({
                message: 'Payment updated successfully'
            })    
            })
        }

    }).catch(error=>{
          res.send(error)
    }
      
    )
}


exports.bulkupateCptInfoByClaim =  (req,res)=>{
 
    Promise.all(
        req.body.map(item=>{
        db.Cpt.update( item,{
            where:{
                [Op.and]: [{id: item.id}, {claim_id: item.claim_id}]
            }
        }).then(data=>{
            if(data==1){
                db.paymentSource.create({
                    src: req.body.payment_srcs, 
                    cpt_id: item.id,
                    claim_id: item.claim_id
                }).then(result=>{
               
                })
            }
        })
        })
    ).then(response=>{
        res.send({
            message: 'Payment updated successfully'
        })    
    })

   .catch(error=>{
          res.send(error)
    }
      
    )
}


exports.deleteCpt= (req,res)=>{

    const claim_id = req.body.claim_id;
    const cpt= req.body.cpt;
    const id= req.body.id

    db.Cpt.update(
        { deleted:1}, {where:{
          [Op.and]: {claim_id:claim_id, cpt:cpt, id: id} 
        }}
    ).then(
        
        res.send({
            message: 'Cpt is deleted Successfully'
        })
    ).catch(error=>{
            res.send(error)
    })
}


exports.addClaimNotes=(req,res)=>{

    let claimNotes= req.body

    db.workSummary.create(claimNotes).then(data=>{

      //  res.send(data)
        res.status(200).send({
            message: 'Notes Created Successfully'
        })
    }).catch(error=>{
        res.status(500).send({ message: error.message });  
    })
    
    }
    

    exports.deleteClaim =(req,res)=>{

        db.claims.update({
            deleted:1,
            updated_by:req.body.updated_by
        },{
            where:{
                claim_id: req.body.claim_id
            }
        }).then(result=>{
            res.status(200).send({
                message: 'Claim deleted successfully'
            })
        }).catch(err=>{
            res.status(500).send({
                message: err.message
            })
        })

    }

   


    exports.updateClaim =(req,res)=>{

            db.claims.update({
                insurance_name: req.body.insurance_name,
                charges: req.body.charges,
                balance: req.body.balance,
                remarks: req.body.remarks,
                sec_insurance: req.body.sec_insurance,
                current_insurance: req.body.current_insurance,
                insurance_payment: req.body.insurance_payment,
                patient_payment: req.body.patient_payment,
                adjustment_amount: req.body.adjustment_amount,
                paid_amount: req.body.paid_amount,
                updated_by: req.body.updated_by

            },{
                where: {
                    claim_id:req.body.claim_id
                }
            }).then(result=>{
                res.status(200).send({
                    message: 'Updated Successfully'
                })
            }).catch(error=>{
                res.status(500).send({ message: error.message });
            })
        
    }


exports.getClaimNotes = (req, res)=>{

    claim_id= req.params.claim_id;


db.workSummary.findAll(
    {
        where: {claim_id: claim_id},
        attributes:['claim_id', 'remarks', 'updated_at'],
        include:[
            {
                model:  db.user, 
                   as: 'updatedBy' ,
                   attributes: ['first_name', 'last_name'],
            }
        ]
    }
).then(data=>{

res.send(data)    

}).catch(error=>{
    res.send(error)
})
}


exports.addCpt= (req, res)=>{

    db.Cpt.create(req.body).then(data=>{

            db.paymentSource.create({
                src: req.body.payment_srcs,
                cpt_id: data.id,
                claim_id: req.body.claim_id
            }).then(result=>{
                res.status(200).send({
                    message: "Cpt is added successfully"
                })
            })
    })
    .catch(error=>{
        res.send(error)
    })

}

function calculatte_ar_table(data){

    
    let aging;
    let bucket;
    let priority;
    let remarks;
    let serviceDate;
    let today;
    let facility_location;
    let response=[];
    let status;
    let assignTo


    data.map( async item=>{
    
        let last=0
        last=item.work_summaries.length
         serviceDate= new Date(item.service_date);
         today= new Date()
         aging= parseInt((today - serviceDate) / (1000 * 60 * 60 * 24));
         if(aging<30){
            bucket='0-30'
            priority='P3'
         }

         if(aging>30 && aging<=60){
            bucket='31-60'
            priority='P3'
        }

        if(aging>60 && aging<=90){
            bucket='61-90'
            priority='P2'
        }

        if(aging>90 && aging<=120){
            bucket='90-120'
            priority='P2'
        }
        if(aging>120){
            bucket='120+'
            priority='P1'
        }
        if(item.work_summaries.length>0){
           // remarks= item.work_summaries[0].remarks;
            status= item.work_summaries[last-1].status.title
        }
        else{
          status=""
        }

        if(item.assignedTo){
            assignTo= item.assignedTo.first_name + ' ' +item.assignedTo.last_name
        }
        else{
            assignTo=""
        }

        response.push({
            
            claim_id:item.claim_id,
            rendering_provider: item.rendering_provider,
            insurance_name: item.insurance_name,
            patient_name: item.patient_name,
            claim_date: item.claim_date,
            service_date: item.service_date,
            charges: item.charges,
            balance: item.balance,
            priority:priority,
            remarks:remarks,
            aging:aging,
            bucket:bucket,
            assignTo: assignTo,
            facility_location: item.facility_location,
            patient_accountNo: item.patient_accountNo,
            patient_DOB: item.patient_DOB,
            first_submission_date: item.first_submission_date,
            last_submission_date: item.last_submission_date,
            sec_insurance: item.sec_insurance,
            current_insurance: item.current_insurance,
            insurance_payment: item.insurance_payment,
            patient_payment: item.patient_payment,
            adjustment_amount: item.adjustment_amount,
            paid_amount: item.paid_amount,
            status: status
            
        })
       
    })
return response
    
}

exports.findOne = (req, res) => {

    const id = req.params.id;
 
  
    db.claims.findOne(
        {
            
            include:[
              {
                model: db.user,
                as: 'assignedBy',
                attributes:['id','employee_id', 'first_name', 'last_name']
              },
      
              {
                model: db.user,
                as: 'assignedTo',
                attributes:['id','employee_id', 'first_name', 'last_name']
              },
              {
                model: db.user,
                as: 'createdBy',
                attributes:['id','employee_id', 'first_name', 'last_name']
              },
      
              {
                model: db.user,
                as: 'updatedBy',
                attributes:['id','employee_id', 'first_name', 'last_name']
              },
        
            ],
            where: {
                claim_id: id,
            },

          
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
  
  

/** 
 * Upload multiple Excel Files
 *  
 * @param {*} req 
 * @param {*} res 
 */
exports.uploadMultipleFiles = async (req, res) => {
	const messages = [];

	for (const file of req.files) {
        try{
            let filePath = __basedir + "/uploads/" + file.filename;
            let rows = await readXlsxFile(filePath);
    
            // `rows` is an array of rows
            // each row being an array of cells.   
      
    
            // Remove Header ROW
            rows.shift();
            
            const customers = [];
    
            let length = rows.length;
    
            for(let i=0; i<length; i++){
    
                let customer = {
                    id: rows[i][0],
                    name: rows[i][1],
                    address: rows[i][2],
                    age: rows[i][3]
                }
    
                customers.push(customer);
            }
    
            uploadResult = await Customer.bulkCreate(customers);
    
            // It will now wait for above Promise to be fulfilled and show the proper details
        
    
            if (!uploadResult){
                const result = {
                    status: "fail",
                    filename: file.originalname,				
                    message: "Can NOT upload Successfully",
                }
    
                messages.push(result);
            } else {
                const result = {
                    status: "ok",
                    filename: file.originalname,
                    message: "Upload Successfully!",
                }
                messages.push(result);
            }                   
        }catch(error){
            const result = {
                status: "fail",
                filename: file.originalname,				
                message: "Error -> " + error.message
            }

            messages.push(result);
        }
	}

	return res.json(messages);
}

exports.downloadFile = (req, res) => {
    Customer.findAll().then(objects => {
        var customers = [];
        let length = objects.length;

        for(let i=0; i<length; i++){
            let datavalues = objects[i].dataValues;
            let customer = {
                id: datavalues.id,
                name: datavalues.name,
                address: datavalues.address,
                age: datavalues.age
            } ;
            customers.push(customer);
        }



        const jsonCustomers = JSON.parse(JSON.stringify(customers));

        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('Customers'); //creating worksheet

        worksheet.columns = [
            { header: 'Id', key: 'id', width: 10 },
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Address', key: 'address', width: 30},
            { header: 'Age', key: 'age', width: 10, outlineLevel: 1}
        ];    

        // Add Array Rows
        worksheet.addRows(jsonCustomers);
    
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=' + 'customer.xlsx');

        return workbook.xlsx.write(res)
                .then(function() {
                    res.status(200).end();
                });
    });
}