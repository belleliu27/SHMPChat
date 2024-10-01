const mongoose = require("mongoose");
require("dotenv").config(); // Ensure dotenv is loaded

const mongoUrl = process.env.mongo_url;

if (!mongoUrl) {
  console.error("MongoDB URI is not defined in .env file.");
  process.exit(1); // Exit process if mongo_url is not set
}

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo DB Connection Successful");
  })
  .catch((err) => {
    console.error("Mongo DB Connection Failed:", err);
  });

const connection = mongoose.connection;

connection.on("error", (err) => {
  console.log("Mongo DB Connection Error:", err);
});

module.exports = connection;
