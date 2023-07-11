import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import des pages
import Login from './pages/login';
import GameStats from './pages/gamestats';
import Tournement from './pages/tournement';
import Account from './pages/account';

// Import des components
import Navbar from './components/navbar';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogin = () => { setIsAuthenticated(true); };// Logique de connexion réussie
  const handleLogout = () => { setIsAuthenticated(false); };// Logique de déconnexion

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} /> // Redirection vers /login par défaut
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/app/*"
          element={isAuthenticated ? <ProtectedRoutes onLogout={handleLogout} /> : <Navigate to="/login" replace />} // Vérification de l'authentification avant d'accéder aux ProtectedRoutes
        />
      </Routes>
    </Router>
  );
}

function ProtectedRoutes({ onLogout }) {
  return (
    <React.Fragment>
      <Navbar onLogout={onLogout} />
      <Routes>
        <Route path="/" element={<Navigate to="/app/gamestats" replace />} /> // Redirection vers /app/gamestats par défaut
        <Route path="/gamestats" element={<GameStats />} />
        <Route path="/tournement" element={<Tournement />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </React.Fragment>
  );
}
