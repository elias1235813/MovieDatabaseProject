import React from 'react';

const ElokuvakorttiMuokkaus = ({ leffa, muokkausfunktio }) => {
  return (
    <>
      <form>
        <h5 className="card-title">
          Nimi:{' '}
          <input
            value={leffa.title}
            onChange={(event) => muokkausfunktio('title', event.target.value)}
          ></input>
        </h5>
        {/* <p className="card-text">
          Ohjaaja: <input value={leffa.director}></input>
        </p>
        <p className="card-text">
          Julkaisuvuosi: <input type="number" value={leffa.year}></input>
        </p>
        <p className="card-text">
          Kuvaus: <input value={leffa.description}></input>
        </p>
        <p className="card-text">
          Arviot: <input type="number" value={leffa.rating}></input>
        </p>
        <p className="card-text">
          Genre: <input value={leffa.genre}></input>
        </p> */}
      </form>
    </>
  );
};

export default ElokuvakorttiMuokkaus;
