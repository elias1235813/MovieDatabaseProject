import React from 'react';

const AdmininElokuvaKortti = ({
  id,
  kuvaURL,
  ohjaaja,
  nimi,
  julkaisuvuosi,
  kuvaus,
  arviot,
}) => {
  return (
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img src={kuvaURL} class="img-fluid rounded-start" alt={nimi} />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 className="card-title">Nimi: {nimi}</h5>
            <p className="card-text">Ohjaaja: {ohjaaja}</p>
            <p className="card-text">Julkaisuvuosi: {julkaisuvuosi}</p>
            <p className="card-text">Kuvaus: {kuvaus}</p>
            <p className="card-text">Arviot: {arviot}</p>
            <button className="btn btn-outline-success">Muokkaa</button>
            <button className="btn btn-outline-success">Poista</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmininElokuvaKortti;
