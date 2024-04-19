import React, { useState } from 'react';
import ElokuvakortinTiedot from './ElokuvakortinTiedot';
import MuokkausElokuvakortti from './MuokkausElokuvakortti';

const AdmininElokuvaKortti = ({
  leffa,
  onDelete, // Receive onDelete as a prop
  onUpdate, // Funktio, jota kutsutaan, kun Tallenna-nappia klikataan
}) => {
  // LEFFAN TIETOJEN PÄIVITTÄMINEN

  // Kopioidaan muokkausta varten kortilla olevan leffan tiedot
  const [muokattavaLeffa, setMuokattuLeffa] = useState({
    ...leffa,
  });

  // FUNKTIO, JOKA PÄIVITTÄÄ STATESSA OLEVAN (KOPIOIDUN) LEFFAN TIETOJA:
  const muokkausFunktio = (event) => {
    //Aluksi kopioidaan muokattavan leffan tiedot:
    const paivitettyLeffa = {
      ...muokattavaLeffa,
    };
    // Korvataan muokattu kohda uudella tiedolla:
    paivitettyLeffa[event.target.name] = event.target.value;
    setMuokattuLeffa(paivitettyLeffa);
  };

  // OLETUSASETUS: MUOKKAUSTILA EI PÄÄLLÄ:
  const [muokkausPaalla, setMuokkausPaalla] = useState(false);

  // KOKO KORTIN HTML:
  return (
    <div className="card mb-3 admin-elokuvakortti">
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
            {/* Näkymän valinta: normaali tai muokkaustila */}
            {muokkausPaalla ? (
              // Jos muokkaus on päällä, näytetään muokkausnäkymä:
              <MuokkausElokuvakortti
                leffa={muokattavaLeffa}
                muokkausfunktio={muokkausFunktio}
              />
            ) : (
              // Jos muokkaus ei päällä, näytetään normaali näkymä:
              <ElokuvakortinTiedot leffa={leffa} />
            )}

            {/* MUOKKAUS/PERUUTUSNAPPI */}
            <button
              onClick={() => {
                setMuokkausPaalla(!muokkausPaalla);
                if (muokkausPaalla) {
                  setMuokattuLeffa(leffa); // Jos muokkaustilasta peruutetaan, nollataan lähtötilanteeseen (alkuperäiset leffan tiedot)
                }
              }}
              className="btn btn-outline-success"
            >
              {/* Buttonin teksti sen muokkaustilassa tai normitilassa: */}
              {muokkausPaalla ? 'Peruuta' : 'Muokkaa'}
            </button>

            {/* POISTONAPPI */}
            <button onClick={onDelete} className="btn btn-outline-success">
              Poista
            </button>

            {/* TALLENNUSNAPPI */}
            {muokkausPaalla && (
              <button
                onClick={() => {
                  // Muokattavaa leffaa on jo muokattu, joten sen tietoja käytetään päivityksessä:
                  onUpdate(muokattavaLeffa);
                  setMuokkausPaalla(false);
                }}
                className="btn btn-outline-success"
              >
                Tallenna
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmininElokuvaKortti;
