// IMPORTS
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Path = require('path');
const bodyParser = require('body-parser');
// const multiparty = require('connect-multiparty');

// const MultipartyMiddleware = multiparty({
//   uploadDir: './uploads',
// });

const connectDb = require('./config/db');
const errorHandler = require('./middleware/error');

connectDb();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
// app.use(express.static(__dirname + '/public'));
// app.use('/uploads', express.static('uploads'));

app.use('/api', require('./routes/authRoutes'));
app.use('/api/file', require('./routes/uploadRoutes'));

app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminOnlyRoutes'));
app.use('/api/superadmin', require('./routes/superAdminOnlyRoutes'));
// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'testing server',
//   });
// });
// app.post('/upload', upload.single('file'), uploadFile);
// app.post('/upload', MultipartyMiddleware, (req, res) => {
//   console.log(req.files.upload);
//   res.json({
//     message: 'uploaded',
//   });
// });

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`server is running on port :${PORT}`);
});

// HANDLE CRASHED
process.on('unhandledRejection', (err) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
