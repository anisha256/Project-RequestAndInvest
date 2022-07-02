const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const { uploadFile } = require('../controller/userController');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/');
  },
  filename(req, file, callback) {
    console.log(file);
    console.log(file.fieldname);
    console.log(path.extname(file.originalname));
    callback(
      null,
      `${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`
    );
  },
});
const checkFileType = (file, callback) => {
  const fileType = /jpg|jpeg|png/;
  const extname = fileType.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileType.test(file.mimetype);

  if (extname && mimetype) {
    return callback(null, true);
  }
  return callback('Images only!', false);
};

const upload = multer({
  storage,
  fileFilter(req, file, callback) {
    checkFileType(file, callback);
  },
});

router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;
