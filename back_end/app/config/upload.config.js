const multer = require('multer');

var storagep = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, __basedir + '/resources/static/assets/practice/providers/pimage')
	},
	filename: (req, file, cb) => {
	  cb(null,file.originalname)
	}
});

var upload = multer({storage: storagep});

// module.exports = upload;

var storagepractice = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, __basedir + '/resources/static/assets/practice/uploads/')
	},
	filename: (req, file, cb) => {
	  cb(null,file.originalname)
	}
});

var uploadPractice = multer({storage: storagepractice});

// module.exports = uploadPractice;



var storagemp = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __basedir + '/resources/static/assets/practice/uploads/')
	  },
	  filename: (req, file, cb) => {
		cb(null,file.originalname)
	  }
	});

var uploadmuliple = multer({storage: storagemp});

var storagpracticed = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, __basedir + '/resources/static/assets/practice/documents/')
	},
	filename: (req, file, cb) => {
	  cb(null,file.originalname)
	}
});

var uploadPracticeDocuments = multer({storage: storagpracticed});


var storagproviderD = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, __basedir + '/resources/static/assets/provider/documents/')
	},
	filename: (req, file, cb) => {
	  cb(null,file.originalname)
	}
});

var uploadProviderDocuments = multer({storage: storagproviderD});




module.exports = {upload, uploadPractice,uploadmuliple, uploadPracticeDocuments, uploadProviderDocuments };

