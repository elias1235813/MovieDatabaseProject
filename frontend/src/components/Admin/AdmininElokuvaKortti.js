import React, { useState, useEffect } from 'react';
import ElokuvakortinTiedot from './ElokuvakortinTiedot';
import MuokkausElokuvakortti from './MuokkausElokuvakortti';

// APUFUNKTIOT  ELOKUVAN TIETOJEN PÄIVITTÄMISEEN:

// ARRAY --> STRING:
// Yhdistetään tietokannasta tulevan elokuvan ohjaaja ja genre taulukoista merkkijonoiksi, jotta ne näkyvät nettisivulla oikein ja jotta niitä voi muokata.
// Muut leffan tiedot pidetään ennallaan.
function teeLeffaYhteensopivaksiNakymanKanssa(leffa) {
  return {
    ...leffa,
    director: leffa.director.join(', '),
    genre: leffa.genre.join(', '),
  };
}
// STRING --> ARRAY:
// Pilkotaan ohjaaja- ja genre-merkkijonot pilkusta taulukoksi, jotta ne menevät oikeassa muodossa (taulukkona) tietokantaan
// Muut leffan tiedot pidetään ennallaan
// Turhat välilyönnit trimmataan pois
function palautaPaivitettyLeffaOikeaanMuotoon(paivitettyLeffa) {
  return {
    ...paivitettyLeffa,
    director: paivitettyLeffa.director.split(',').map((item) => item.trim()),
    genre: paivitettyLeffa.genre.split(',').map((item) => item.trim()),
  };
}

// VARSINAINEN REACT-KOMPONENTTI ALKAA TÄSTÄ:

const AdmininElokuvaKortti = ({
  leffa: alkuperainenLeffa,
  onDelete, // Receive onDelete as a prop
  onUpdate, // Funktio, jota kutsutaan, kun Tallenna-nappia klikataan
}) => {
  // Oletusasetus: muokkaustila ei päällä
  const [muokkausPaalla, setMuokkausPaalla] = useState(false);

  // Kun ollaan muokkausnäkymässä:
  // Kopioidaan ja muunnetaan propsina saatu elokuva sopivaan muotoon ja asetetaan se stateen (lomakkeen tila)
  const [leffa, setLeffa] = useState(
    teeLeffaYhteensopivaksiNakymanKanssa(alkuperainenLeffa)
  );

  // Funktio, joka päivittää statessa olevan leffan tietoja (kutsutaan elokuvan muokkauslomakkeessa)
  const muokkausFunktio = (event) => {
    //Aluksi kopioidaan muokattavan leffan tiedot:
    const paivitettyLeffa = {
      ...leffa,
    };

    // Korvataan muokattu kohda uudella tiedolla:
    paivitettyLeffa[event.target.name] = event.target.value;
    setLeffa(paivitettyLeffa);
  };

  // Jos adminin elokuvalistan antamasta elokuvasta tulee päivitetty versio, asetetaan uusi elokuvakortin stateen
  useEffect(() => {
    setLeffa(teeLeffaYhteensopivaksiNakymanKanssa(alkuperainenLeffa));
  }, [alkuperainenLeffa]);

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
                leffa={leffa}
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
                // Jos muokkaustilasta peruutetaan ilman muutosten tallentamista (eli kun muokkaustila on päällä), nollataan lähtötilanteeseen (alkuperäiset leffan tiedot)
                if (muokkausPaalla) {
                  setLeffa(
                    teeLeffaYhteensopivaksiNakymanKanssa(alkuperainenLeffa)
                  );
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
                  onUpdate(palautaPaivitettyLeffaOikeaanMuotoon(leffa));
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
