const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

//tao mot question moi
router.post('/',(req,res) => {
  userController.createUser(req.body,(err,data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
})

//lay toan bo cau hoi
router.get('/', (req, res) => {
  userController.getAllUser((err,data) => {
    if(err){
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
})


//lay thong tin user
router.get('/:id',(req, res) => {
  userController.getUserById(req.params.id,(err,data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
})

module.exports = router;
