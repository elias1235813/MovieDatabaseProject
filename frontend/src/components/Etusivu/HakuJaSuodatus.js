import React, { useState } from 'react';

const HakuJaSuodatus = ({ onSearch }) => {
  const [genre, setGenre] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(genre); // Call the onSearch function with the genre as the argument
  };

  return (
    <section className="search-and-filter-area">
      <p> <strong>Etsi elokuvia kategorian mukaan</strong></p>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Kirjoita kategoria..."
          name="etsi"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <button type="submit" className="btn btn-outline-success">
          Etsi
        </button>
      </form>
    </section>
  );
};

export default HakuJaSuodatus;