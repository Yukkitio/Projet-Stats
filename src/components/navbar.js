import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Box } from '@mui/material';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Outlet, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogoClick = () => { navigate('/app/gamestats'); };
  const handleTab1Click = () => { navigate('/app/gamestats'); };
  const handleTab2Click = () => { navigate('/app/tournement'); };
  const handleAccountClick = () => { navigate('/app/account'); };

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          {/* Logo du site */}
          <IconButton color="inherit" aria-label="triangle" onClick={handleLogoClick}>
            <ChangeHistoryIcon />
          </IconButton>

          {/* Nom du site */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={handleLogoClick}>
            Mon Site
          </Typography>

          {/* Espace flexible pour centrer les onglets */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            {/* Onglets */}
            <Button color="inherit" onClick={handleTab1Click}>Game Stats</Button>
            <Button color="inherit" onClick={handleTab2Click}>Tournement</Button>
          </Box>

          {/* Icône de profil */}
          <IconButton color="inherit" aria-label="profile" onClick={handleAccountClick}>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Outlet />
    </React.Fragment> 
  );
}
