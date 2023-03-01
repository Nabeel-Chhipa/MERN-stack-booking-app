import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
  return (
    <Card
      sx={{
        width: 250,
        height: 320,
        borderRadius: 5,
        margin: 1,
        ":hover": { boxShadow: "10px 10px 20px #ccc" },
      }}
    >
      <img width="100%" height={"50%"} src={posterUrl} alt={title} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          fontSize={"1.3rem"}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Book</Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;
