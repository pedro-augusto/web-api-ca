import React, { useContext } from "react";
import { getNowPlayingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToMustWatchIcon from '../components/cardIcons/addToMustWatch'
import { AuthContext } from "../contexts/AuthContext";

const NowPlayingMoviesPage = (props) => {

  const { isAuthenticated } = useContext(AuthContext);
  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['now-playing'],
    queryFn: getNowPlayingMovies,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const mustWatchMovies = movies.filter(m => m.mustWatchMovie)
  localStorage.setItem('mustWatch', JSON.stringify(mustWatchMovies))
  const addToMustWatch = (movieId) => true 

  return (
    <PageTemplate
        title="Movies Now Playing"
        movies={movies}
        action={(movie) => {
          if(isAuthenticated){
            return <AddToMustWatchIcon movie={movie} />
          }
        }}
      />
  );
};
export default NowPlayingMoviesPage;
