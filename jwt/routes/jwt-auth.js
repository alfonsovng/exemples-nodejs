var express = require('express');
var router = express.Router();
let jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var User = require('../models/User');
let config = require('../config');
let passport = require('passport');

// Register new users
router.post('/register', async function(req, res) {
  if (!req.body.email || !req.body.password) {
    return res.json({
      success: false,
      message: 'Please enter email and password.'
    });
  }

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });
  if(user) {
    return res.json({
      success: false,
      message: 'That email address already exists.'
    });
  }
  
  // Create a new user
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  let newUser = new User({
    email: email,
    jwt_version: 0,
    password: hash
  });

  //Save the new user
  await newUser.save();
  res.json({
    success: true,
    message: 'Successfully created new user.'
  });
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/login', async function(req, res) {
  if (!req.body.email || !req.body.password) {
    return res.json({
      success: false,
      message: 'Please enter email and password.'
    });
  }

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });
  if(!user) {
    return res.json({
      success: false,
      message: 'Authentication failed. User not found.'
    });
  }

  if(bcrypt.compareSync(password, user.password)){
    // Create token if the password matched and no error was thrown
    const payload = {
      user_id: user.id,
      jwt_version: user.jwt_version
    };
    console.log('payload', payload);
    const token = jwt.sign(payload, config.auth.secret, {
      expiresIn: "2 days"
    });

    res.json({
      success: true,
      message: 'Authentication successfull',
      token
    });
  } else {
    res.send({
      success: false,
      message: 'Authentication failed. Passwords did not match.'
    });
  }
});

router.delete('/logout', passport.authenticate('jwt', {
  session: false
}), async function(req, res) {
  req.user.jwt_version += 1;
  await req.user.save();
  res.json({
    success: true,
    message: 'Successfully logged out.'
  });
});

module.exports = router;
