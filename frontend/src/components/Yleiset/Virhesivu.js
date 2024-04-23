import { useRouteError } from "react-router-dom";

export default function Virhesivu() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Hups!</h1>
      <p>Täällä ei ole mitään!</p>
      <a href="./">Palaa etusivulle!</a>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}