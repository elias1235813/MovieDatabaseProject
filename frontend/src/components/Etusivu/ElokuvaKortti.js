import React from 'react';
import { Link } from 'react-router-dom';

const ElokuvaKortti = ({ id, image, title, year, description }) => {
  return (
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img src={image} class="img-fluid rounded-start" alt={title} />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{year}</p>
            <p className="card-text">{description}</p>
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
