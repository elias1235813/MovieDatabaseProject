import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import LisaaElokuva from './LisaaElokuva.js';
import MuokkaaJaPoistaElokuva from './MuokkaaJaPoistaElokuva.js';

const AdminNakyma = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <section>
      {isLoggedIn ? (
        <>
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
