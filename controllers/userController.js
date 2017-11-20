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
  return userModel.findOne({_id:id},(err,data) => {
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

const updatePoint = (id,points,callback) => {
  getUserById(id,(err,data) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      data.points += points;
      data.save((err,updateData) => {
        if(err){
          console.log(err);
          callback(err);
        } else {
          console.log(updateData);
          callback(null,updateData);
        }
      });
    }
  });

}


module.exports = {
  getAllUser,
  getUserById,
  createUser,
  updatePoint
}
