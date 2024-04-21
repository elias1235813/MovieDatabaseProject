const { body } = require('express-validator'); // body  on tässä yhteydessä bodyvalidaattori express-validator -kirjastosta, ei sama kuin req.body!

// CUSTOM-funktiot:

// SANITAATTORIT
// PILKULLA EROTUS ARRAYKSI (genret)
const commaSeparatedToArrayAndCapitalize = (value) => {
  return value
    .split(',') // splitataan pilkusta
    .map((item) => item.trim()) // välilyönnit pois alusta ja lopusta
    .filter((item) => item !== '') // suodatetaan vain sellaiset, jotka on ei tyhjiä merkkijonoja
    .map((item) => capitalizeString(item));
};

// STRINGIN ENSIMMÄINEN SANA ALKAMAAN ISOLLA
const capitalizeString = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

// STRINGIN KAIKKI SANAT ALKAMAAN ISOLLA ALKUKIRJAIMELLA
const capitalizeWords = (value) => {
  // Hajotetaan string sanoiksi välilyönnin perusteella
  const words = value.split(' ');
  // Laitetaan joka sana alkamaan isolla alkukirjaimella
  const capitalizedWords = words.map((word) => {
    return capitalizeString(word);
  });
  // Yhdistetään takaisin stringiksi
  const result = capitalizedWords.join(' ');

  return result;
};

// VALIDAATTORIT
// VUOSILUKU EI TULEVAISUUDESSA (julkaisuvuosi)
const notInFuture = (value) => {
  if (value > new Date().getFullYear()) {
    throw new Error('Elokuvan vuosi voi olla korkeintaan kuluva vuosi.');
  }
};

// TUNTIEN JA MINUUTTIEN TARKISTUS ONKO MUOTOA 1h 30m

const validateRuntime = (value) => {
  // Muotoillaan regexillä formaatti, jossa tunnit ja minuutit halutaan saada:

  // REGEXin merkinnät (muistin virkistykseksi)
  // Regex tulee näiden väliin //
  // ^ = merkkijonon pitää alkaa tästä
  // (\d+) = yksi tai useampi numero
  // \s = välilyönti
  // $ = merkkijono päättyy tähän
  // i = ei ole väliä kirjoitetaanko isoja vai pieniä kirjaimia

  const regex = /^(\d+)h\s(\d+)m$/i;
  if (!value.match(regex)) {
    throw new Error(
      'Invalid format. Please use the format "Xh Ym" (e.g., "1h 30m").'
    );
  }
};

// ERI KENTTIEN VALIDOINNIT JA SANITOINNIT

// TITLE
const titlechecker = body('title')
  .trim()
  .escape()
  .isString()
  .customSanitizer(capitalizeString)
  .isLength({ min: 1, max: 100 });

// JULKAISUVUOSI
const yearChecker = body('year')
  .trim()
  .escape()
  .isInt({ min: 1800 })
  .custom(notInFuture);

// OHJAAJA
const directorChecker = body('director')
  .trim()
  .escape()
  .isString()
  .customSanitizer(capitalizeWords)
  .isLength({ min: 1, max: 100 });

// KESTO
const runtimeChecker = body('runtime')
  .trim()
  .escape()
  .isString()
  .custom(validateRuntime)
  .isLength({ min: 5, max: 8 });

// ARVIOT

const ratingChecker = body('rating')
  .trim()
  .escape()
  .isFloat({ min: 0, max: 10 });

// KUVAUS
const descriptionChecker = body('description')
  .trim()
  .escape()
  .isString()
  .isLength({ min: 1, max: 3000 });

// GENRE
const genreChecker = body('genre')
  .trim()
  .escape()
  .customSanitizer(commaSeparatedToArrayAndCapitalize);

// KUVA URL
const imageURLChecker = body('image').trim().escape().isURL();
