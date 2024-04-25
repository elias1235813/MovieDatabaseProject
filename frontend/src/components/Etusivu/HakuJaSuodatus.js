import React, { useState } from 'react';

const HakuJaSuodatus = ({ onSearch }) => {
  const [genre, setGenre] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(genre); // Call the onSearch function with the genre as the argument
  };

  return (
    <section className="search-and-filter-area" role="search">
      <h1>Haku</h1>
      <p> Etsi elokuvia kategorian mukaan</p>
      <form onSubmit={handleSearch}>
        <label htmlFor="genreInput">Kirjoita kategoria:</label>
        <input
          id="genreInput"
          size="50"
          type="text"
          placeholder="Kirjoita kategoria..."
          name="etsi"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          aria-label="Kirjoita kategoria"
        />
        <button type="submit" className="btn btn-primary">
          Etsi
        </button>
      </form>
    </section>
  );
};

export default HakuJaSuodatus;
