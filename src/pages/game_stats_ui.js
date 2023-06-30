import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import List from "../components/GameList";

function GameStats() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase().replace(/ /g,"");
    setInputText(lowerCase);
  };
  return (
        <div className="main_game_stats_body">
          <div className="search">
          <TextField id="outlined-basic" onChange={inputHandler} variant="outlined" fullWidth label="Search"/>
          </div>
            <List input={inputText}/>
        </div>
  );
}
export default GameStats;