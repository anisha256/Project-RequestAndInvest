const mongoose = require('mongoose');

const connectDb = async () => {
  await mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.warn(`Database connected`);
};
module.exports = connectDb;
