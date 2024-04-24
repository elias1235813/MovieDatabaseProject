import React from 'react';
import { Link } from 'react-router-dom';

const Navigaatio = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Linkkijutut routerista */}
        <Link className="navbar-brand" to="/">
          Leffatietokanta
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/admin">
                Ylläpito
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigaatio;
