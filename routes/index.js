const router = require('express').Router();
const User = require('../models/user');
const Post = require('../models/Post');
const passport = require('passport');

router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ created: -1 }).exec();
  res.render('index', { posts: posts });
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

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You successfully logged out');
  res.redirect('/');
});

module.exports = router;