const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/company-system", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
