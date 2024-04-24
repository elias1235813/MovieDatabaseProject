import React from 'react';

const MuokkausElokuvakortti = ({ leffa, muokkausfunktio }) => {
  console.log('tmdbMovieId:', leffa.tmdbMovieId);

  // Log when the component renders
  console.log('MuokkausElokuvakortti rendered');
  return (
    <form>
      <p className="card-text">
        <label>
          Nimi: <br />
          {/* Name laitetaan inputiin mukaan, jotta
          muokkaus pystytään kohdistamaan oikeaan kenttään */}
          <input
            name="title"
            className="form-control"
            value={leffa.title}
            onChange={muokkausfunktio}
          ></input>
        </label>
      </p>
      <p className="card-text">
        <label>
          Ohjaaja: <br />
          <input
            name="director"
            className="form-control"
            value={leffa.director}
            onChange={muokkausfunktio}
          ></input>
        </label>
      </p>
      <p className="card-text">
        <label>
          Julkaisuvuosi: <br />
          <input
            name="year"
            className="form-control"
            type="number"
            value={leffa.year}
            onChange={muokkausfunktio}
          ></input>
        </label>
      </p>
      <p className="card-text">
        <label>
          Kesto (muodossa 00h 00m): <br />
          <input
            name="runtime"
            className="form-control"
            value={leffa.runtime}
            onChange={muokkausfunktio}
          ></input>
        </label>
      </p>
      <p className="card-text">
        <label>
          Kuvaus: <br />
          <input
            name="description"
            className="form-control"
            value={leffa.description}
            onChange={muokkausfunktio}
          ></input>
        </label>
      </p>
      <p className="card-text">
        <label>
          TMDB ID tähän (tarvitaan arvioiden päivittämiseen).: <br />
          <input
            name="tmdbMovieId"
            className="form-control"
            type="number"
            value={leffa.tmdbMovieId}
            onChange={muokkausfunktio}
          ></input>
        </label>
      </p>
      <p className="card-text">
        <label>
          Genret (pilkulla erotettuna):
          <br />
          <input
            name="genre"
            className="form-control"
            value={leffa.genre}
            onChange={muokkausfunktio}
          ></input>
        </label>
      </p>
      <p className="card-text">
        <label>
          Kuvan osoite:
          <br />
          <input
            name="image"
            className="form-control"
            value={leffa.image}
            onChange={muokkausfunktio}
          ></input>
        </label>
      </p>
    </form>
  );
};

export default MuokkausElokuvakortti;
