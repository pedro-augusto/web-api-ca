import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { getUserInteractions } from "../api/interactions-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [mustWatch, setMustWatch] = useState( [] )
  const { userName, isAuthenticated } = useContext(AuthContext);

 useEffect(() => {
  if (isAuthenticated && userName){

    const loadInteractions = async () => {
      try {
        const interactions = await getUserInteractions(userName);
        const favs = interactions
          .filter(i => i.interactionType === "Favourite")
          .map(i => i.movieId);

        const must = interactions
          .filter(i => i.interactionType === "Must Watch")
          .map(i => i.movieId);

        setFavorites(favs);
        setMustWatch(must);

      } catch (err) {
        console.error("Failed to load interactions", err);
      }
    };

    loadInteractions();
  }
}, [isAuthenticated, userName]);


  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };
  
  // We will use this function in the next step
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addToMustWatch = (movie) => {
    let newMustWatch = [];
    if (!mustWatch.includes(movie.id)){
      newMustWatch = [...mustWatch, movie.id];
    }
    else{
      newMustWatch = [...mustWatch];
    }
    setMustWatch(newMustWatch)
  };
  
  // We will use this function in the next step
  const removeFromMustWatch = (movie) => {
    setMustWatch( mustWatch.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        mustWatch,
        addToFavorites,
        removeFromFavorites,
        addToMustWatch,
        removeFromMustWatch,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
