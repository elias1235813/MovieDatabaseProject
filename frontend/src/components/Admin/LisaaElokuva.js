import React, { useState } from 'react';

const LisaaElokuva = () => {
  // State variables to hold form data
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    director: '',
    runtime: '',
    rating: '',
    description: '',
    genre: '',
    image: '',
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Movie added successfully
        console.log('Movie added successfully');
        alert('Elokuva lisätty onnistuneesti.');
        // Clear the form
        setFormData({
          title: '',
          year: '',
          director: '',
          runtime: '',
          rating: '',
          description: '',
          genre: '',
          image: '',
        });
      } else {
        console.error('Failed to add movie');
        alert('Elokuvan lisääminen epäonnistui.');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Elokuvan lisääminen epäonnistui.');
    }
  };

  return (
    <section className="adminosio">
      <h2>Lisää elokuva</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className="form-label">
          Nimi
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <label htmlFor="year" className="form-label">
          Julkaisuvuosi
        </label>
        <input
          type="number"
          className="form-control"
          id="year"
          value={formData.year}
          onChange={handleInputChange}
        />

        <label htmlFor="director" className="form-label">
          Ohjaaja
        </label>
        <input
          type="text"
          className="form-control"
          id="director"
          value={formData.director}
          onChange={handleInputChange}
        />

        <label htmlFor="runtime" className="form-label">
          Kesto
        </label>
        <input
          type="text"
          className="form-control"
          id="runtime"
          value={formData.runtime}
          onChange={handleInputChange}
        />

        <label htmlFor="rating" className="form-label">
          Arviot
        </label>
        <input
          type="number"
          className="form-control"
          id="rating"
          value={formData.rating}
          onChange={handleInputChange}
        />

        <label htmlFor="description" className="form-label">
          Kuvaus
        </label>
        <textarea
          className="form-control"
          id="description"
          value={formData.description}
          onChange={handleInputChange}
        />

        <label htmlFor="genre" className="form-label">
          Genre
        </label>
        <input
          type="text"
          className="form-control"
          id="genre"
          value={formData.genre}
          onChange={handleInputChange}
        />

        <label htmlFor="image" className="form-label">
          Kuvan URL
        </label>
        <input
          type="text"
          className="form-control"
          id="image"
          value={formData.image}
          onChange={handleInputChange}
        />

        <button type="submit" className="btn btn-outline-success">
          Tallenna
        </button>
      </form>
    </section>
  );
};

export default LisaaElokuva;
