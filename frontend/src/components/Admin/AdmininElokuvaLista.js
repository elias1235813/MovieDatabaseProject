import React, { useState, useEffect } from 'react';
import AdmininElokuvaKortti from './AdmininElokuvaKortti';

//Nämä liittyy alertiin, joka tulee, jos tietoja on yritetty syöttää väärin
const elokuvanDetailitSuomeksi = {
  title: 'Nimi',
  director: 'Ohjaaja',
  year: 'Julkaisuvuosi',
  tmdbMovieId: 'TMDB ID',
  runtime: 'Kesto',
  description: 'Kuvaus',
  image: 'Kuvan URL',
};

function AdmininElokuvaLista() {
  const [leffat, setMovies] = useState([]);

  // FUNKTIO:  ELOKUVIEN HAKEMINEN
  const fetchData = async () => {
    try {
      const response = await fetch('/api/movies');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Elokuvien hakeminen epäonnistui:', error);
    }
  };

  // HAETAAN ALUKSI ELOKUVAT
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this effect will run only once after the initial render

  // LEFFAN TIETOJEN PÄIVITTÄMINEN
  // Päivitetyn leffan tiedot viedään bäkkärille:
  const muokkaaLeffanTietoja = async (paivitettyLeffa) => {
    try {
      const response = await fetch(`/api/movies/${paivitettyLeffa._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paivitettyLeffa),
      });
      if (response.ok) {
        console.log('Elokuvan tiedot päivitetty onnistuneesti.');
        alert('Elokuvan tiedot päivitetty onnistuneesti.');
        // Haetaan elokuvat uudestaan, jotta päivitetyt tiedot saadaan näkyviin
        await fetchData();
      } else if (response.status === 400) {
        const responseBody = await response.json();

        // Virheellisten kenttien tiedot ilmoitetaan suomeksi:
        const virheellisetKentatSuomeksi = responseBody.invalidFields.map(
          (invalidField) => {
            return elokuvanDetailitSuomeksi[invalidField];
          }
        );

        alert(
          'Elokuvan tietojen päivittäminen epäonnistui.Tarkista seuraavat kentät: ' +
            virheellisetKentatSuomeksi.join(', ') +
            '.'
        );
      } else {
        console.error('Elokuvan tietojen päivittäminen epäonnistui.');
        alert('Elokuvan tietojen päivittäminen epäonnistui.');
      }
    } catch (error) {
      console.error('Elokuvan tietojen päivittäminen epäonnistui.', error);
      alert('Elokuvan tietojen päivittäminen epäonnistui.');
    }
  };

  // LEFFAN POISTAMINEN TIETOKANNASTA
const poistaElokuva = async (movieId) => {
  try {
    //Varmistus ennen poistoa
    const confirmDelete = window.confirm('Oletko varma, että haluat poistaa elokuvan?');
    if (!confirmDelete) {
      return; // jos käyttäjä peruuttaa älä tee mitään
    }

    const response = await fetch(`/api/movies/${movieId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      // Jos poisto onnistuu, poista elokuva listalta
      setMovies(leffat.filter((movie) => movie._id !== movieId));
      console.log('Movie deleted successfully');
      alert('Elokuvan poistaminen onnistui.');
    } else {
      console.error('Failed to delete movie');
      alert('Elokuvan poistaminen epäonnistui.');
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
    alert('Elokuvan poistaminen epäonnistui.');
  }
};


  // NÄKYMÄN HTML:
  return (
    <section className="movie-list">
      {leffat.map((leffa) => (
        <AdmininElokuvaKortti
          key={leffa._id}
          leffa={leffa}
          onDelete={() => poistaElokuva(leffa._id)}
          onUpdate={(paivitettavaLeffa) =>
            muokkaaLeffanTietoja(paivitettavaLeffa)
          }
        />
      ))}
    </section>
  );
}
export default AdmininElokuvaLista;
