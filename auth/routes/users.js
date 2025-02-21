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
router.post('/register',async (req, res) => {
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
    const user = await User.findOne({ email: email });
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

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      newUser.password = hash;
      await newUser.save()
      
      req.flash(
        'success_msg',
        'You are now registered and can log in'
      );
      res.redirect('/users/login');
    }
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
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  }); 
});

module.exports = router;
