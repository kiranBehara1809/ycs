var express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/fantasticLamp");

const corsIssue = function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};
app.use(express.json(), corsIssue);

const UserRouter = require('./routes/user')

app.use("/user", UserRouter);


app.listen(process.env.PORT || 8888);

console.log(`Server is listening on ${process.env.PORT || 8888}`);
