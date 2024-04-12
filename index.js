const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

const dbURI = 'mongodb+srv://'+process.env.DBUSERNAME+':'+process.env.DBPASSWORD+'@'+process.env.CLUSTER+'.mongodb.net/'+process.env.DB+'?retryWrites=true&w=majority&appName=Cluster0';
console.log(dbURI);

mongoose.connect(dbURI)
.then((result) => 
{
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log("Listening on " + PORT));
    console.log('Connected to DB');
})
.catch((err) => {
    console.log(err);
})

const Movie = require('./models/Movie');


//Testaukseen käyttettyä koodia
/*
const newMovie = new Movie({
  name: "The Matrix",
  year: 1999,
  director: ["Lana Wachowski", "Lily Wachowski"],
  runtime: "2h 16m",
  rating: 8.7,
  description: "Keanu Reeves uhmaa fysiikan lakeja ja väistelee luoteja",
  genre: ["Action", "Scifi"],
  image: "https://irs.www.warnerbros.com/keyart-jpeg/movies/media/browser/Matrix_2000x3000.JPEG"
});


newMovie.save()
.then((result) =>
{
    console.log(result);
})
.catch((err) => {
    console.log(err);
})

*/

/*
Movie.find()
.then((result) =>
{
    console.log(result);
})
.catch((err) => {
  console.log(err);
})
*/

// API GET 
app.get('/movies', async (req, res) => {
    try{
      const result = await Movie.find();
      res.json(result);
    }
    catch (error) {
      console.log(error);
    }

})

// API POST
app.post('/movies', async (req, res) => {
  try {
  // ota data requestista
  const { name, year, director, runtime, rating, description, genre, image } = req.body;

    // Lisää uusi elokuva
    const newMovie = new Movie({ 
      name,
      year, 
      director,
      runtime,
      rating,
      description,
      genre,
      image
    });

    // Tallenna elokuva tietokantaan
    const savedMovie = await newMovie.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// API DELETE
app.delete('/movies:id', async (req, res) => {
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


module.exports = app
