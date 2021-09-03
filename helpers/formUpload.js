const multer = require("multer");
const path = require("path")

let storagePhotoProduct = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/upload/product");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

let uploadImg = multer({
    storage: storagePhotoProduct,
    fileFilter: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new Error('Only images are allowed'))
        }
        cb(null, true)
    },
    limits: {
        fileSize: 5000000,
    }
})

const formUpload = {
    uploadImage: (req, res, next) => {
        const uploadImage = uploadImg.single("product");
        uploadImage(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                res.status(400).send({
                  message: err.message,
                  statusCode: 400,
                });
              } else if (err) {
                res.status(400).send({
                  message: err.message,
                  statusCode: 400,
                });
              } else if (req.file === undefined || req.file === null) {
                next();
              } else {
                next();
              }
        });
    }

};

module.exports = formUpload;
