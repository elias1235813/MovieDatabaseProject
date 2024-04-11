const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = 'mongodb+srv://'+process.env.DBUSERNAME+':'+process.env.DBPASSWORD+'@'+process.env.CLUSTER+'.mongodb.net/'+process.env.DB+'?retryWrites=true&w=majority&appName=Cluster0';
console.log(dbURI);

mongoose.connect(dbURI)
.then((result) => 
{
    console.log('Connected to DB');
})
.catch((err) => {
    console.log(err);
})

const Movie = require('./models/Movie');

const newMovie = new Movie({
    name: 'Something',
    year: 1991
});

/*
newMovie.save()
.then((result) =>
{
    console.log(result);
})
.catch((err) => {
    console.log(err);
})
*/

Movie.find()
.then((result) =>
{
    console.log(result);
})
