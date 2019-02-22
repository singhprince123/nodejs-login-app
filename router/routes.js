const express = require('express');
const router = express.Router();
const User = require('../model/user')
const jwt = require('jsonwebtoken');


router.post('/register', (req, res) => {
    let userData = req.body
    
    User.findOne({email: userData.email}, (err ,user ) => {
      if(err){
        console.log(err)
      }else {
        if(user){
          res.send('User Already Exists.')
        }else{
          let user = new User(userData);
          user.save((err, registeredUser) => {
            if (err) {
              console.log(err)      
            } else {
              
              res.status(201)
            }
          })
        }
      }
    })
      
   
  })
  
  router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({email: userData.email}, (err, user) => {
      if (err) {
        console.log(err)    
      } else {
        if (!user) {
          res.status(401).send('Invalid Email')
        } else 
        if ( user.password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = {subject: user._id}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token,  name :userData.name})
        }
      }
    })
  })
  
  

  module.exports = router;