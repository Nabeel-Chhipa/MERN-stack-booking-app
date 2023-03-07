import React, { useEffect, useState } from "react";
import { AppBar, Tab, Tabs, TextField, Toolbar } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Box } from "@mui/system";
import Autocomplete from "@mui/material/Autocomplete";
import { getAllMovies } from "../api-helpers/api-helpers";
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminAction, userAction } from "../store";

const Header = () => {
  const dispatch = useDispatch()
  const isAdminLoggedIn = useSelector(state => state.admin.isLoggedIn)
  const isUserLoggedIn = useSelector(state => state.user.isLoggedIn)
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((error) => console.log(error));
  }, []);

  const logout = (isAdmin) => {
    dispatch(isAdmin?adminAction.logout() : userAction.logout())
  }

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
            {
              !isAdminLoggedIn && !isUserLoggedIn && (
                <>
                <Tab LinkComponent={Link} to='/admin' label="Admin" />
                <Tab LinkComponent={Link} to='/auth' label="Auth" />
                </>
              )
            }
            {
              isUserLoggedIn && (
                <>
                  <Tab LinkComponent={Link} to='/user' label="Profile" />
                  <Tab onClick={() => logout(false)} LinkComponent={Link} to='/' label="Logout" />
                </>
              )
            }
            {
              isAdminLoggedIn && (
                <>
                  <Tab LinkComponent={Link} to='/add' label="Add Movie" />
                  <Tab LinkComponent={Link} to='/user' label="Profile" />
                  <Tab onClick={() => logout(true)} LinkComponent={Link} to='/' label="Logout" />
                </>
              )
            }
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
