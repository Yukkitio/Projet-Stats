import React, { useState } from "react";

//Import des composants
import SearchBar from '../components/searchbar';
import GameCards from '../components/gamecards';

//Import du background
import BackgroundLogin from '../components/background';

export default function GameStats() {
  const [filteredTerm, setFilteredTerm] = useState("");

  const handleSearch = (term) => {
    setFilteredTerm(term);
  };
  return (
    <React.Fragment>
      <SearchBar onSearch={handleSearch}/>
      <GameCards filteredTerm={filteredTerm}/>
      <BackgroundLogin />
    </React.Fragment>   
  );
}