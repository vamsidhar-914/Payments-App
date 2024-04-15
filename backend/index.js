const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const rootRoutes = require("./routes/index");

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongoose is connected"))
  .catch((e) => console.log(e.message));

app.use(cors());
app.use(express.json());

//roots
app.use("/api/v1", rootRoutes);

//error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
