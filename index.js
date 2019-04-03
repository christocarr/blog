const express = require('express');
const dotenv = require('dotenv');

const indexRoutes = require('./routes/index');

dotenv.config();

const app = express();

app.set('view engine', 'ejs');

app.use('/', indexRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));