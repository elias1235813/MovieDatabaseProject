import React, { useState, useEffect } from 'react';
import AdmininElokuvaKortti from './AdmininElokuvaKortti';

function AdmininElokuvaLista() {
  const [leffat, setMovies] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this effect will run only once after the initial render

  const fetchData = async () => {
    try {
      const response = await fetch('/api/movies');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Elokuvien hakeminen epäonnistui:', error);
    }
  };

  const poistaElokuva = async (movieId) => {
    try {
      const response = await fetch(`/api/movies/${movieId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // If delete is successful, remove the movie from the list
        setMovies(leffat.filter(movie => movie._id !== movieId));
        console.log('Movie deleted successfully');
      } else {
        console.error('Failed to delete movie');
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <section className="movie-list">
      {leffat.map((leffa) => (
        <AdmininElokuvaKortti
          key={leffa._id}
          _id={leffa._id}
          image={leffa.image}
          title={leffa.title}
          director={leffa.director}
          year={leffa.year}
          rating={leffa.rating}
          description={leffa.description}
          genre={leffa.genre}
          onDelete={() => poistaElokuva(leffa._id)} // Pass handleDelete function to child component
        />
      ))}
    </section>
  );
}
export default AdmininElokuvaLista;
