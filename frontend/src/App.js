import './App.css';
import Navigation from './components/Navigation';
import FrontpageInfo from './components/FrontpageInfo';
import SearchAndFilter from './components/SearchAndFilter';
import MovieList from './components/MovieList';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navigation />
      <section>
        <FrontpageInfo />
        <SearchAndFilter />
        <MovieList />
      </section>
      <Footer />
    </>
  );
}

export default App;
