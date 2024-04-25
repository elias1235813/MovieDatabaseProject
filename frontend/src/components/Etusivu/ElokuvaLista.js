import React, { useState, useEffect } from 'react';
import ElokuvaKortti from './ElokuvaKortti';

function ElokuvaLista({ searchQuery }) {
  const [suodatetutElokuvat, setSuodatetutElokuvat] = useState([]);
  const [lataa, setLataa] = useState(true);

  useEffect(() => {
    fetchData();
  }, [searchQuery]); // Kysely ajetaan uudestaan kun inputti vaihtuu

  const fetchData = async () => {
    try {
      let url = '/api/movies';
      if (searchQuery.trim() !== '') {
        url += `/genre/${encodeURIComponent(searchQuery)}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Ongelma verkon vastauksessa');
      }
      const data = await response.json();
      setSuodatetutElokuvat(data);
      setLataa(false);
    } catch (error) {
      console.error('Elokuvien haku epäonnistui:', error);
      setLataa(false);
    }
  };

  return (
    <section className="movie-list" aria-label="Elokuvat">
      {lataa ? (
        <p>Ladataan...</p>
      ) : suodatetutElokuvat.length > 0 ? (
        suodatetutElokuvat.map((leffa) => (
          <ElokuvaKortti
            key={leffa._id}
            _id={leffa._id}
            image={leffa.image}
            title={leffa.title}
            year={leffa.year}
            description={leffa.description}
            genre={leffa.genre}
          />
        ))
      ) : (
        <p>Haullasi ei löytynyt tuloksia</p>
      )}
    </section>
  );
}

export default ElokuvaLista;
