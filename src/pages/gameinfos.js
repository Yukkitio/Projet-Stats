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

export default function GameInfos() {
  const { state: { game } } = useLocation();
  const [isBoxExpanded, setIsBoxExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => { setIsBoxExpanded(true); }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getServerIcon = (status) => {
    switch (status) {
      case 'maintenance':
        return <ErrorTwoToneIcon sx={{ color: 'orange' }} />;
      case 'offline':
        return <CancelTwoToneIcon sx={{ color: 'red' }} />;
      case 'online':
        return <CheckCircleTwoToneIcon sx={{ color: 'green' }} />;
      default:
        return <ErrorTwoToneIcon sx={{ color: 'green' }} />;
    }
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
            height: '30vh',
          }}
        />
        <Box
          component="span"
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: isBoxExpanded ? '12%' : '0',
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            backgroundColor: 'grey',
            transition: 'height 0.3s ease',
            marginBottom: '-1px',
            marginLeft: '1px',
          }}
        />
      </Box>

      <Box sx={{ position: 'absolute', backgroundColor: 'grey', margin: '4vh' }}>
        <Box sx={{ backgroundColor: 'green', marginBottom: '1vh' }}>
          <h1>{game.title}</h1>
        </Box>

        <Box sx={{ backgroundColor: 'red', margin: '2vh' }}>
          <p>{game.description}</p>
        </Box>

        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          divider={<Divider orientation="vertical" flexItem color="grey" />}
        >
          <Box>
            <h1>Graphique nb joueur</h1>
            <LineChart
              xAxis={[{ data: game.playerData.time }]}
              series={[{ data: game.playerData.players, color: '#ff0000' }]}
              width={600}
              height={250}
            />
          </Box>
          <Box>
            <h1>Graphique etat serveur</h1>
            {getServerIcon(game.serverStatus)}
            <LineChart
              xAxis={[{ data: game.crashData.time }]}
              series={[{ data: game.crashData.reports, color: '#00ff00' }]}
              width={600}
              height={250}
            />
          </Box>
        </Stack>

        <h1>Liste prérequis steam</h1>
      </Box>
      <BackgroundLogin />
    </React.Fragment>
  );
}
