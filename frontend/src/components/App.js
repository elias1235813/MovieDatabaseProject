import './App.css';
import Navigaatio from './Yleiset/Navigaatio';
import Footer from './Yleiset/Footer';
import { Outlet } from 'react-router-dom';
import AdminNakyma from './Admin/AdminNakyma';

function App() {
  return (
    <>
      <Navigaatio />
      <section>
        {/* Ideana on, että Navigaatio ja Footer aina samat, section-osioon React Router luo vaihtuvan sisällön polun perusteella */}
        <Outlet />
      </section>
      <Footer />
    </>
  );
}

export default App;
