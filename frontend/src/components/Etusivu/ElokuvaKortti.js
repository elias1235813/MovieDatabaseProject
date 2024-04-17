import React from 'react';
import { Link } from 'react-router-dom';

const ElokuvaKortti = ({ _id, image, title, year, description }) => {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={image} class="img-fluid rounded-start" alt={title} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{year}</p>
            <p className="card-text">{description}</p>
            {/* Routerin juttuja */}
            <Link className="btn btn-primary" to={`/leffat/${_id}`}>
              Katso lisää
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElokuvaKortti;
