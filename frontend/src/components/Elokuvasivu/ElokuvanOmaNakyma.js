import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';

// React Routerin loader, joka hakee elokuvan tiedot näkymään
export async function leffaLoader({ params }) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/movies/${params.leffanId}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json(); // Assume JSON response
  } catch (error) {
    console.error('Tietojen hakeminen epäonnistui:', error);
    return null;
  }
}

const ElokuvanOmaNakyma = () => {
  // Tätä pitää täydentää järkevämmällä html:llä
  const leffa = useLoaderData();
  return (
    <div className="moviearea">
      <section className="return-button-area">
        <Link
          className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
          to="/"
          aria-label="Palaa takaisin etusivulle"
          aria-describedby="elokuvatietokannan etusivu"
        >
          Takaisin etusivulle
        </Link>
      </section>
      <div className="movie container mt-5">
        <div className="row no-gutters">
          <div className="col md-4">
            <img src={leffa.image} className="img-fluid" alt={leffa.title} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h1>{leffa.title}</h1>
              <p>{leffa.year}</p>
              <p>{leffa.description}</p>
              <p>
                <strong>OHJAAJA:</strong> {leffa.director.join(', ')}
              </p>
              <p>
                <strong>ARVIO:</strong> {leffa.rating} / 10
              </p>
              <p>
                <strong>KESTO:</strong> {leffa.runtime}
              </p>
              <p>
                <strong>GENRE:</strong> {leffa.genre.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElokuvanOmaNakyma;
