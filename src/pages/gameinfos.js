import React from 'react';
import { useLocation } from 'react-router-dom';
import { CardMedia, Box, Tooltip, Stack, Divider } from '@mui/material';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import CanvasJSReact from '@canvasjs/react-charts';
import BackgroundLogin from '../components/background';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function GameInfos() {
  const { state: { game } } = useLocation();

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

  const playerChartData = {
    animationEnabled: true,
    axisX: {
      title: "Time",
      gridColor: "grey", // Set grid color to white
      labelFontColor: "grey", // Set label font color to white
      titleFontColor: "grey", // Set axis title font color to white
    },
    axisY: {
      title: "Number of Players",
      gridColor: "grey", // Set grid color to white
      labelFontColor: "grey", // Set label font color to white
      titleFontColor: "grey", // Set axis title font color to white
    },
    
    backgroundColor: "transparent",
    data: [
      {
        type: "area",
        dataPoints: game.playerData.time.map((time, index) => ({
          x: time,
          y: game.playerData.players[index],
        })),
        color: "#ff0000",
      },
    ],
  };

  const crashChartData = {
    animationEnabled: true,
    axisX: {
      title: "Time",
      gridColor: "grey", // Set grid color to white
      labelFontColor: "grey", // Set label font color to white
      titleFontColor: "grey", // Set axis title font color to white
    },
    axisY: {
      title: "Number of Crash Reports",
      gridColor: "grey", // Set grid color to white
      labelFontColor: "grey", // Set label font color to white
      titleFontColor: "grey", // Set axis title font color to white
    },
    backgroundColor: "transparent",
    data: [
      {
        type: "area",
        dataPoints: game.crashData.time.map((time, index) => ({
          x: time,
          y: game.crashData.reports[index],
        })),
        color: "#00ff00",
      },
    ],
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
            height: '60vh',
            zIndex: '-2',
          }}
        />
      </Box>
      <Box
        sx={{
          position: 'relative',
          m: '-20vh 4vh 0 4vh',
          p: '10vh',
          backgroundColor:'#282828',
          borderRadius: '1vh',
        }}
        />
      <Box
        sx={{
          position: 'relative',
          m: '-20vh 4vh 4vh 4vh',
          p: '4vh',
          backdropFilter: 'blur(10px)',
          border: '0.1vh solid grey',
          borderRadius: '1vh',
          boxShadow: 20,
        }}
      >
        <Box sx={{ mb: '4vh', color: 'white', textAlign: 'center' }}>
          <h1>{game.title}</h1>
        </Box>

        <Box sx={{ mb: '3vh', color: 'white' }}>
          <p>{game.description}</p>
        </Box>

        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          divider={<Divider orientation="vertical" flexItem color="grey" />}
        >
          <Box sx={{width:'100%', m:'5vh', textAlign: 'center'}}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={2}
            >
              <h1>Graphique nb joueur</h1>
              <CanvasJSChart options={playerChartData} />
            </Stack>
          </Box>

          <Box sx={{width:'100%', m:'5vh', textAlign: 'center'}}>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={2}
            >
              <h1>Graphique etat serveur {getServerIcon(game.serverStatus)}</h1>
              <CanvasJSChart options={crashChartData} />
            </Stack>
          </Box>
        </Stack>

        <h1>Liste prérequis steam</h1>
      </Box>
      <BackgroundLogin />
    </React.Fragment>
  );
}
