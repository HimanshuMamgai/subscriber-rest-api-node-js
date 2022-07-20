const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', error => console.log(err));
db.once('open', () => console.log('Conncted to database successfully!'));

app.use(express.json());

const subscribersRouter = require('./routes/subscribers');

app.use('/subscribers', subscribersRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log('Server is runnning')});