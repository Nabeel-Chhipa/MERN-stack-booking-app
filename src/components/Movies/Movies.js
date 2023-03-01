import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import MovieItem from "./MovieItem";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  useState(() => {
    getAllMovies()
      .then((res) => setMovies(res.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box>
      <Box padding={5} margin={"auto"}>
        <Typography variant="h4" textAlign={"center"}>
          All Movies
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
          movies?.map((movie, index) => (
              <MovieItem
                id={movie.id}
                title={movie.title}
                releaseDate={movie.releaseDate}
                posterUrl={movie.posterUrl}
                key={index}
              />
            ))}
      </Box>
    </Box>
  )
}

export default Movies