import React, {useState} from 'react';
import EtusivunInfo from './EtusivunInfo';
import HakuJaSuodatus from './HakuJaSuodatus';
import ElokuvaLista from './ElokuvaLista';
import Otsikko from './MuuttuvaOtsikko'

const EtusivuNakyma = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery("")
  }
  return (
    <>
      <EtusivunInfo />
      <HakuJaSuodatus onSearch={handleSearch} />
      <Otsikko searchQuery={searchQuery} onClearSearch={handleClearSearch}/>
      <ElokuvaLista searchQuery={searchQuery} />
    </>
  );
};

export default EtusivuNakyma;
