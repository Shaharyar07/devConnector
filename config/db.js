const mongoose = require("mongoose");
const connectToMongo = () => {
  mongoose
    .connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.log("Connection failed!", err);
    });
};
module.exports = connectToMongo;
