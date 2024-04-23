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
const capitalizeWordsInArray = (value) => {
  return value.map((item) => {
    // Hajotetaan string sanoiksi välilyönnin perusteella
    const words = item.split(' ');
    // Laitetaan joka sana alkamaan isolla alkukirjaimella
    const capitalizedWords = words.map((word) => {
      return capitalizeString(word);
    });
    // Yhdistetään takaisin stringiksi
    const result = capitalizedWords.join(' ');
    return result;
  });
};

// VALIDAATTORIT
// VUOSILUKU EI TULEVAISUUDESSA (julkaisuvuosi)
const notInFuture = (value) => {
  return parseInt(value) <= new Date().getFullYear();
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

  const regex = /^(\d+)h\s{1}(\d+)m$/i;
  return value.match(regex) != null;
};

// ERI KENTTIEN VALIDOINNIT JA SANITOINNIT

// TITLE
const titlechecker = () => {
  return body('title')
    .trim()
    .escape()
    .isString()
    .customSanitizer(capitalizeString)
    .isLength({ min: 1, max: 100 });
};
// JULKAISUVUOSI
const yearChecker = () => {
  return body('year').trim().escape().isInt({ min: 1800 }).custom(notInFuture);
};

// OHJAAJA
const directorChecker = () => {
  return body('director')
    .trim()
    .escape()
    .isArray()
    .customSanitizer(capitalizeWordsInArray)
    .isLength({ min: 1, max: 100 });
};

// KESTO
const runtimeChecker = () => {
  return (
    body('runtime')
      .trim()
      .escape()
      .isString()
      //.custom(validateRuntime)
      .matches(/^(\d+)h\s{1}(\d+)m$/i)
      .isLength({ min: 5, max: 8 })
      .toLowerCase()
  );
};

// ARVIOT

const ratingChecker = () => {
  return body('rating').trim().escape().isFloat({ min: 0, max: 10 });
};

// KUVAUS
const descriptionChecker = () => {
  return body('description')
    .trim()
    .escape()
    .isString()
    .isLength({ min: 1, max: 3000 });
};

// GENRE
const genreChecker = () => {
  return body('genre')
    .trim()
    .escape()
    .isArray()
    .customSanitizer(capitalizeWordsInArray);
};

// KUVA URL
const imageURLChecker = () => {
  // escape poistettu
  return body('image').trim().isURL();
};

// YHDISTETÄÄN VALIDAATTORIT POST JA PATCH -KUTSUJA VARTEN

const postChecker = [
  titlechecker().exists(),
  yearChecker().exists(),
  directorChecker().exists(),
  runtimeChecker().exists(),
  ratingChecker().exists(),
  descriptionChecker().exists(),
  genreChecker().exists(),
  imageURLChecker().exists(),
];
const patchChecker = [
  titlechecker().optional(),
  yearChecker().optional(),
  directorChecker().optional(),
  runtimeChecker().optional(),
  ratingChecker().optional(),
  descriptionChecker().optional(),
  genreChecker().optional(),
  imageURLChecker().optional(),
];
module.exports = {
  postChecker: postChecker,
  patchChecker: patchChecker,
};
