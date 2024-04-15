import React, { useState, useEffect } from 'react';
import ElokuvaKortti from './ElokuvaKortti';
import axios from 'axios';


function Elokuvalista(){
  const [leffat, setMovies] = useState([]);

  useEffect(() => {
    axios.get('/movies')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Elokuvien hakeminen epäonnistui', error);
      });
  }, []);
  
  return (
    <section className="movie-list">
      {leffat.map((leffa) => (
        <ElokuvaKortti
          key={leffa.id}
          id={leffa.id}
          nimi={leffa.title}
          julkaisuvuosi={leffa.year}
          kuvaus={leffa.description}
          kuvaURL={leffa.image}
        />
      ))}
    </section>
  );



}

/*
const ElokuvaLista = () => {
  const [leffat, setLeffat] = useState([
    {
      // Esimerkkidataa, joka korvataan kannan tiedoilla
      id: 1,
      nimi: 'Titanic',
      julkaisuvuosi: 1997,
      kuvaus: 'Laiva uppoaa ja ihmisiä kuolee.',
      kuvaURL:
        'https://th.bing.com/th/id/R.08b8b82ae2176593cd91a089e4cc2597?rik=xKozU2PKX%2fC1Vg&pid=ImgRaw&r=0',
    },

    {
      id: 2,
      nimi: 'Leijonakuningas',
      julkaisuvuosi: 1994,
      kuvaus: 'Leijonat käyvät valtataistelua ja Mufasa kuolee.',
      kuvaURL:
        'https://elokuvalisenssi.fi/wp-content/uploads/2021/07/u0ayQBxXKajRMl1tfGCPSoC3vBg-scaled-1.jpg',
    },
  ]);
  // Varsinainen kortti:
  return (
    <section className="movie-list">
      {leffat.map((leffa) => (
        <ElokuvaKortti
          key={leffa.id}
          id={leffa.id}
          nimi={leffa.nimi}
          julkaisuvuosi={leffa.julkaisuvuosi}
          kuvaus={leffa.kuvaus}
          kuvaURL={leffa.kuvaURL}
        />
      ))}
    </section>
  );
};
*/
export default Elokuvalista;
