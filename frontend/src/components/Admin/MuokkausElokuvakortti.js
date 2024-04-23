import React from 'react';

const MuokkausElokuvakortti = ({ leffa, muokkausfunktio }) => {
  return (
    <form>
      <p className="card-text">
        <label>
          Nimi:
          {/* Name laitetaan inputiin mukaan, jotta
          muokkaus pystytään kohdistamaan oikeaan kenttään */}
          <input
            name="title"
            value={leffa.title}
            onChange={muokkausfunktio}
          ></input>
        </label>
      </p>
      <p className="card-text">
        <label>
          Ohjaaja:
          <input
            name="director"
            value={leffa.director}
            onChange={muokkausfunktio}
          ></input>
        </label>
      </p>
      <p className="card-text">
        <label>
          Julkaisuvuosi:
          <input
            name="year"
            type="number"
            value={leffa.year}
            onChange={muokkausfunktio}
          ></input>
        </label>
      </p>
      <p className="card-text">
        <label>
          Kesto (muodossa 00h 00m):
          <input
            name="runtime"
            value={leffa.runtime}
            onChange={muokkausfunktio}
          ></input>
        </label>
      </p>
      <p className="card-text">
        <label>
          Kuvaus:
          <input
            name="description"
            value={leffa.description}
            onChange={muokkausfunktio}
          ></input>
        </label>
      </p>
      <p className="card-text">
        <label>
          Arviot (tulevat suoraan TMBD:stä):
          <input
            disabled
            name="rating"
            type="number"
            step=".1"
            min="0"
            max="10"
            value={leffa.rating}
            onChange={muokkausfunktio}
          ></input>
        </label>
      </p>
      <p className="card-text">
        <label>
          Genret (pilkulla erotettuna):
          <input
            name="genre"
            value={leffa.genre}
            onChange={muokkausfunktio}
          ></input>
        </label>
      </p>
      <p className="card-text">
        <label>
          Kuvan osoite:
          <input
            name="image"
            value={leffa.image}
            onChange={muokkausfunktio}
          ></input>
        </label>
      </p>
    </form>
  );
};

export default MuokkausElokuvakortti;
