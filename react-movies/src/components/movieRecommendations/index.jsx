import React from "react";
import { Link } from "react-router";
import { getMovieRecommendations } from "../../api/tmdb-api";
import { excerpt } from "../../util";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'
import AddToMustWatchIcon from "../cardIcons/addToMustWatch";
import MovieList from "../movieList";

export default function MovieRecommendations({ movie }) {
    const { data, error, isPending, isError } = useQuery({
    queryKey: ['recommendations', { id: movie.id }],
    queryFn: getMovieRecommendations,
  });
  
  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const recommendations = data.results;

  return (
    <>
    <Typography variant="h4" component="h3" textAlign="center" my={2}>You May Also Like</Typography>
    <Grid container sx={{flex: "1 1 500px"}}>
    <MovieList action={(movie) => {
          return <AddToMustWatchIcon movie={movie} />
        }} movies={recommendations}></MovieList>
        </Grid>
    </>
  );
}
