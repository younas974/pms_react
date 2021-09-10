const { verifySignUp } = require("../middlewares");
const claimController = require("../controllers/claim.controller");
const express = require('express')
const upload = require('../config/newconfig.config')
const router = express.Router()
const csvController = require("../controllers/csvConroller")


 //router.post('/claim/create',claimController.create );
router.post('/claim/create/file', upload.single("file"), claimController.uploadFile);
router.get("/claim/byid/:id", claimController.findOne);
router.get("/claim/worksummarybyclaim" , claimController.findClaim)
router.get("/claim/findall", claimController.findAllClaims)
router.get("/claim/followupdd", claimController.getFollowUpdd)
router.post("/claim/followup/addworksummary", claimController.addClaimWorkSummary)
router.get('/claim/worksummary', claimController.getWorkSummary)
router.post('/claim/bystatus', claimController.getClaimByStatus)
router.post('/claim/byuser', claimController.getClaimByUser)
router.post('/claim/cptbyclaim', claimController.getCptsByClaim)
router.put('/claim/update/cptinfo/byclaim', claimController.upateCptInfoByClaim)
router.post('/claim/delete/cpt', claimController.deleteCpt)
router.post('/claim/add/cpt', claimController.addCpt)
router.get('/claim/get/claimnotes/:claim_id', claimController.getClaimNotes)
router.get('/claim/addclaimnotes', claimController.addClaimNotes)
router.post('/claim/updateclaim', claimController.updateClaim)
router.post('/claim/delete', claimController.deleteClaim)
router.post('/claim/userprodectivity', claimController.getUserProdactivity)
router.put('/claim/updatecptbulk', claimController.bulkupateCptInfoByClaim)
router.post('/claim/getworkedclaims', claimController.getWorkedClaims)
router.post('/claim/getpendingclaims', claimController.getPendingClaims)
router.post('/claim/addworksummary', claimController.addClaimWorkSummaryBulk)


router.post('/file/upload', upload.single("file"), csvController.uploadFile);
router.post('/file/uploadbycpt', upload.single("file"), csvController.uploadFileByCPT);
router.post('/file/multiple/upload', upload.array('files', 4), csvController.uploadFileByCPT);



//router.get('/api/file', csvWorker.downloadFile);



module.exports = router;