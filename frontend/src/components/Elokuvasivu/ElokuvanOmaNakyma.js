import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';


// React Routerin loader, joka hakee elokuvan tiedot näkymään
export async function leffaLoader({ params }) {

  /*   
  const [elokuva, setMovies] = useState(null);

  useEffect(() => {
    fetchData(params.leffanId);
  }, [params.leffanId]); 

  const fetchData = async (id) => {
    try {
      const response = await fetch('/api/movies/${id}');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Elokuvan tietojen hakeminen epäonnistui:', error);
    }
  }; */

  return { leffa: { id: params.leffanId,
                    nimi: 'kyllikki',
                    vuosi: 1991,
                    kuva: 'https://img.ilcdn.fi/NqIiKVWRx2aUnnD143iUv8SMgr8=/full-fit-in/920x0/img-s3.ilcdn.fi/9e4131bc225129dc25be6e78bb60f8b357244bb351ac7a74741b629cedf92821.jpg',
                    kuvaus: 'jeejee',
                    kesto: '2h 3min',
                    arvio: 9.9 } };
}

const ElokuvanOmaNakyma = () => {
  // Tätä pitää täydentää järkevämmällä html:llä
  const { leffa } = useLoaderData();
  return <section>
    <h1>{leffa.nimi}</h1>
    <p>{leffa.vuosi}</p>
    <img src={leffa.kuva} className="img-fluid" alt={leffa.nimi}/>
    <p>{leffa.kuvaus}</p>
    <p>ARVIO:{leffa.arvio}</p>
    <p>KESTO: {leffa.kesto}</p>
  </section>;
};

export default ElokuvanOmaNakyma;