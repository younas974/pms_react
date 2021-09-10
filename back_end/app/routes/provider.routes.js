const { verifySignUp } = require("../middlewares");
const practiceController = require("../controllers/practice.controller");
const providerController = require("../controllers/provider.controller")
const express = require('express')
const router = express.Router()
var multer  = require('multer');
const {uploadmuliple} = require('../config/upload.config');
const {upload} = require('../config/upload.config');
const {uploadPractice, uploadProviderDocuments} = require('../config/upload.config');
// router.get("/signout", controller.signout)


// Retrieve all Books
router.get("/provider/all", providerController.findAllProvider);

// add provider 

router.post("/provider/create", uploadmuliple.fields([{ name: 'uploadfile', maxCount: 1 }, { name: 'data', maxCount: 1 }]) , providerController.create )

// update provider

router.put("/provider/update", uploadmuliple.fields([{ name: 'uploadfile', maxCount: 1 }, { name: 'data', maxCount: 1 }]) , providerController.update )

router.get("/provider/image/:path(*)", providerController.getImage)

router.get("/provider/findone/:id", providerController.findOne)
router.get("/provider/findbyid/:id", providerController.findOnebyPK)
router.get("/provider/getProviderLogin/:id", providerController.getProvider)
router.post("/provider/addProviderLoginInfo" , providerController.addProviderLoginInfo)

router.post("/provider/documents",  uploadProviderDocuments.single("uploadfile"), providerController.uploadProviderDocuments )
router.get("/provider/getAllDocuments/:id", providerController.getProviderDocuments )
router.get("/provider/deleteDocument/:id", providerController.deleteProviderDocument)

// upload provider profile

router.post("/provider/profileimage",  upload.single("uploadfile"), providerController.uploadProfilePicture )

// Retrieve all published Books
//router.get("/published", bookController.findAllPublished);

// Retrieve a single Book with id

// Update a Book with id

router.put("/practice/update/:id", practiceController.update);


// Delete a Book with id
//router.delete("/:id", bookController.delete);

// Delete all Books
//router.delete("/", bookController.deleteAll);

module.exports = router;