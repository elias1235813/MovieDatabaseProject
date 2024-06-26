import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import LisaaElokuva from './LisaaElokuva.js';
import MuokkaaJaPoistaElokuva from './MuokkaaJaPoistaElokuva.js';
import Logout from './logout.js';
import { Link } from 'react-router-dom';
const AdminNakyma = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if session token exists in local storage
    const token = localStorage.getItem('sessionToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    // Upon successful login, set session token in local storage
    localStorage.setItem('sessionToken', 'your_session_token_here');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Clear session token from local storage and reset isLoggedIn state
    localStorage.removeItem('sessionToken');
    setIsLoggedIn(false);
  };

  return (
    <section>
      {isLoggedIn ? (
        <>
          <Link
            className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            to="/"
            role="link"
            aria-label="Palaa takaisin etusivulle"
          >
            Takaisin etusivulle
          </Link>
          <Logout onLogout={handleLogout} className="logout-button" />

          <h1>Tervetuloa tietokannan ylläpitoon!</h1>
          <p>
            Täällä voit lisätä tietokantaan uusia elokuvia, päivittää elokuvien
            tietoja sekä poistaa elokuvia tietokannasta.
          </p>
          <hr />
          <LisaaElokuva />
          <hr />
          <MuokkaaJaPoistaElokuva />
        </>
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </section>
  );
};

export default AdminNakyma;
