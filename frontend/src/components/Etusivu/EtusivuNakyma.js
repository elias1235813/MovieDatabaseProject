import React, {useState} from 'react';
import EtusivunInfo from './EtusivunInfo';
import HakuJaSuodatus from './HakuJaSuodatus';
import ElokuvaLista from './ElokuvaLista';

const EtusivuNakyma = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <>
      <EtusivunInfo />
      <HakuJaSuodatus onSearch={handleSearch} />
      <ElokuvaLista searchQuery={searchQuery} />
    </>
  );
};

export default EtusivuNakyma;
