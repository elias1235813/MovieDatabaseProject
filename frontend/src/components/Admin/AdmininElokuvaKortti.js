import React, { useState } from 'react';
import ElokuvakortinTiedot from './ElokuvakortinTiedot';
import ElokuvakorttiMuokkaus from './ElokuvakorttiMuokkaus';

const AdmininElokuvaKortti = ({
  image,
  director,
  title,
  year,
  description,
  rating,
  genre,
}) => {
  // Muokkausnapin logiikka
  const [muokkausPaalla, setMuokkausPaalla] = useState(false);
  const [leffa, setLeffa] = useState({
    title,
    director,
    year,
    description,
    rating,
    genre,
  });
  let muokkausNapinTeksti = '';
  let kortinNakyma;
  const muokkausfunktio = (leffanMuokattavaKohta, uusiTieto) => {
    console.log(leffanMuokattavaKohta, uusiTieto);
    setLeffa({
      ...leffa,

      [leffanMuokattavaKohta]: uusiTieto,
    });
  };
  if (!muokkausPaalla) {
    muokkausNapinTeksti = 'Muokkaa';
    kortinNakyma = <ElokuvakortinTiedot leffa={leffa} />;
  } else {
    muokkausNapinTeksti = 'Peruuta';
    kortinNakyma = (
      <ElokuvakorttiMuokkaus leffa={leffa} muokkausfunktio={muokkausfunktio} />
    );
  }
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={image} className="img-fluid rounded-start" alt={title} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            {kortinNakyma}{' '}
            {/**Sisältö vaihtuu sen mukaan, onko muokkaus päällä vai ei */}
            <button
              onClick={() => setMuokkausPaalla(!muokkausPaalla)}
              className="btn btn-outline-success"
            >
              {muokkausNapinTeksti}
            </button>
            <button className="btn btn-outline-success">Poista</button>
            {muokkausPaalla && (
              <button className="btn btn-outline-success">Tallenna</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmininElokuvaKortti;
