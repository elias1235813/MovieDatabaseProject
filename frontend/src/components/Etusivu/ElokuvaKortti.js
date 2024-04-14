import React from 'react';
import { Link } from 'react-router-dom';

const ElokuvaKortti = ({ id, kuvaURL, nimi, julkaisuvuosi, kuvaus }) => {
  return (
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img src={kuvaURL} class="img-fluid rounded-start" alt={nimi} />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 className="card-title">{nimi}</h5>
            <p className="card-text">{julkaisuvuosi}</p>
            <p className="card-text">{kuvaus}</p>
            {/* Routerin juttuja */}
            <Link className="btn btn-primary" to={`/leffat/${id}`}>
              Katso lisää
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElokuvaKortti;
