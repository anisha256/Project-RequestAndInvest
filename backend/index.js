// IMPORTS
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
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

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.use('/api', require('./routes/authRoutes'));
app.use('/api/file', require('./routes/uploadRoutes'));
app.use('/api/form', require('./routes/formRoutes'));
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

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'access_token,refresh_token,X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`server is running on port :${PORT}`);
});

// HANDLE CRASHED
process.on('unhandledRejection', (err) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
