import React from 'react';
import AdmininElokuvaLista from './AdmininElokuvaLista';

const MuokkaaJaPoistaElokuva = () => {
  return (
    <section className="adminosio">
      <h2>
        Elokuvan tietojen päivittäminen ja elokuvan poistaminen tietokannasta
      </h2>
      <p>
        Etsi elokuva nimen perusteella alla olevasta listasta muokataksesi sen
        tietoja tai poistaaksesi sen tietokannasta
      </p>
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Etsi nimellä
        </button>
      </form>
      <AdmininElokuvaLista></AdmininElokuvaLista>
    </section>
  );
};

export default MuokkaaJaPoistaElokuva;
