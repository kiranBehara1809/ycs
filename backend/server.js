var express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/fantasticLamp");

const corsIssue = function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};
app.use(express.json(), corsIssue);

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  mobileNo: String,
  role: String,
});

const UserModel = mongoose.model("users", userSchema);
app.get("/users", (req, res) => {
  UserModel.find()
    .then((users) => {
      res.json({ users, statusCode: 200 });
    })
    .catch((e) => {
      res.json({ statusCode: 500 });
    });
});

app.get("/addUser", (req, res) => {
    UserModel.insertMany({
      firstName: "Simba",
      lastName: "Behara",
      userName: "behara.simba",
      mobileNo: "6304297195",
      role: "doctor",
    }).then((response) => {
      res.json(response);
    }).catch(e => {
        res.json({ statusCode: 500 });
    });
})

app.listen(process.env.PORT || 8888);

console.log(`Server is listening on ${process.env.PORT || 8888}`);
