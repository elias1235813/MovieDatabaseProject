import './App.css';
import Navigaatio from './Yleiset/Navigaatio';
import EtusivunInfo from './Etusivu/EtusivunInfo';
import HakuJaSuodatus from './Etusivu/HakuJaSuodatus';
import ElokuvaLista from './Etusivu/ElokuvaLista';
import Footer from './Yleiset/Footer';

function App() {
  return (
    <>
      <Navigaatio />
      <section>
        <EtusivunInfo />
        <HakuJaSuodatus />
        <ElokuvaLista />
      </section>
      <Footer />
    </>
  );
}

export default App;
