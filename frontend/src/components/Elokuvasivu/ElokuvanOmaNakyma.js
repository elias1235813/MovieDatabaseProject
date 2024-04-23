import React from 'react';
import { useLoaderData } from 'react-router-dom';


// React Routerin loader, joka hakee elokuvan tiedot näkymään
export async function leffaLoader({ params }) {
  try {
      const response = await fetch(`http://localhost:3000/api/movies/${params.leffanId}`);
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
        <div className="personal-info container mt-5">
            <div className="card h-100 border-0">
                <div className="row no-gutters">
                     <div className="col md-4">
                     <img src={leffa.image} className="img-fluid" alt={leffa.title}/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body" class="leffan-tiedot">
                            <h1 className="card-title">{leffa.title}</h1>
                            <p className="card-text">{leffa.year}</p>
                            <p className="card-text">
                                {leffa.description}
                            </p>
                            <p className="card-text">
                                <strong>OHJAAJA:</strong> {leffa.director.join(', ')}
                            </p>
                            <p className="card-text">
                                <strong>ARVIO:</strong> {leffa.rating}
                            </p>
                            <p className="card-text">
                                <strong>KESTO:</strong> {leffa.runtime}
                            </p>
                            <p className="card-text">
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