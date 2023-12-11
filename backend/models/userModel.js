const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
  firstName: {
    required : true,
    type : String
  },
  lastName: {
    required : true,
    type : String
  },
  userName: {
    required : true,
    type : String
  },
  mobileNo: {
    required : true,
    type : String
  },
  role: {
    required : true,
    type : String
  },
  createdAt : {
    type : Date,
    required : false,
    default : Date.now
  }
});

module.exports = mongoose.model('User', userSchema)