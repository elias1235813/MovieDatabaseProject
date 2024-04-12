import React from 'react';
import { useLoaderData } from 'react-router-dom';

// React Routerin loader, joka hakee elokuvan tiedot näkymään
export async function leffaLoader({ params }) {
  //  TODO: ELokuvan tietojen haku bäkkäriltä tähän
  return { leffa: { id: params.leffanId } };
}

const ElokuvanOmaNakyma = () => {
  // Tätä pitää täydentää järkevämmällä html:llä
  const { leffa } = useLoaderData();
  return <section>TÄHÄN TULEE ELOKUVAN {leffa.id} TIEDOT</section>;
};

export default ElokuvanOmaNakyma;
