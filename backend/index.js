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

mongoose
  .connect(dbURI)
  .then((result) => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log('Listening on ' + PORT));
    console.log('Yhdistetty tietokantaan');
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
    res.status(200).json({ message: 'Kirjautuminen onnistui' });
  } else {
    res.status(401).json({ message: 'Käyttäjätunnus tai salasana virheellinen' });
  }
});

// Näytä data adminissa jos käyttäjä on kirjautunut sisään
app.get('/admin/data', (req, res) => {
  if (req.session.isLoggedIn) {
    res.json({ data: 'Protected data' });
  } else {
    res.status(401).json({ message: 'Ei oikeuksia' });
  }
});

// Logout
app.post('/admin/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Virhe uloskirjautumisessa:', err);
      res.status(500).json({ message: 'Uloskirjautuminen epäonnistui' });
    } else {
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Uloskirjautuminen onnistui' });
    }
  });
});
// API GET
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  }  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sisäinen palvelinvirhe" });
  }
});

//API GET ONE BY ID

app.get('/api/movies/:id', cors(), async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Elokuvaa ei löytynyt" });
    }
    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Väärä ID" });
    }
    res.status(500).json({ message: "Sisäinen palvelinvirhe" });
  }
});


// API GET BY GENRE

app.get('/api/movies/genre/:genre', async (req, res) => {
  try {
    const genre = req.params.genre;
    const movies = await Movie.find({ genre: genre });
    if (!movies.length) {
      return res.status(404).json({ message: "Ei tuloksia" });
    };
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sisäinen palvelinvirhe" });
  }
});


// API GET BY TITLE

app.get('/api/movies/title/:title', async (req, res) => {
  try {
    const title = req.params.title;
    const movies = await Movie.find({ title: title });
    if (!movies.length) {
      return res.status(404).json({ message: "Ei tuloksia" });
    }
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sisäinen palvelinvirhe" });
  }
});


const API_KEY = process.env.APIKEY;

// Elokuvien user scoren päivitys
const updateRatings = async () => {
  try {
    const movies = await Movie.find();

    for (const movie of movies) {
      const tmdbResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.tmdbMovieId}?api_key=${API_KEY}`
      );
      const tmdbMovieData = tmdbResponse.data;
      const tmdbRating = tmdbMovieData.vote_average;

      // Vertaile arvosteluja ja päivitä jos tarvii
      if (tmdbRating !== movie.rating) {
        movie.rating = tmdbRating;
        await movie.save();
      }
    }
  } catch (error) {
    console.error('Arvosteluja päivittäessä ilmeni virhe:', error);
  }
};

// Päivitä use score joka päivä
const updateInterval = 24 * 60 * 60 * 1000; // 24h
setInterval(updateRatings, updateInterval);

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

    // Hae elokuvan tiedot TMDB:stä (tmdbMovieId on elokuvan ID eli numerot elokuvan TMDB linkissä movie/ jälkeen)
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
      tmdbMovieId,
      description,
      genre,
      image,
    });

    // Tallenna elokuva tietokantaan
    const savedMovie = await newMovie.save();

    res.status(201).json(savedMovie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Sisäinen palvelinvirhe' });
  }
});

//API UPDATE (PATCH)
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
    // Päivitettävä elokuva valitaan id:n perusteella ja luetaan pyynnöstä elokuvan päivitettävät tiedot update-objektiin
    const filter = { _id: req.params.id };
    const update = {};

    const movieDetails = [
      'title',
      'year',
      'director',
      'runtime',
      'description',
      'genre',
      'image',
      'tmdbMovieId',
    ];

    movieDetails.forEach((movieDetail) => {
      if (req.body[movieDetail] != null) {
        update[movieDetail] = req.body[movieDetail];
      }
    });

    // Päivitetään tiedot
    if (req.body.tmdbMovieId != null) {
      const tmdbResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${req.body.tmdbMovieId}?api_key=${API_KEY}`
      );
      const tmdbMovieData = tmdbResponse.data;
      const tmdbRating = tmdbMovieData.vote_average;

      update['rating'] = tmdbRating;
    }

    const updatedMovie = await Movie.findOneAndUpdate(filter, update, {
      new: true,
      upsert: false,
    });

    // Status 200, jos kaikki ok
    res.status(200).json(updatedMovie);
  } catch (error) {
    console.log(error);
    //Status 500, jos jotain menee pieleen
    res.status(500).json({ message: 'Sisäinen palvelinvirhe' });
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
    res.status(500).json({ message: 'Sisäinen palvelinvirhe' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
});

module.exports = app;
