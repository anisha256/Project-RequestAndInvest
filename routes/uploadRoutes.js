const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}-${path.extname(file.originalname)}`);
  },
});

// function checkFileType(file, callback) {
//   const filename = /jpg|jpeg|png/;
//   const extname = filetypes.test(path.extname(file.originalname.toLowerCase()));
//   const mimetype = filetypes.test(file.mimetype);
//   if (extname && mimetype) {
//     return callback(null, true);
//   } else {
//     callback('image only');
//   }
// }
// const upload = multer({
//   storage,
//   fileFilter: function (req, file, callback) {
//     checkFileType(file, callback);
//   },
// });
const upload = multer({
  storage,
});

router.post(
  '/',
  upload.single('image', (req, res) => {
    res.send(`/${req.file.path}`);
  })
);

module.exports = router;
