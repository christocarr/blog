const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const indexRoutes = require('./routes/index');
const session = require('express-session');

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => console.log('MONGODB connected'))
  .catch((err) => console.log(err))

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use('/', indexRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));