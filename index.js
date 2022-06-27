//IMPORTS
require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDb = require("./config/db");
const cors = require("cors");
const errorHandler = require("./middleware/error");

connectDb();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminOnlyRoutes"));
app.use("/api/superadmin", require("./routes/superAdminOnlyRoutes"));

//add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`server is running on port :${PORT}`);
});

//HANDLE CRASHED
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
