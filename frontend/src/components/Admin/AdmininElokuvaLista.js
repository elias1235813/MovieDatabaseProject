import React, { useState } from 'react';
import AdmininElokuvaKortti from './AdmininElokuvaKortti';

const AdmininElokuvaLista = () => {
  const [leffat, setLeffat] = useState([
    {
      // Esimerkkidataa, joka korvataan kannan tiedoilla
      id: 1,
      nimi: 'Titanic',
      ohjaaja: 'Joku jota en muista',
      julkaisuvuosi: 1997,
      kuvaus: 'Laiva uppoaa ja ihmisiä kuolee.',
      arviot: 5,
      kuvaURL:
        'https://th.bing.com/th/id/R.08b8b82ae2176593cd91a089e4cc2597?rik=xKozU2PKX%2fC1Vg&pid=ImgRaw&r=0',
    },

    {
      id: 2,
      nimi: 'Leijonakuningas',
      ohjaaja: 'Joku jota en muista',
      julkaisuvuosi: 1994,
      kuvaus: 'Leijonat käyvät valtataistelua ja Mufasa kuolee.',
      arviot: 8.8,
      kuvaURL:
        'https://elokuvalisenssi.fi/wp-content/uploads/2021/07/u0ayQBxXKajRMl1tfGCPSoC3vBg-scaled-1.jpg',
    },
  ]);
  // Varsinainen kortti:
  return (
    <section className="movie-list">
      {leffat.map((leffa) => (
        <AdmininElokuvaKortti
          id={leffa.id}
          nimi={leffa.nimi}
          ohjaaja={leffa.ohjaaja}
          julkaisuvuosi={leffa.julkaisuvuosi}
          kuvaus={leffa.kuvaus}
          arviot={leffa.arviot}
          kuvaURL={leffa.kuvaURL}
        />
      ))}
    </section>
  );
};

export default AdmininElokuvaLista;
