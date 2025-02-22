const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const MONGO_URI = 'MONGODB_URI_HERE'

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use("/api", routes);

    app.listen(3000, () => {
      console.log("Server has started at port 3000");
    });
  });
