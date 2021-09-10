const stream = require('stream');
const await = require('await')
const fs = require('fs');
const path = require('path');
const db = require("../models");
const Customer = db.customer;

const csv = require('fast-csv');
const Json2csvParser = require('json2csv').Parser;

/**
 * Upload Single CSV file/ and Import data to MySQL/PostgreSQL database
 * @param {*} req 
 * @param {*} res 
 */

exports.uploadFile = async (req, res) => {
    try {
        const customers = [];
        await fs.createReadStream(__basedir + "/resources/static/assets/uploads/" + req.file.filename)
            .pipe(csv.parse({ headers: true }))
            .on('error', error => {
                console.error(error);
                throw error.message;
            })
            .on('data', row => {
                customers.push(row);

            })
            .on('end', async () => {
                // Save customers to MySQL/PostgreSQL database

                await Promise.all(
                    customers.map(async (item) => {

                        db.claims.upsert(item)
                    })

                ).then(() => {

                    const result = {
                        status: "ok",
                        filename: req.file.originalname,
                        message: "Upload Successfully!",
                    }

                    res.json(result);

                })

            });
    } catch (error) {
        const result = {
            status: "fail",
            filename: req.file.originalname,
            message: "Upload Error! message = " + error.message
        }
        res.json(result);
    }
}


exports.uploadFileByCPT = async (req, res) => {

    try {
        const cpt_dataa = [];
        let customers = [];
        let claimids = [];

        await fs.createReadStream(__basedir + "/resources/static/assets/uploads/" + req.file.filename)
            .pipe(csv.parse({ headers: true }))
            .on('error', error => {
                console.error(error);
                throw error.message;
            })
            .on('data', row => {

                const element = customers.find(element => element.claim_id == row.claim_id);
                if (element) {

                    if (element.patient_payment) {
                        element.patient_payment = Number(element.patient_payment) + Number(row.patient_payment);
                    }
                    if (element.balance) {
                        element.balance = Number(element.balance) + Number(row.balance);
                    }
                    if (element.paid_amount) {
                        element.paid_amount = Number(element.paid_amount) + Number(row.paid_amount);
                    }
                    if (element.patient_resp) {
                        element.patient_resp = Number(element.patient_resp) + Number(row.patient_resp);
                    }

                    if (element.adjustment_amount) {
                        element.adjustment_amount = Number(element.adjustment_amount) + Number(row.adjustment_amount);
                    }
                    if (element.charges) {
                        element.charges = Number(element.charges) + Number(row.charges);
                    }
                }
                else {
                    claimids.push(row.claim_id)
                    customers.push(row)
                }

                // cpt_dataa.push(row)
            })
            .on('end', async () => {
                // Save customers to MySQL/PostgreSQL database
                try {

                    await fs.createReadStream(__basedir + "/resources/static/assets/uploads/" + req.file.filename)
                        .pipe(csv.parse({ headers: true }))
                        .on('error', error => {
                            console.error(error);
                            throw error.message;
                        })
                        .on('data', row => {
                            cpt_dataa.push(row)

                            // cpt_dataa.push(row)
                        })
                        .on('end', async () => {
                            // Save customers to MySQL/PostgreSQL database

                            await Promise.all(
                                customers.map(async (item) => {

                                    await db.claims.upsert(item)
                                })

                            ).then(() => {

                                db.Cpt.destroy({
                                    where: {
                                        claim_id: claimids
                                    },
                                }
                                ).then(async () => {
                                    await db.Cpt.bulkCreate(cpt_dataa)
                                })
                                    .then(() => {
                                        const result = {
                                            status: "ok",
                                            filename: req.file.originalname,
                                            message: "Upload Successfully!",
                                        }

                                        res.json(result);
                                    })
                            })
                        });
                } catch (error) {
                    const result = {
                        status: "fail",
                        filename: req.file.originalname,
                        message: "Upload Error! message = " + error.message
                    }
                    res.json(result);
                }

            });
    } catch (error) {
        const result = {
            status: "fail",
            filename: req.file.originalname,
            message: "Upload Error! message = " + error.message
        }
        res.json(result);
    }
}






/** 
 * Upload multiple Excel Files
 *  
 * @param {*} req 
 * @param {*} res 
 */
exports.uploadMultipleFiles = async (req, res) => {
    const messages = [];

    for (const file of req.files) {
        try {
            // Parsing CSV Files to data array objects
            const csvParserStream = fs.createReadStream(__basedir + "/uploads/" + file.filename)
                .pipe(csv.parse({ headers: true }));

            var end = new Promise(function (resolve, reject) {
                let customers = [];

                csvParserStream.on('data', object => {
                    customers.push(object);
                    console.log(object);
                });
                csvParserStream.on('end', () => {
                    resolve(customers);
                });
                csvParserStream.on('error', error => {
                    console.error(error);
                    reject
                }); // or something like that. might need to close `hash`
            });

            await (async function () {
                let customers = await end;

                // save customers to MySQL/PostgreSQL database
                await Customer.bulkCreate(customers).then(() => {
                    const result = {
                        status: "ok",
                        filename: file.originalname,
                        message: "Upload Successfully!",
                    }

                    messages.push(result);
                });
            }());
        } catch (error) {
            console.log(error);

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
    Customer.findAll({ attributes: ['id', 'name', 'address', 'age'] }).then(objects => {
        const jsonCustomers = JSON.parse(JSON.stringify(objects));
        const csvFields = ['Id', 'Name', 'Address', 'Age'];
        const json2csvParser = new Json2csvParser({ csvFields });
        const csvData = json2csvParser.parse(jsonCustomers);

        res.setHeader('Content-disposition', 'attachment; filename=customers.csv');
        res.set('Content-Type', 'text/csv');
        res.status(200).end(csvData);
    });
}