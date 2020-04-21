const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const config = require("config");
const db = config.get("mongoURI");
mongoose.set("useCreateIndex", true);
const connectDB = async function () {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("MongoDB is connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
