const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const indexRoutes = require('./routes/index');

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => console.log('MONGODB connected'))
  .catch((err) => console.log(err))

const app = express();

app.set('view engine', 'ejs');

app.use('/', indexRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));