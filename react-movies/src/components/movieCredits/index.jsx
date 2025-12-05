import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router";
import { getMovieCredits } from "../../api/tmdb-api";
import { excerpt } from "../../util";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";
import AddToMustWatchIcon from "../cardIcons/addToMustWatch";
import MovieList from "../movieList";
import CreditsList from "../creditsList";

export default function MovieCredits({ movie }) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id: movie.id }],
    queryFn: getMovieCredits,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const credits = data;

  return (
<>
  <Typography 
    variant="h4" 
    component="h3" 
    textAlign="center" 
    my={2}
  >
    Movie Credits
  </Typography>

  {/* Acting section */}
  <Grid container spacing={2} my={2}>
    <Grid>
      <Typography 
        variant="h5" 
        component="h3" 
        sx={{ mb: 2, textAlign: "left" }}
      >
        Acting
      </Typography>
      <CreditsList credits={credits.cast} />
    </Grid>
  </Grid>

  {/* Crew section */}
  <Grid container spacing={2} my={2}>
    <Grid>
      <Typography 
        variant="h5" 
        component="h3" 
        sx={{ mb: 2, textAlign: "left" }}
      >
        Crew
      </Typography>
      <CreditsList credits={credits.crew} />
    </Grid>
  </Grid>
</>

  );
}
