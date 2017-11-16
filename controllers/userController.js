const userModel = require('../models/userModel');
const questionModel = require('../models/questionModel');
const bcrypt = require('bcrypt');


const getAllUser = (callback) => {
  userModel.find({},(err,data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  })
}

const getUserById = (id, callback) => {
  userModel.findOne({_id:id},(err,data) => {
    if (err) {
      callback(err);
    } else {
      callback(null,data);
    }
  })
}


const createUser = (user, callback) => {
  bcrypt.hash(user.password,10,(err,hash) => {
    let newUser = {
      username: user.username,
      password: hash,
      email: user.email,
      point: user.point
    };

    userModel.create(newUser,(err,data) => {
      if(err){
        callback(err);
      } else {
        callback(null,data);
      }
    });
  });
}

const answersCorrect = (id, questionId,callback) => {

  userModel.find({_id:id}, (err,data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  })
}

module.exports = {
  getAllUser,
  getUserById,
  createUser
}
