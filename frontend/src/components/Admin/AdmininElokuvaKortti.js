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
// Pilkotaan ohjaaja- ja genre-merkkijonot pilkusta taulukoksi, jotta ne menevät oikeassa muodossa tietokantaan
// Muut leffan tiedot pidetään ennallaan
// Turhat välilyönnit trimmataan pois
function palautaMuokattuLeffaOikeaanMuotoon(muokattuLeffa) {
  return {
    ...muokattuLeffa,
    director: muokattuLeffa.director.split(',').map((item) => item.trim()),
    genre: muokattuLeffa.genre.split(',').map((item) => item.trim()),
  };
}

// VARSINAINEN REACT-KOMPONENTTI ALKAA TÄSTÄ:

const AdmininElokuvaKortti = ({
  leffa,
  onDelete, // Receive onDelete as a prop
  onUpdate, // Funktio, jota kutsutaan, kun Tallenna-nappia klikataan
}) => {
  // Oletusasetus: muokkaustila ei päällä
  const [muokkausPaalla, setMuokkausPaalla] = useState(false);

  // Kopioidaan ja muunnetaan propsina saatu elokuva sopivaan muotoon ja asetetaan se stateen (lomakkeen tila)
  const [muokattavaLeffa, setMuokattuLeffa] = useState(
    teeLeffaYhteensopivaksiNakymanKanssa(leffa)
  );

  // Jos propsina olevan leffan arvo päivittyy, asetetaan statessa oleva muokattavaLeffa vastaamaan uutta arvoa.
  useEffect(() => {
    setMuokattuLeffa(teeLeffaYhteensopivaksiNakymanKanssa(leffa));
  }, [leffa]);

  // Funktio, joka päivittää statessa olevan leffan tietoja (kutsutaan elokuvan muokkauslomakkeessa)
  const muokkausFunktio = (event) => {
    //Aluksi kopioidaan muokattavan leffan tiedot:
    const paivitettyLeffa = {
      ...muokattavaLeffa,
    };

    // Korvataan muokattu kohda uudella tiedolla:
    paivitettyLeffa[event.target.name] = event.target.value;
    setMuokattuLeffa(paivitettyLeffa);
  };

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
              <ElokuvakortinTiedot leffa={muokattavaLeffa} /> //tähän laitetaan muokattavaLeffa, koska sen sisältämät taulukot on muunnettu merkkijonoiksi
            )}

            {/* MUOKKAUS/PERUUTUSNAPPI */}
            <button
              onClick={() => {
                setMuokkausPaalla(!muokkausPaalla);
                if (muokkausPaalla) {
                  setMuokattuLeffa(teeLeffaYhteensopivaksiNakymanKanssa(leffa)); // Jos muokkaustilasta peruutetaan, nollataan lähtötilanteeseen (alkuperäiset leffan tiedot)
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
                  onUpdate(palautaMuokattuLeffaOikeaanMuotoon(muokattavaLeffa));
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
