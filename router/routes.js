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
          res.json({ message: 'User Already Exists'})
        }else{
          let user = new User(userData);
          user.save((err, registeredUser) => {
            if (err) {
              console.log(err)      
            } else {
              
              res.status(201).json({ message: 'Registration Successfull..'})
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
          res.status(401).json({message: "Invalid Email"})
        } else 
        if ( user.password !== userData.password) {
          res.status(401).json({message: "Password Incorrect"})
        } else {
          let payload = {subject: user._id}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).json({token,  name :userData.name})
        }
      }
    })
  })
  
  

  module.exports = router;