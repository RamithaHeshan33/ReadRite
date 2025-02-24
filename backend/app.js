const express = require('express');
const mongoose = require('mongoose');
const indexRoutes = require('./routes/indexRoutes');
const app = express();

//middleware
app.use(express.json());
app.use('/', indexRoutes);

//connect to db
mongoose.connect("mongodb+srv://admin:JnK5hxTClLlTYnrJ@cluster0.g8k5a.mongodb.net/")
.then(() => {console.log('Connected to db')})
.then(() => {app.listen(5000, () => {console.log('Server is running')})})
.catch(err => {console.log(err)});