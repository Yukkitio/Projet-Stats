import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          {/* Logo du site */}
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          {/* Nom du site */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
            <Button color="inherit">Onglet 1</Button>
            <Button color="inherit">Onglet 2</Button>
          </Box>

          {/* Icône de profil */}
          <IconButton color="inherit" aria-label="profile">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Outlet />
    </React.Fragment> 
  );
}
