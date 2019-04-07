const router = require('express').Router();
const User = require('../models/user');

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
      req.flash('error', 'Username is taken')
      return res.render('register');
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
    req.flash('error', 'Something went wrong')
    return res.render('register');
  }
  
});

module.exports = router;