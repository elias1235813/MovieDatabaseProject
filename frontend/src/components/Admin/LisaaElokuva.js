import React from 'react';

const LisaaElokuva = () => {
  return (
    <section>
      <h2>Lisää elokuva</h2>

      {/* Form ei vielä saavutettava, vasta alustava versio */}
      <form>
        <label for="nimi" className="form-label">
          Nimi
        </label>
        <input type="text" className="form-control" id="nimi" />

        <label for="vuosi" className="form-label">
          Julkaisuvuosi
        </label>
        <input type="number" className="form-control" id="vuosi" />

        <label for="kesto" className="form-label">
          Kesto
        </label>
        <input type="text" className="form-control" id="kesto" />

        <label for="ohjaaja" className="form-label">
          Ohjaaja
        </label>
        <input type="text" className="form-control" id="ohjaaja" />

        <label for="arviot" className="form-label">
          Arviot
        </label>
        <input type="number" className="form-control" id="arviot" />

        <label for="genre" className="form-label">
          Genre
        </label>
        <input type="text" className="form-control" id="genre" />

        <label for="kuvaURL" className="form-label">
          Kuvan URL
        </label>
        <input type="text" className="form-control" id="kuvaURL" />

        <button type="submit" className="btn btn-primary">
          Tallenna
        </button>
      </form>
    </section>
  );
};

export default LisaaElokuva;
