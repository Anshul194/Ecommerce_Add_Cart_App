const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL);
    console.log(
      "db conneected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectdb;
