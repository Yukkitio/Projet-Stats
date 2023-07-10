import React, { useState } from "react";
import SearchBar from '../components/searchbar';
import GameCards from '../components/gamecards';

export default function GameStats() {
  const [filteredTerm, setFilteredTerm] = useState("");

  const handleSearch = (term) => {
    setFilteredTerm(term);
  };
  return (
      <>
      <SearchBar onSearch={handleSearch}/>
      <div style={{padding: '2%'}}>
        <GameCards filteredTerm={filteredTerm}/>
      </div>
      </>
  );
}