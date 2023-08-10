import * as React from 'react';
import { useState, useEffect } from 'react';
import { Card ,CardContent, CardMedia, CardActions } from '@mui/material';
import { Typography, Button, IconButton, Box, Snackbar, Grid, Alert, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Import des icones
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';

// Import du JSON contenant les infos des jeux
import data from "./ListData.json"

export default function GameCards({ filteredTerm }) {
  const [bookmarkedCards, setBookmarkedCards] = React.useState([]);
  const [snackbarQueue, setSnackbarQueue] = React.useState([]);
  const [isBoxExpanded, setIsBoxExpanded] = useState(false);
  const navigate = useNavigate();

  // Effet de chargement initial
  useEffect(() => {
    const timer = setTimeout(() => { setIsBoxExpanded(true); }, 500); // Délai avant d'expanser la barre oblique (en millisecondes)  
    return () => clearTimeout(timer); // Nettoyage du timer lorsque le composant est démonté
  }, []);

  // Ajout d'une notification à la file d'attente
  const enqueueSnackbar = (message, severity) => {
    const snackbar = {
      message,
      severity,
      key: new Date().getTime(),
    };
    setSnackbarQueue((prevQueue) => [...prevQueue, snackbar]);
  };

  // Fermeture de la notification
  const closeSnackbar = (key) => {
    setSnackbarQueue((prevQueue) => prevQueue.filter((snackbar) => snackbar.key !== key));
  };

  // Gestion du clic sur le bouton de favori
  const handleBookmarkClick = (cardId) => {
    if (bookmarkedCards.includes(cardId)) {
      // Supprimer des favoris
      setBookmarkedCards(bookmarkedCards.filter((id) => id !== cardId));
      enqueueSnackbar('Card removed from bookmarks', 'warning');
    } else {
      // Ajouter aux favoris
      setBookmarkedCards([...bookmarkedCards, cardId]);
      enqueueSnackbar('Card added to bookmarks', 'success');
    }
  };

  // Vérifier si la carte est dans les favoris
  const isCardBookmarked = (cardId) => {
    return bookmarkedCards.includes(cardId);
  };

  // Récupérer l'icône de l'état du serveur
  const getServerIcon = (status) => {
    switch (status) {
      case 'maintenance':
        return <Tooltip title="Maintenance"><ErrorTwoToneIcon fontSize="small" sx={{ color: 'orange' }} /></Tooltip>;
      case 'offline':
        return <Tooltip title="Offline"><CancelTwoToneIcon fontSize="small" sx={{ color: 'red' }} /></Tooltip>;
      case 'online':
        return <Tooltip title="Online"><CheckCircleTwoToneIcon fontSize="small" sx={{ color: 'green' }} /></Tooltip>;
      default:
        return <Tooltip title="Unknown Status"><ErrorTwoToneIcon fontSize="small" sx={{ color: 'green' }} /></Tooltip>;
    }
  };

  // Gestion du clic sur la carte
  const handleCardClick = (cardId) => {
    const selectedGame = data.find((game) => game.id === cardId);
    if (selectedGame) {
      navigate('/app/gameinfos', { state: { game: selectedGame } });
    }
  };

  // Gestion du survol de la carte (entrée)
  const handleCardMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0px 0px 8px 6px rgba(104, 111, 253, 0.8)';
    const icon = e.currentTarget.querySelector('.slide-icon');
    if (icon && !icon.classList.contains('bookmark-icon')) {
      icon.style.opacity = '1';
      icon.style.transform = 'translateX(0)';
    }
  };
  
  // Gestion du survol de la carte (sortie)
  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.transform = '';
    e.currentTarget.style.boxShadow = '';
    const icon = e.currentTarget.querySelector('.slide-icon');
    if (icon && !icon.classList.contains('bookmark-icon')) {
      icon.style.opacity = '0';
      icon.style.transform = 'translateX(100%)';
    }
  };
  
  // Style CardContent
  const titleStyles = {
    color: 'white',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };
  
  const descriptionStyles = {
    color: 'grey',
    maxHeight: '4em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  };  

  // FILTRE DE JEUX
  const searchTerm = filteredTerm.replace(/\s/g, ""); // Supprimer les espaces du terme de recherche
  const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  const filteredData = data.filter((game) => regex.test(game.title.replace(/\s/g, ""))); // Supprimer les espaces du titre du jeu

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{padding:"2%"}} justifyContent="center">
      {filteredData.map((game) => (
        <Grid item xs={2} sm={4} md={4} key={game.id}>
          <Card elevation={8} onMouseEnter={handleCardMouseEnter} onMouseLeave={handleCardMouseLeave}
                sx={{
                  background: '#0A0A0A',
                  color: 'white',
                }}>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                image={game.image}
                alt={game.title}
                sx={{
                  pointerEvents: 'none',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  height: '200px', // La hauteur souhaitée de CardMedia
                }}
              />

              {/* BOUTON AJOUT FAVORI */}
              <IconButton
                onClick={() => handleBookmarkClick(game.id)}
                className={`slide-icon ${isCardBookmarked(game.id) ? 'bookmark-icon' : ''}`}
                style={{
                  opacity: isCardBookmarked(game.id) ? '1' : '0',
                  transform: isCardBookmarked(game.id) ? 'translateX(0)' : 'translateX(100%)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                }}
                sx={{
                  position: 'absolute',
                  top: '3%',
                  right: 0,
                  color: isCardBookmarked(game.id) ? 'white' : 'inherit',
                  borderRadius: '50% 0 0 50%', // Coins arrondis supérieur gauche et inférieur gauche
                  borderTop: '1px solid #686ffd', // Bordures grises
                  borderBottom: '1px solid #686ffd', // Bordures grises
                  backgroundColor: '#0A0A0A', // Fond rouge
                  '&:hover': {
                    backgroundColor: 'grey',
                  }
                }}
              >
                {isCardBookmarked(game.id) ? <BookmarkIcon fontSize="small" /> : <BookmarkBorderIcon fontSize="small" />}
              </IconButton>

              <Box
                component="span"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  height: isBoxExpanded ? '12%' : '0',
                  clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                  background: '#0A0A0A', // Couleur barre oblique
                  mb: '-1px', // Ajouter une marge négative pour pallier au liseré non responsive
                  ml: '1px', // Ajouter une marge négative pour pallier au liseré non responsive
                  cursor: "pointer", // Pour un meilleur compréhension / logique.
                  transition: 'height 0.3s ease',
                }}
                onClick={() => handleCardClick(game.id)}
              />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '-5%',
                    right: '2%',
                    opacity: isBoxExpanded ? 1 : 0,
                    transition: 'opacity 1s ease-in',
                    visibility: isBoxExpanded ? 'visible' : 'hidden',
                  }}
                >
                  {getServerIcon(game.serverStatus)} {/* Icone état serveur */}
                </Box>
            </Box>
            
            <CardContent onClick={() => handleCardClick(game.id)} sx={{ cursor: 'pointer' }}>
              <Typography
                gutterBottom // Permet un margin bottom
                variant="h5"
                component="div"
                sx={titleStyles}
                title={game.title} // Afficher le titre complet au survol
              >
                {game.title}
              </Typography>
              <Typography variant="body2" sx={descriptionStyles}>
                {game.description}
              </Typography>
            </CardContent>

            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      {snackbarQueue.map((snackbar) => (
        <Snackbar
          key={snackbar.key}
          open
          autoHideDuration={3000}
          onClose={() => closeSnackbar(snackbar.key)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert
            variant="filled"
            severity={snackbar.severity}
            sx={{ justifyContent: 'space-between' }}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => closeSnackbar(snackbar.key)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      ))}
    </Grid>
  );
}
