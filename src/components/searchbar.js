import { Container, InputAdornment, TextField } from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

//Import des icones
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ onSearch }) {
    const handleChange = (event) => {
      const searchTerm = event.target.value;
      onSearch(searchTerm);
    };
    const customTheme = (outerTheme) =>
    createTheme({
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              '--TextField-brandBorderColor': 'grey',
              '--TextField-brandBorderHoverColor': '#686ffd',
              '--TextField-brandBorderFocusedColor': '#686ffd',
              '& .MuiInputLabel-root': {
                color: 'var(--TextField-brandBorderColor)', // Couleur label
              },
              '& label.Mui-focused': {
                color: 'var(--TextField-brandBorderFocusedColor)',
              },
              '& .MuiInputBase-input': {
                color: 'white', // Couleur du texte saisi
              },
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            notchedOutline: {
              borderColor: 'var(--TextField-brandBorderColor)',
            },
            root: {
              '&:hover': {
                borderColor: 'var(--TextField-brandBorderHoverColor)',
              },
              '&.Mui-focused': {
                borderColor: 'var(--TextField-brandBorderFocusedColor)',
              },
            },
          },
        },
        MuiFilledInput: {
          styleOverrides: {
            root: {
              '&:before, &:after': {
                borderBottom: '2px solid var(--TextField-brandBorderColor)',
              },
              '&:hover:not(.Mui-disabled, .Mui-error):before': {
                borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
              },
              '&.Mui-focused:after': {
                borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
              },
            },
          },
        },
        MuiInput: {
          styleOverrides: {
            root: {
              '&:before': {
                borderBottom: '2px solid var(--TextField-brandBorderColor)',
              },
              '&:hover:not(.Mui-disabled, .Mui-error):before': {
                borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
              },
              '&.Mui-focused:after': {
                borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
              },
            },
          },
        },
      },
    });
    return (
      <Container sx={{ pt: 4, pb: 4, display: "flex", justifyContent: "center" }}>
        <ThemeProvider theme={customTheme(useTheme)}>
        <TextField id='search' margin='normal' label='Recherche' type='search' variant="standard"
          onChange={handleChange}
          sx={{ width: "60%"}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon fontSize="medium" style={{ color: 'grey' }}/>
              </InputAdornment>
            ),
          }}
        />
        </ThemeProvider>
            {/* <TextField id='search' margin='normal' label='Recherche' type='search' variant="standard" onChange={handleChange} sx={{
              "& .MuiInputLabel-root": {color: '#E0E3E7'}, //styles du label
              "& .MuiOutlinedInput-root": {"& > fieldset": { borderColor: "#686ffd", borderRadius: 6, boxShadow: 5}}, //styles bordure base
              "& .MuiOutlinedInput-root:hover": {"& > fieldset": { borderColor: "#686ffd"}}, //styles bordure hover
              "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "#686ffd"}}, //styles bordure selected
              '& .MuiInputBase-input': { color: 'white' }, // Couleur du texte saisi
              width: "60%"
            }} InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon fontSize="medium" style={{ color: 'white' }}/>
                </InputAdornment>
              ),
            }}/> */}
      </Container>
    );
  }