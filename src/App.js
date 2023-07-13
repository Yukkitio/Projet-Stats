import * as React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Import des pages
import Login from "./pages/login";
import GameStats from "./pages/gamestats";
import Tournement from "./pages/tournement";
import Account from "./pages/account";
import Navbar from "./components/navbar";
import GameInfos from './pages/gameinfos';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<Navbar />}>
          <Route path="gamestats" element={<GameStats />} />
          <Route path="gameinfos" element={<GameInfos />} />
          <Route path="tournement" element={<Tournement />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}