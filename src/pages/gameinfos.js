import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CardMedia, Box, Tooltip, Stack, Divider } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

// Import des icones
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';

//Import du background
import BackgroundLogin from '../components/background';
import { BorderRight } from '@mui/icons-material';

export default function GameInfos() {
  const { state: { game } } = useLocation();
  const [isBoxExpanded, setIsBoxExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => { setIsBoxExpanded(true); }, 500); // Délai avant d'expanser la boîte (en millisecondes)
    return () => clearTimeout(timer); // Nettoyage du timer lorsque le composant est démonté
  }, []);

   // Récupérer l'icône de l'état du serveur
   const getServerIcon = (status) => {
    switch (status) {
      case 'maintenance':
        return <Tooltip title="Maintenance"><ErrorTwoToneIcon sx={{ color: 'orange' }} /></Tooltip>;
      case 'offline':
        return <Tooltip title="Offline"><CancelTwoToneIcon sx={{ color: 'red' }} /></Tooltip>;
      case 'online':
        return <Tooltip title="Online"><CheckCircleTwoToneIcon sx={{ color: 'green' }} /></Tooltip>;
      default:
        return <Tooltip title="Unknown Status"><ErrorTwoToneIcon sx={{ color: 'green' }} /></Tooltip>;
    }
  };

  const graph = (color) => {
    return <LineChart
    xAxis={[
      {
        data: [1, 2, 3, 5, 8, 10]
      }
    ]}
    series={[
      {
        data: [2, 5.5, 2, 8.5, 1.5, 5],
        area: true,
        color
      },
    ]}
    width={600}
    height={250}
    />;
  };

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
              height: '30vh', // Ajustez la hauteur souhaitée de CardMedia
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
              transition: 'height 0.3s ease', // Animation de transition de la hauteur
              marginBottom: '-1px', // Ajouter une marge négative pour pallier au liseré non responsive
              marginLeft: '1px', // Ajouter une marge négative pour pallier au liseré non responsive
            }} />
        </Box>

        <Box sx={{ position: 'absolute', backgroundColor: 'grey', margin: '4vh'}}>
          <Box sx={{
            backgroundColor: 'green',
            marginBottom: '1vh',
          }}>
            <h1>{game.title}</h1>
          </Box>

          <Box sx={{
            backgroundColor: 'red',
            margin: '2vh',
          }}>
            <p>{game.description}</p>
          </Box>  
          
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            divider={<Divider orientation="vertical" flexItem color="grey"/>}
          >
            <Box>
              <h1>Graphique nb joueur</h1>
              {graph("blue")} {/* Graphique nb joueur */}
            </Box>
            <Box>
              <h1>Graphique etat serveur</h1>
              {getServerIcon(game.serverStatus)} {/* Icone état serveur */}
              {graph("green")} {/* Graphique etat serveur */}
            </Box>
          </Stack>

          <h1>Liste prérequis steam</h1>
        </Box>
      <BackgroundLogin />
    </React.Fragment>
  );
}
