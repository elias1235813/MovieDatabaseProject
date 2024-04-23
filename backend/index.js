const cors = require('cors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const Movie = require('./models/Movie');
const session = require('express-session');
const { validationResult } = require('express-validator');
const { patchChecker, postChecker } = require('./validointiJaSanitointi');
const app = express();
const axios = require('axios');

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(
  session({
    secret: 'SgMvi9ivQdXMiQMTCQUr',
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: 'None',
      secure: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

//Sallitaan localhost:3001 hakea dataa localhost:3000:sta
app.use(
  cors({
    origin: 'http://localhost:3001',
  })
);

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
// Käyttäjä ja salasana
const adminCredentials = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123',
};

// Admin login
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (
    username === adminCredentials.username &&
    password === adminCredentials.password
  ) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Example protected route
app.get('/admin/data', (req, res) => {
  if (req.session.isLoggedIn) {
    // Return data if user is logged in
    res.json({ data: 'Protected data' });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Logout
app.post('/admin/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      res.status(500).json({ message: 'Logout failed' });
    } else {
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.status(200).json({ message: 'Logout successful' });
    }
  });
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

app.get('/api/movies/:id', cors(), async (req, res) => {
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

const API_KEY = '';

// API POST
app.post('/api/movies', postChecker, async (req, res) => {
  // validationResult: express-validatorin funktio, joka lukee mahdolliset validointivirheet req-objektista ja
  // palauttaa validoinnin tuloksen: jos tulos on tyhjä, kaikki on ok. Virhetilanteissa palauttaa virheet results-objetin errors taulukossa.
  const result = validationResult(req);

  if (!result.isEmpty()) {
    // Palautetaan virheestä path, koska siitä nähdään, mikä kenttä on pielessä

    // Koska jostain syystä virheissä on joskus sama kenttä tuplana, lisätään virheellinen tieto invalidFields-taulukkoon vain kerran
    const invalidFields = [];
    result.errors.forEach((error) => {
      if (!invalidFields.includes(error.path)) {
        invalidFields.push(error.path);
      }
    });

    res.status(400).json({
      invalidFields: invalidFields,
    });
    return;
  }

  try {
    // ota data requestista
    const {
      title,
      year,
      director,
      runtime,
      tmdbMovieId,
      description,
      genre,
      image,
    } = req.body;

    // Hae elokuvan tiedot TMDB:stä (tmdbMovieId on linkki elokuvaan sivulla)
    const tmdbResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdbMovieId}?api_key=${API_KEY}`
    );
    const tmdbMovieData = tmdbResponse.data;
    console.log(tmdbResponse);

    // Ota arvostelut TMDB:n datasta
    const tmdbRating = tmdbMovieData.vote_average;

    // Lisää uusi elokuva
    const newMovie = new Movie({
      title,
      year,
      director,
      runtime,
      rating: tmdbRating,
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
app.patch('/api/movies/:id', patchChecker, async (req, res) => {
  // validationResult: express-validatorin funktio, joka lukee mahdolliset validointivirheet req-objektista ja
  // palauttaa validoinnin tuloksen: jos tulos on tyhjä, kaikki on ok. Virhetilanteissa palauttaa virheet results-objetin errors taulukossa.
  const result = validationResult(req);

  if (!result.isEmpty()) {
    // Palautetaan virheestä path, koska siitä nähdään, mikä kenttä on pielessä

    // Koska jostain syystä virheissä on joskus sama kenttä tuplana, lisätään virheellinen tieto invalidFields-taulukkoon vain kerran
    const invalidFields = [];
    result.errors.forEach((error) => {
      if (!invalidFields.includes(error.path)) {
        invalidFields.push(error.path);
      }
    });

    res.status(400).json({
      invalidFields: invalidFields,
    });
    return;
  }

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
});

module.exports = app;
