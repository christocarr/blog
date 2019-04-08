const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  try {
    if (user) {
      return res.render('register', {error: 'Username is taken'});
    } else {
      const newUser = new User({
        username,
        password
      });
  
      await newUser.save()
      req.flash('success', 'Please login')
      return res.redirect('login');
  
    }
  } catch (err) {
    return res.render('register', {error: 'Something went wrong'});
  }
  
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login', 
    failureFlash: true
}));

module.exports = router;