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
    // <div style={{backgroundColor: '#282828'}}>
      <><SearchBar onSearch={handleSearch}/>
      <div style={{padding: '2%'}}>
        <GameCards filteredTerm={filteredTerm}/>
      </div>
      <BackgroundLogin /></>
    // </div>
   
  );
}