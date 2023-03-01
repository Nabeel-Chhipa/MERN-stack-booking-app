import { Box, Typography, Button } from "@mui/material";
import React from "react";
import MovieItem from "./Movies/MovieItem";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getAllMovies } from "../api-helpers/api-helpers";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useState(() => {
    getAllMovies()
      .then((res) => setMovies(res.movies))
      .catch((err) => console.log(err));
  }, []);
  console.log(movies);
  return (
    <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={2}>
      <Box margin={"auto"} width={"80%"} height={"80vh"} padding={2}>
        <img
          src="https://wallpaperaccess.com/full/4690272.jpg"
          alt="Dhoom 3"
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <Box padding={5} margin={"auto"}>
        <Typography variant="h4" textAlign={"center"}>
          Latest Release
        </Typography>
      </Box>
      <Box
        display={"flex"}
        width={"80%"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        alignItems={"center"}
        margin={"auto"}
      >
        {movies &&
          movies
            ?.slice(2)
            .map((movie, index) => (
              <MovieItem
                id={movie.id}
                title={movie.title}
                releaseDate={movie.releaseDate}
                posterUrl={movie.posterUrl}
                key={index}
              />
            ))}
      </Box>
      <Box display={"flex"} padding={5} margin={"auto"}>
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{ margin: "auto", color: "#wdwb42" }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
