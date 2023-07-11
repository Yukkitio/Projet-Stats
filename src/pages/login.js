import "../App.css";
import BackgroundLogin from "../components/background";

import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    // Vérification des informations d'identification
    if (email === "admin" && password === "admin") {
      navigate("/homepage/gamestats");
    } else {
      alert("Identifiants incorrects");
    }
  };

  const customTheme = (outerTheme) =>
    createTheme({
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              "--TextField-brandBorderColor": "grey",
              "--TextField-brandBorderHoverColor": "#686ffd",
              "--TextField-brandBorderFocusedColor": "#686ffd",
              "& .MuiInputLabel-root": {
                color: "var(--TextField-brandBorderColor)", // Couleur label
              },
              "& label.Mui-focused": {
                color: "var(--TextField-brandBorderFocusedColor)",
              },
              "& .MuiInputBase-input": {
                color: "grey", // Couleur du texte saisi
              },
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            notchedOutline: {
              borderColor: "var(--TextField-brandBorderColor)",
            },
            root: {
              "&:hover": {
                borderColor: "var(--TextField-brandBorderHoverColor)",
              },
              "&.Mui-focused": {
                borderColor: "var(--TextField-brandBorderFocusedColor)",
              },
            },
          },
        },
        MuiFilledInput: {
          styleOverrides: {
            root: {
              "&:before, &:after": {
                borderBottom: "2px solid var(--TextField-brandBorderColor)",
              },
              "&:hover:not(.Mui-disabled, .Mui-error):before": {
                borderBottom:
                  "2px solid var(--TextField-brandBorderHoverColor)",
              },
              "&.Mui-focused:after": {
                borderBottom:
                  "2px solid var(--TextField-brandBorderFocusedColor)",
              },
            },
          },
        },
        MuiInput: {
          styleOverrides: {
            root: {
              "&:before": {
                borderBottom: "2px solid var(--TextField-brandBorderColor)",
              },
              "&:hover:not(.Mui-disabled, .Mui-error):before": {
                borderBottom:
                  "2px solid var(--TextField-brandBorderHoverColor)",
              },
              "&.Mui-focused:after": {
                borderBottom:
                  "2px solid var(--TextField-brandBorderFocusedColor)",
              },
            },
          },
        },
      },
    });

  return (
    <>
      <Container component="main" maxWidth="xs" bgcolor="green">
        <Box
          sx={{
            boxShadow: 20,
            borderRadius: "4vh",
            display: "flex",
            mt: 16,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#282828",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ mt: 3, mb: 3, color: "#686ffd" }}
          >
            S'identifier
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ThemeProvider theme={customTheme(useTheme)}>
              <TextField
                id="email"
                margin="normal"
                fullWidth
                label="Email"
                name="email"
                variant="filled"
              />
              <TextField
                id="password"
                margin="normal"
                fullWidth
                label="Mot de passe"
                name="password"
                type="password"
                variant="filled"
              />
            </ThemeProvider>

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                mb: 1,
                borderRadius: "4vh",
                backgroundColor: "#686ffd",
              }}
              endIcon={<LockOpenOutlinedIcon />}
            >
              S'authentifier
            </Button>
          </Box>

          <Button
            variant="text"
            size="small"
            sx={{ color: "#686ffd" }}
            disabled
          >
            Mot de passe oublié ?
          </Button>
          <Button
            variant="text"
            sx={{ mt: 2, mb: 2, color: "#686ffd" }}
            size="small"
          >
            Invité
          </Button>
        </Box>
      </Container>
      <BackgroundLogin />
    </>
  );
}

/* <TextField id='password' margin='normal' sx={{
              "& .MuiInputLabel-root": {color: '#E0E3E7'},//styles du label
              "& .MuiOutlinedInput-root": {"& > fieldset": { borderColor: "#686ffd", borderRadius: 6, boxShadow: 5}},//styles bordure base
              "& .MuiOutlinedInput-root:hover": {"& > fieldset": { borderColor: "#686ffd"}},//styles bordure hover
              "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "#686ffd", color:'red'}}//styles bordure selected
            }} fullWidth label='Mot de passe' name='password' type='password' /> */
