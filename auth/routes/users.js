const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../middleware/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = false;

  if (!name || !email || !password || !password2) {
    req.flash(
      'error_msg',
      'Please enter all fields'
    );
    errors = true;
  }

  if (password != password2) {
    req.flash(
      'error_msg',
      'Passwords do not match'
    );
    errors = true;
  }

  if (password.length < 6) {
    req.flash(
      'error_msg',
      'Password must be at least 6 characters'
    );
    errors = true;
  }

  if (errors) {
    res.render('register', {
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        req.flash(
          'error_msg',
          'Email already exists'
        );
        res.render('register', {
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash:  { "type": "error_msg" }
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res, next) => {
  // req.logout();
  // req.flash('success_msg', 'You are logged out');
  // res.redirect('/users/login');
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  }); 
});

module.exports = router;
