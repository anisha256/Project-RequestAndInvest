// IMPORTS
require('dotenv').config({ path: './config.env' });
const express = require('express');
const cors = require('cors');

const connectDb = require('./config/db');
const errorHandler = require('./middleware/error');

connectDb();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/api', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminOnlyRoutes'));
app.use('/api/superadmin', require('./routes/superAdminOnlyRoutes'));

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`server is running on port :${PORT}`);
});

// HANDLE CRASHED
process.on('unhandledRejection', (err) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
