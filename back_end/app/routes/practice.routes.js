const { verifySignUp } = require("../middlewares");
const practiceController = require("../controllers/practice.controller");
const express = require('express')
const router = express.Router()
var multer  = require('multer');
const {uploadPractice, uploadPracticeDocuments} = require('../config/upload.config');
const { practiceLogin } = require("../models");

// router.get("/signout", controller.signout)

router.post("/practice/create", practiceController.create);

// Retrieve all Books
router.get("/practice/info", practiceController.findAll);

// uplaod image
router.post("/practice/profileimage",  uploadPractice.single("uploadfile"), practiceController.uploadProfilePicture )

router.post("/practice/documents",  uploadPracticeDocuments.single("uploadfile"), practiceController.uploadPracticeDocuments )


// get all images

router.get("/practice/getallimage", practiceController.getAllImage)
router.get("/practice/getPracticeLogin/:id", practiceController.getPracticeLogin)
router.post("/practice/addPracticeLoginInfo" , practiceController.addPracticeLoginInfo)
router.get("/practice/getAllDocuments/:id", practiceController.getPracticeDocuments )
router.get("/practice/deleteDocument/:id", practiceController.deletePracticeDocument)

//router.get("/published", bookController.findAllPublished);

// Retrieve a single Book with id
router.get("/practice/:id", practiceController.findOne);

// Update a Book with id

router.put("/practice/update/:id", practiceController.update);

// save image route

router.get("/practice/image/:path", practiceController.getImage)

// Delete a Book with id
//router.delete("/:id", bookController.delete);

// Delete all Books
//router.delete("/", bookController.deleteAll);

module.exports = router;