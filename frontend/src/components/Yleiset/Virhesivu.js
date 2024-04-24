import { useRouteError } from "react-router-dom";

export default function Virhesivu() {
  const error = useRouteError();
  console.error(error);

  return (
    <body class="d-flex justify-content-center 
                 align-items-center">
    <div class="col-md-12 text-center">
    <div id="error-page">
      <h1>Hups!</h1>
      <img src="https://c.tenor.com/kVrGzZGZnUUAAAAC/tenor.gif" height= "300px" alt="John Travolta hämmästyneenä" />
      <p>Täällä ei ole mitään!</p>
      <a href="./">Palaa etusivulle!<br></br></a>
      <p>
        Virheviesti: <i>{error.statusText || error.message}</i>
      </p>
    </div>
    </div>
    </body>
  );
}