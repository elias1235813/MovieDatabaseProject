import React from 'react';

const AdmininElokuvaKortti = ({ image, director, title, year, description, rating }) => {
  return (
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img src={image} class="img-fluid rounded-start" alt={title} />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 className="card-title">Nimi: {title}</h5>
            <p className="card-text">Ohjaaja: {director}</p>
            <p className="card-text">Julkaisuvuosi: {year}</p>
            <p className="card-text">Kuvaus: {description}</p>
            <p className="card-text">Arviot: {rating}</p>
            <button className="btn btn-outline-success">Muokkaa</button>
            <button className="btn btn-outline-success">Poista</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmininElokuvaKortti;
