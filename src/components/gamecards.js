import * as React from 'react';
import { useState, useEffect } from 'react';
import { Card ,CardContent, CardMedia, CardActions } from '@mui/material';
import { Typography, Button, IconButton, Box, Snackbar, Grid, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Import des icones
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CloseIcon from '@mui/icons-material/Close';

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
          <Card elevation={8} onMouseEnter={handleCardMouseEnter} onMouseLeave={handleCardMouseLeave}>
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

              <IconButton
                onClick={() => handleBookmarkClick(game.id)}
                sx={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  color: isCardBookmarked(game.id) ? 'primary.main' : 'inherit',
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
                  backgroundColor: 'white', // Couleur barre oblique
                  marginBottom: '-1px', // Ajouter une marge négative pour pallier au liseré non responsive
                  marginLeft: '1px', // Ajouter une marge négative pour pallier au liseré non responsive
                  cursor: "pointer", // Pour un meilleur compréhension / logique.
                  transition: 'height 0.3s ease'
                }}
                onClick={() => handleCardClick(game.id)}
              />
            </Box>
            
            <CardContent onClick={() => handleCardClick(game.id)} sx={{ cursor: 'pointer' }}>
              <Typography gutterBottom variant="h5" component="div">
                {game.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
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
