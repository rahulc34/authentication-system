require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./utils/conection");
const userRoutes = require("./routes/user");

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

//dbconnection
dbConnection("mongodb://localhost:27017/database");

//routes
app.use("/user", userRoutes);

app.use((error, req, res, next) => {
  console.log(error)
  const message = error.message || "server error";
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({ message: message });
});
app.listen(process.env.PORT, () => {
  console.log("server is running on port 5555..");
});
