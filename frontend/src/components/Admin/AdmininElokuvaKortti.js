import React, { useState } from 'react';
import ElokuvakortinTiedot from './ElokuvakortinTiedot';
import ElokuvakorttiMuokkaus from './ElokuvakorttiMuokkaus';

const AdmininElokuvaKortti = ({
  leffa,
  onDelete, // Receive onDelete as a prop
}) => {
  // LEFFAN TIETOJEN PÄIVITTÄMINEN

  //Kopiodaan muokkausta varten kortilla olevan leffan tiedot
  const [muokattavaLeffa, setMuokattuLeffa] = useState({
    ...leffa,
  });

  // Funktio, joka päivittää statessa olevan elokuvan tietoja
  // (tehty https://www.w3schools.com/react/react_forms.asp pohjalta)
  const muokkausFunktio = (event) => {
    //Aluksi kopioidaan muokattavan leffan tiedot:
    const paivitettyLeffa = {
      ...muokattavaLeffa,
    };
    // Korvataan muokattu kohda uudella tiedolla:
    paivitettyLeffa[event.target.name] = event.target.value;
    setMuokattuLeffa(paivitettyLeffa);
  };

  // Oletuksena elokuvan tietojen muokkaustila ei päällä:
  const [muokkausOnOff, setMuokkausOnOff] = useState(false);

  // Muokkausnappi ja kortin näkymä (vaihtelee muokkaustilan mukaan)
  let muokkausNapinTeksti = '';
  let kortinNakyma;

  /* Jos muokkaustila ei ole päällä, napista saa muokkaustilan päälle.
    Jos muokkaustila on päällä, samasta napista voi peruuttaa muokkaustilan ja palata ns. normaaliin näkymään. */
  if (!muokkausOnOff) {
    muokkausNapinTeksti = 'Muokkaa';
    kortinNakyma = <ElokuvakortinTiedot leffa={leffa} />;
  } else {
    muokkausNapinTeksti = 'Peruuta';
    kortinNakyma = (
      <ElokuvakorttiMuokkaus
        leffa={muokattavaLeffa}
        muokkausfunktio={muokkausFunktio}
      />
    );
  }

  // Koko kortin html:
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={leffa.image}
            className="img-fluid rounded-start"
            alt={leffa.title}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            {/* Muokkausnäkymä tai ns. normaali näkymä: */}
            {kortinNakyma}

            {/* Muokkaustila päälle/pois -nappi */}
            <button
              onClick={() => setMuokkausOnOff(!muokkausOnOff)}
              className="btn btn-outline-success"
            >
              {muokkausNapinTeksti}
            </button>

            {/* Poistonappi */}
            <button onClick={onDelete} className="btn btn-outline-success">
              Poista
            </button>

            {/* Tallennusnappi */}
            {muokkausOnOff && (
              <button className="btn btn-outline-success">Tallenna</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmininElokuvaKortti;
