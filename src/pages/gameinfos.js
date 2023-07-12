import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CardMedia } from '@mui/material';
import { Box } from '@mui/material';

//Import du background
import BackgroundLogin from '../components/background';

export default function GameInfos() {
  const { state: { game } } = useLocation();
  const [isBoxExpanded, setIsBoxExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBoxExpanded(true);
    }, 500); // Délai avant d'expanser la boîte (en millisecondes)
    
    return () => clearTimeout(timer); // Nettoyage du timer lorsque le composant est démonté
  }, []);

  if (!game) {
    return <div>No game information available</div>;
  }

  return (
    <React.Fragment>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            image={game.image}
            alt={game.title}
            sx={{
              pointerEvents: 'none',
              objectFit: 'cover',
              objectPosition: 'center',
              height: '50vh', // Ajustez la hauteur souhaitée de CardMedia
            }} />
          <Box
            component="span"
            sx={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: isBoxExpanded ? '12%' : '0',
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
              backgroundColor: 'grey',
              cursor: 'pointer',
              transition: 'height 0.3s ease', // Animation de transition de la hauteur
            }} />
        </Box>
        <h1>{game.title}</h1>
        <p>{game.description}</p>
      <BackgroundLogin />
    </React.Fragment>
  );
}
