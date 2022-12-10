require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

app.use("/", (req, res) => {
  res.send("Foodie mood API");
});

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port} ...`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
