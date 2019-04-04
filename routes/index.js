const router = require('express').Router();
const User = require('../models/User');


router.get('/', (req, res) => {
  res.render('../views/index');
});

router.get('/register', (req, res) => {
  res.render('../views/register');
});

module.exports = router;