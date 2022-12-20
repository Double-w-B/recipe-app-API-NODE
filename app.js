require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./db/connect");

// routes
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const newsletterRouter = require("./routes/newsletterRoutes");

// authentication
const { authenticateUser } = require("./middleware/authentication");

// middleware
const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Foodie mood API");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/newsletter", newsletterRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
