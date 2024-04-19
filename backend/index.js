const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const Movie = require('./models/Movie');

const app = express();

// Middleware
app.use(express.json());

// Frontin syöttäminen backendiin
app.use(express.static(path.join(__dirname, '../frontend/build')));

const dbURI =
  'mongodb+srv://' +
  process.env.DBUSERNAME +
  ':' +
  process.env.DBPASSWORD +
  '@' +
  process.env.CLUSTER +
  '.mongodb.net/' +
  process.env.DB +
  '?retryWrites=true&w=majority&appName=Cluster0';
console.log(dbURI);
// jnj
mongoose
  .connect(dbURI)
  .then((result) => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log('Listening on ' + PORT));
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log(err);
  });

// API GET
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.log(error);
  }
});

//API GET ONE BY ID

app.get('/api/movies/:id', async (req, res) => {
  try {
    const movies = await Movie.findById(req.params.id);
    res.json(movies);
  } catch (error) {
    console.log(error);
  }
});

// API GET BY GENRE

app.get('/api/movies/genre/:genre', async (req, res) => {
  try {
    const genre = req.params.genre;
    const movies = await Movie.find({ genre: genre });
    res.json(movies);
  } catch (error) {
    console.log(error);
  }
});

// API GET BY TITLE

app.get('/api/movies/title/:title', async (req, res) => {
  try {
    const title = req.params.title;
    const movies = await Movie.find({ title: title });
    res.json(movies);
  } catch (error) {
    console.log(error);
  }
});

// API POST
app.post('/api/movies', async (req, res) => {
  try {
    // ota data requestista
    const {
      title,
      year,
      director,
      runtime,
      rating,
      description,
      genre,
      image,
    } = req.body;

    // Lisää uusi elokuva
    const newMovie = new Movie({
      title,
      year,
      director,
      runtime,
      rating,
      description,
      genre,
      image,
    });

    // Tallenna elokuva tietokantaan
    const savedMovie = await newMovie.save();

    res.status(201).json(savedMovie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// API DELETE
app.delete('/api/movies/:id', async (req, res) => {
  try {
    // Ota elokuvan id requestista
    const movieID = req.params.id;

    // Löydä elokuva id:n perusteella
    const deletedMovie = await Movie.findByIdAndDelete(movieID);

    // Jos elokuvaa ei löydy palauta 404 Not Found
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Elokuvaa ei löytynyt' });
    }

    res.json(deletedMovie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// API UPDATE (PATCH)
app.patch('/api/movies/:id', async (req, res) => {
  try {
    // Päivitettävä elokuva valitaan id:n perusteella
    const filter = { _id: req.params.id };

    // Luetaan pyynnöstä elokuvan päivitettävät tiedot update-objektiin
    const update = {};

    const movieDetails = [
      'title',
      'year',
      'director',
      'runtime',
      'rating',
      'description',
      'genre',
      'image',
    ];

    movieDetails.forEach((movieDetail) => {
      if (req.body[movieDetail] != null) {
        update[movieDetail] = req.body[movieDetail];
      }
    });

    // Päivitetään tiedot

    const updatedMovie = await Movie.findOneAndUpdate(filter, update, {
      new: true,
      upsert: false,
    });

    // Status 200, jos kaikki ok

    res.status(200).json(updatedMovie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Handle other routes by serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
});

module.exports = app;
