const questionModel = require('../models/questionModel') ;
const userController = require('./userController');
getAllQuestions = (callback) => {
  questionModel.find({},(err,data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
}

getQuestionById = (id, callback) => {
  return questionModel.findOne({_id:id},(err,data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
}

getRandomQuestion = (callback) => {
  questionModel.aggregate({ $sample: { size: 1 } },(err,data) => {
    if(err) {
      callback(err);
    } else {
      callback(null,data);
    }
  })
}

createNewQuestion = (question, callback) => {
  let newQuestion = {
    title:question.title,
    answers:question.answers,
    result:question.result,
    points:question.points
  }
  questionModel.create(newQuestion,(err,data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  })
}

deleteAnQuestion = (id, callback) => {
  questionModel.remove({_id:id}, (err,data) => {
    if(err) callback(err);
    else callback(null,data);
  })
}


//update points
const answersCorrect = (questionId, userId,choice,callback) => {
  getQuestionById(questionId, (err,data) => {
    if(err){
      console.log(err);
    } else {
      console.log(data);
      userController.getUserById(userId,(err,user) => {
        if(err){
          console.log(err);
        } else {
          console.log(user);
          if (data.result === choice) {
            console.log("tang diem");
            user.point += data.points;
            user.save((err,user) => {
              if(err) return console.log(err);
              else callback(null,user);
            });
          } else {
            console.log("khong tang diem");
          }
        }
      })
    }
  });
  // .then((question) => {
  //   if(question.result === choice){
  //     let user = userController.getUserById(userId,(err,data) => {
  //       if(err) {
  //         console.log("goi vao err");
  //         console.log(err);
  //       } else {
  //         console.log("goi vao not err");
  //         console.log(null, data);
  //         user.point += question.points;
  //         user.save();
  //       }
  //     });
  //   }
  // }).catch(err => console.log(err));
}


module.exports = {
  getAllQuestions,
  getQuestionById,
  getRandomQuestion,
  createNewQuestion,
  deleteAnQuestion,
  answersCorrect
}
