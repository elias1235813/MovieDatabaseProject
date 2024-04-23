import React, { useState } from 'react';
const elokuvanDetailitSuomeksi = {
  title: 'Nimi',
  director: 'Ohjaaja',
  year: 'Julkaisuvuosi',
  // rating: 'Arviot',
  tmdbMovieId: 'TMDB ELokuva ID',
  runtime: 'Kesto',
  description: 'Kuvaus',
  image: 'Kuvan URL',
};
const LisaaElokuva = () => {
  // State variables to hold form data
  const [tmdbMovieId, settmdbMovieId] = useState('');

  // Function to handle TMDB movie link input change
  const handletmdbMovieIdChange = (e) => {
    settmdbMovieId(e.target.value);
  };

  const [formData, setFormData] = useState({
    title: '',
    year: '',
    director: '',
    runtime: '',
    rating: '',
    description: '',
    genre: '',
    image: '',
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // TMDB movieID tarkistus
    // if (!tmdbMovieId || isNaN(tmdbMovieId)) {
    //   alert('Please input a valid TMDB movie ID. For example, in this link: https://www.themoviedb.org/movie/1202208-muumipeikko-ja-pyrstotahti, the numbers after movie/ are the ID.');
    //   return;
    // }

    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tmdbMovieId: tmdbMovieId,
          genre: formData.genre.split(',').map((item) => item.trim()),
          director: formData.director.split(',').map((item) => item.trim()),
        }),
      });
      if (response.ok) {
        // Movie added successfully
        console.log('Movie added successfully');
        alert('Elokuva lisätty onnistuneesti.');
        // Clear the form
        setFormData({
          title: '',
          year: '',
          director: '',
          runtime: '',
          rating: '',
          description: '',
          genre: '',
          image: '',
        });
        location.reload();
      } else if (response.status === 400) {
        const responseBody = await response.json();

        // elokuvanDetailitSuomeksi
        const virheellisetKentatSuomeksi = responseBody.invalidFields.map(
          (invalidField) => {
            return elokuvanDetailitSuomeksi[invalidField];
          }
        );

        alert(
          'Elokuvan tietojen lisääminen epäonnistui.Tarkista seuraavat kentät: ' +
            virheellisetKentatSuomeksi.join(', ') +
            '.'
        );
      } else {
        console.error('Failed to add movie');
        alert('Elokuvan lisääminen epäonnistui.');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Elokuvan lisääminen epäonnistui.');
    }
  };

  return (
    <section className="adminosio">
      <h2>Lisää elokuva</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className="form-label">
          Nimi
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="esim. Koodarin painajainen"
          aria-label="Elokuvan nimi"
          id="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <label htmlFor="year" className="form-label">
          Julkaisuvuosi
        </label>
        <input
          type="number"
          className="form-control"
          placeholder="esim. 2024"
          aria-label="Julkaisuvuosi"
          id="year"
          value={formData.year}
          onChange={handleInputChange}
        />

        <label htmlFor="director" className="form-label">
          Ohjaaja
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="esim. Tiina Sassali, Elias Vuorenmaa, Iida Savimäki"
          aria-label="ohjaaja"
          id="director"
          value={formData.director}
          onChange={handleInputChange}
        />

        <label htmlFor="runtime" className="form-label">
          Kesto (muodossa 00h 00m)
        </label>
        <input
          type="text"
          placeholder="esim. 6h 24m"
          aria-label="Kesto"
          className="form-control"
          id="runtime"
          value={formData.runtime}
          onChange={handleInputChange}
        />

        <label htmlFor="tmdbMovieId" className="form-label">
          TMDB Elokuva ID <br />
          <i>
            ID on numerosarja, joka löytyy TMDB:stä elokuvan sivun
            verkko-osoitteesta. <br />
            Esim. osoitteessa: https://www.themoviedb.org/movie/<b>1202208</b>
            -muumipeikko-ja-pyrstotahti ID on <b>1202208</b>.
          </i>
        </label>
        <input
          type="text"
          placeholder="esim. 123987"
          aria-label="TMDB ID"
          className="form-control"
          id="tmdbMovieId"
          value={tmdbMovieId}
          onChange={handletmdbMovieIdChange}
        />

        <label htmlFor="description" className="form-label">
          Kuvaus
        </label>
        <textarea
          className="form-control"
          placeholder="Kirjoita elokuvan lyhyt kuvaus tähän. Juonipaljastukset sallittu."
          aria-label="Kuvaus"
          id="description"
          value={formData.description}
          onChange={handleInputChange}
        />

        <label htmlFor="genre" className="form-label">
          Genret (pilkulla erotettuna)
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="esim. Komedia, Kauhu, Fantasia"
          aria-label="Genret"
          id="genre"
          value={formData.genre}
          onChange={handleInputChange}
        />

        <label htmlFor="image" className="form-label">
          Kuvan URL
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="esim. https://kuva.fi/kuva1"
          aria-label="Kuvan url"
          id="image"
          value={formData.image}
          onChange={handleInputChange}
        />

        <button type="submit" className="btn btn-outline-success">
          Tallenna
        </button>
      </form>
    </section>
  );
};

export default LisaaElokuva;
