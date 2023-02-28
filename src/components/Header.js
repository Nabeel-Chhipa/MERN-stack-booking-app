import React, { useEffect, useState } from "react";
import { AppBar, Tab, Tabs, TextField, Toolbar } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Box } from "@mui/system";
import Autocomplete from "@mui/material/Autocomplete";
import { getAllMovies } from "../api-helpers/api-helpers";
import {Link} from 'react-router-dom'

const Header = () => {
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((error) => console.log(error));
  }, []);

  return (
    <AppBar position='sticky' sx={{ bgcolor: "#999" }}>
      <Toolbar>
        <Box width={"20%"}>
          <MovieIcon />
        </Box>
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            freeSolo
            options={movies && movies?.map((movie) => movie.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant="standard"
                {...params}
                placeholder="search movie"
              />
            )}
          />
        </Box>
        <Box display={"flex"}>
          <Tabs
            textColor="white"
            value={value}
            indicatorColor={"secondary"}
            onChange={(e, eValue) => setValue(eValue)}
          >
            <Tab LinkComponent={Link} to='/movies' label="Movies" />
            <Tab LinkComponent={Link} to='/admin' label="Admin" />
            <Tab LinkComponent={Link} to='/auth' label="Auth" />
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
