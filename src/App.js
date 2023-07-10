import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import des pages
import Login from './pages/login';
import GameStats from './pages/gamestats';
import Tourement from './pages/tournement';
import Account from './pages/account';

// Import des components
import Navbar from './components/navbar';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/gamestats" element={<GameStats />} />
        <Route path="/tourement" element={<Tourement />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}
