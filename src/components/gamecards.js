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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBoxExpanded(true);
    }, 500); // Délai avant d'expanser la barre oblique (en millisecondes)
    
    return () => clearTimeout(timer); // Nettoyage du timer lorsque le composant est démonté
  }, []);

  const enqueueSnackbar = (message, severity) => {
    const snackbar = {
      message,
      severity,
      key: new Date().getTime(),
    };
    setSnackbarQueue((prevQueue) => [...prevQueue, snackbar]);
  };

  const closeSnackbar = (key) => {
    setSnackbarQueue((prevQueue) => prevQueue.filter((snackbar) => snackbar.key !== key));
  };

  const handleBookmarkClick = (cardId) => {
    if (bookmarkedCards.includes(cardId)) {
      // Remove from bookmarks
      setBookmarkedCards(bookmarkedCards.filter((id) => id !== cardId));
      enqueueSnackbar('Card removed from bookmarks', 'warning');
    } else {
      // Add to bookmarks
      setBookmarkedCards([...bookmarkedCards, cardId]);
      enqueueSnackbar('Card added to bookmarks', 'success');
    }
  };

  const isCardBookmarked = (cardId) => {
    return bookmarkedCards.includes(cardId);
  };

  // Gestion icone des états des serveurs
  const getServerIcon = (status) => {
    switch (status) {
      case 'maintenance':
        return <Tooltip title="Maintenance"><ErrorTwoToneIcon fontSize="small" sx={{ color: 'orange' }} /></Tooltip>;
      case 'offline':
        return <Tooltip title="Offline"><CancelTwoToneIcon fontSize="small" sx={{ color: 'red' }} /></Tooltip>;
      case 'online':
        return <Tooltip title="Online"><CheckCircleTwoToneIcon fontSize="small" sx={{ color: 'green' }} /></Tooltip>;
      default:
        return <Tooltip title="Uknown Status"><ErrorTwoToneIcon fontSize="small" sx={{ color: 'green' }} /></Tooltip>;
    }
  };

  const handleCardClick = (cardId) => {
    const selectedGame = data.find((game) => game.id === cardId);
    if (selectedGame) {
      navigate('/app/gameinfos', { state: { game: selectedGame } });
    }
  };

  const handleCardMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0px 0px 8px 6px rgba(104,111,253,0.8)';
  };
  
  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.transform = '';
    e.currentTarget.style.boxShadow = '';
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
                  objectPosition: 'center',
                  height: '200px', // Ajustez la hauteur souhaitée de CardMedia
                }}
              />

              {/* BOUTON AJOUT FAVORI */}
              <IconButton
  onClick={() => handleBookmarkClick(game.id)}
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
  {isCardBookmarked(game.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
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
                  marginBottom: '-1px', // Ajouter une marge négative pour pallier au liseré non responsive
                  marginLeft: '1px', // Ajouter une marge négative pour pallier au liseré non responsive
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
              <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white' }}>
                {game.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey' }}>
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
