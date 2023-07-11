import React, { useState } from "react";
import SearchBar from "../components/searchbar";
import GameCards from "../components/gamecards";
import { Outlet } from "react-router-dom";

export default function GameStats() {
  const [filteredTerm, setFilteredTerm] = useState("");

  const handleSearch = (term) => {
    setFilteredTerm(term);
  };
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div style={{ padding: "2%" }}>
        <GameCards filteredTerm={filteredTerm} />
      </div>
      <Outlet />
    </div>
  );
}
