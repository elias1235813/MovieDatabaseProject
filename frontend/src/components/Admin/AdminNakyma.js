import React from 'react';
import LisaaElokuva from './LisaaElokuva.js';
// Näkymä, johon kootaan kaikki adminin toiminnot (leffan lisääminen, muokkaaminen ja poisto)
const AdminNakyma = () => {
  return (
    <section>
      <h1>Tervetuloa tietokannan ylläpitoon!</h1>
      <p>
        Täällä voit lisätä tietokantaan uusia elokuvia, päivittää elokuvien
        tietoja sekä poistaa elokuvia tietokannasta.
      </p>
      {/* TODO myöhemmin: elokuvan poistaminen ja muokkaaminen */}
      <LisaaElokuva />
    </section>
  );
};

export default AdminNakyma;
