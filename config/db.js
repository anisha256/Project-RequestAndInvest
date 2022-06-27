const mongoose = require("mongoose");

const connectDb = async () => {
  const conn = await mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`Database connected`);
};
module.exports = connectDb;
