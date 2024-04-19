import React from 'react';
import AdmininElokuvaLista from './AdmininElokuvaLista';

const MuokkaaJaPoistaElokuva = () => {
  return (
    <section className="adminosio">
      <h2>
        Elokuvan tietojen päivittäminen ja elokuvan poistaminen tietokannasta
      </h2>
      <p>
        Etsi elokuva alla olevasta listasta muokataksesi sen tietoja tai
        poistaaksesi sen tietokannasta
      </p>

      <AdmininElokuvaLista />
    </section>
  );
};

export default MuokkaaJaPoistaElokuva;
