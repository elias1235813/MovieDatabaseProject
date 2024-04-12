import React from 'react';
import LisaaElokuva from './LisaaElokuva,js';

const AdminNakyma = () => {
  return (
    <section>
      <h1>Tervetuloa toetokannan ylläpitoon!</h1>
      <p>
        Täällä voit lisätä tietokantaan uusia elokuvia, päivittää elokuvien
        tietoja sekä poistaa elokuvia tietokannasta.
      </p>
      <LisaaElokuva />
    </section>
  );
};
