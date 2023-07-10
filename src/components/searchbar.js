import { Container, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ onSearch }) {
    const handleChange = (event) => {
      const searchTerm = event.target.value;
      onSearch(searchTerm);
    };
  
    return (
      <Container sx={{ mt: 4, mb: 4, display: "flex", justifyContent: "center" }}>
        <TextField
          id="search"
          type="search"
          label="Search"
          variant="standard"
          onChange={handleChange}
          sx={{ width: "60%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Container>
    );
  }