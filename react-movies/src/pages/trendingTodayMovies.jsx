import React, { useContext } from "react";
import { getMoviesTrendingToday } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { AuthContext } from "../contexts/AuthContext";

const TrendingTodayPage = (props) => {

  const { isAuthenticated } = useContext(AuthContext);
  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['trending'],
    queryFn: getMoviesTrendingToday,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 

  return (
    <PageTemplate
        title="Movies Trending Today"
        movies={movies}
        action={(movie) => {
          if(isAuthenticated){
            return <AddToFavoritesIcon movie={movie} />
          }
        }}
      />
  );
};
export default TrendingTodayPage;
