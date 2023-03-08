import { Typography, Box, FormLabel, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";

const Booking = () => {
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({
    seatNumber: "",
    date: "",
  });
  const id = useParams().id;

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);
  console.log(movie);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    newBooking({ ...inputs, movie: movie._id })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  return (
    <div>
      {movie && (
        <>
          <Typography padding={3} variant="h5" textAlign={"center"}>
            {" "}
            Book Ticket of : {movie.title}{" "}
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              flexDirection={"column"}
              padding={3}
              width="50%"
              marginRight={"auto"}
            >
              <img
                width={"80%"}
                height={"300px"}
                src={movie.posterUrl}
                alt={movie.title}
              />
              <Box width={"80%"} marginTop={3} padding={2}>
                <Typography paddingTop={1}>{movie.description}</Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  {movie?.actors.map((actors) => actors + ", ")}
                </Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Release Date : {new Date(movie.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box width={"50%"} paddingTop={2}>
              <form onSubmit={handleSubmit}>
                <Box
                  padding={5}
                  margin={"auto"}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <FormLabel>Seat Number</FormLabel>
                  <TextField
                    name="seatNumber"
                    onChange={handleChange}
                    value={inputs.seatNumber}
                    type={"number"}
                    margin="normal"
                    variant="standard"
                  />
                  <FormLabel>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    value={inputs.date}
                    onChange={handleChange}
                    type={"date"}
                    margin="normal"
                    variant="standard"
                  />
                  <Button
                    type="submit"
                    sx={{ mt: 3 }}
                  >
                    Book Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};

export default Booking;
