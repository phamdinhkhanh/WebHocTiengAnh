const questionController = require('../controllers/questionController');
const express = require('express');
const router = express.Router();

//tao mot question moi
router.post('/',(req,res) => {
  questionController.createNewQuestion(req.body,(err,data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      // res.status(200).send(data);
    }
  })
})

//lay toan bo cau hoi
router.get('/', (req, res) => {
  questionController.getRandomQuestion((err,data) => {
    if(err){
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
      // res.redirect(`/api/question/${data._id}`);
      res.render("question");
    }
  });
})

//delete cau hoi theo id
router.get('/delete/:id',(req,res) => {
  questionController.deleteAnQuestion(req.params.id,(err,data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send({message:"delete success!"})
    }
  })
})

//lay cau hoi theo id
router.get('/:id',(req, res) => {
  questionController.getQuestionById(req.params.id,(err,data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
})


//update diem khi tra loi dung
router.post('/:questionId/:userId',(req,res) => {
  questionController.answersCorrect(req.params.questionId,req.params.userId, req.body.result, (err,data) =>{
    if (err) {
      console.log("ban da sai roi");
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log("ban da dung roi");
      res.status(200).send(data);
    }
  });
})

module.exports = router;
