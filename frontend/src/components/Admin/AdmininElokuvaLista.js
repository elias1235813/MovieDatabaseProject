import React, { useState, useEffect } from 'react';
import AdmininElokuvaKortti from './AdmininElokuvaKortti';

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

  // FUNKTIO, JOKA MUOKKAA LEFFAN TIETOJA
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
      const response = await fetch(`/api/movies/${movieId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // If delete is successful, remove the movie from the list
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
          onDelete={() => poistaElokuva(leffa._id)} // Pass handleDelete function to child component
          onUpdate={(paivitettyleffa) => muokkaaLeffanTietoja(paivitettyleffa)}
        />
      ))}
    </section>
  );
}
export default AdmininElokuvaLista;
