import React from 'react';

const ElokuvakortinTiedot = ({ leffa }) => {
  return (
    <>
      <h5 className="card-title">Nimi: {leffa.title}</h5>
      <p className="card-text">Ohjaaja: {leffa.director}</p>
      <p className="card-text">Julkaisuvuosi: {leffa.year}</p>
      <p className="card-text">Kesto: {leffa.runtime}</p>
      <p className="card-text">Kuvaus: {leffa.description}</p>
      <p className="card-text">Arviot: {leffa.rating}</p>
      <p className="card-text">Genre: {leffa.genre}</p>
    </>
  );
};

export default ElokuvakortinTiedot;
