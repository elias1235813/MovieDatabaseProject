import React from 'react';

const MoviePreviewCard = ({ id, kuvaURL, nimi, julkaisuvuosi, kuvaus }) => {
  // id:llä muodostetaan linkki elokuvan sivulle
  return (
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img src={kuvaURL} class="img-fluid rounded-start" alt={nimi} />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 className="card-title">Nimi:{nimi}</h5>
            <p className="card-text">Julkaisuvuosi:{julkaisuvuosi}</p>
            <p className="card-text">Kuvaus: {kuvaus}</p>
            <a href="#" className="btn btn-primary">
              {/* TODO: korvataan React-routerin link-komponentilla */}
              Katso lisää
            </a>
          </div>
        </div>
      </div>
    </div>
    // <section>
    //   <div className="card">
    //     <img width="100" src={kuvaURL} className="card-img-left" alt={nimi} />
    //     <div className="card-body">
    //       <h5 className="card-title">Nimi:{nimi}</h5>
    //       <p className="card-text">Julkaisuvuosi:{julkaisuvuosi}</p>
    //       <p className="card-text">Kuvaus: {kuvaus}</p>
    //       <a href="#" className="btn btn-primary">
    //         {/* TODO: korvataan React-routerin link-komponentilla */}
    //         Katso lisää
    //       </a>
    //     </div>
    //   </div>
    // </section>
  );
};

export default MoviePreviewCard;
