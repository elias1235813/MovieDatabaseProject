import React, { useState } from 'react';
import ElokuvakortinTiedot from './ElokuvakortinTiedot';
import ElokuvakorttiMuokkaus from './ElokuvakorttiMuokkaus';

const AdmininElokuvaKortti = ({
  leffa,
  onDelete, // Receive onDelete as a prop
}) => {
  // LEFFAN TIETOJEN PÄIVITTÄMINEN
  // Kopioidaan muokkausta varten kortilla olevan leffan tiedot
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
  const [muokkausPaalla, setMuokkausPaalla] = useState(false);

  // KOKO KORTIN HTML:
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
            {/* Näkymän valinta: normaali vai muokkaustila? */}
            {muokkausPaalla ? (
              // Jos muokkaus on päällä, näytetään muokkausnäkymä:
              <ElokuvakorttiMuokkaus
                leffa={muokattavaLeffa}
                muokkausfunktio={muokkausFunktio}
              />
            ) : (
              // Jos muokkaus ei päällä, näytetään normaalinäkymä:
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
              <button className="btn btn-outline-success">Tallenna</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmininElokuvaKortti;
