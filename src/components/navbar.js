import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Box, SwipeableDrawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet, useNavigate } from 'react-router-dom';

// Style personnalisé pour la barre de navigation
const StyledAppBar = styled(AppBar)`
  background-color: transparent; // Fond de la navbar transparent
  backdrop-filter: blur(10px); // Effet de flou
  -webkit-backdrop-filter: blur(10px); // Prise en charge de Safari
  box-shadow: none; // Pas d'ombre
  border-bottom: 1px solid grey; // Bordure grise en bas
`;

// Style personnalisé pour les boutons
const StyledButton = styled(Button)`
  color: #fff; // Couleur du texte en blanc
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  height: 100%;
`;

export default function Navbar() {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const isLargeScreen = useMediaQuery('(min-width: 768px)'); // Vérifie si la fenêtre est assez grande

  const handleLogoClick = () => {
    navigate('/app/gamestats');
  };
  const handleTab1Click = () => {
    navigate('/app/gamestats');
  };
  const handleTab2Click = () => {
    navigate('/app/tournement');
  };
  const handleAccountClick = () => {
    navigate('/app/account');
  };

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <React.Fragment>
      <StyledAppBar position="static">
        <Toolbar>
          {/* Menu burger (affiché uniquement sur les petits écrans) */}
          {!isLargeScreen && (
            <IconButton color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo du site */}
          <IconButton color="inherit" aria-label="triangle" onClick={handleLogoClick}>
            <ChangeHistoryIcon />
          </IconButton>

          {/* Nom du site */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={handleLogoClick}>
            Mon Site
          </Typography>

          {/* Boutons (affichés uniquement sur les grands écrans) */}
          {isLargeScreen && (
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
              <StyledButton color="inherit" onClick={handleTab1Click} sx={{ paddingRight: 5 }}>
                Game Stats
              </StyledButton>
              <StyledButton color="inherit" onClick={handleTab2Click} sx={{ paddingLeft: 5 }}>
                Tournament
              </StyledButton>
            </Box>
          )}

          {/* Icône de profil */}
          <IconButton color="inherit" aria-label="profile" onClick={handleAccountClick}>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </StyledAppBar>

      {/* Menu burger (affiché uniquement sur les petits écrans) */}
      {!isLargeScreen && (
        <SwipeableDrawer
          anchor="left"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          onOpen={() => setOpenDrawer(true)}
        >
          <List>
            <ListItem button onClick={handleTab1Click}>
              <ListItemText primary="Game Stats" />
            </ListItem>
            <ListItem button onClick={handleTab2Click}>
              <ListItemText primary="Tournament" />
            </ListItem>
          </List>
        </SwipeableDrawer>
      )}
      <Outlet />
    </React.Fragment>
  );
}
