import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {addInteraction} from "../../api/interactions-api";
import { AuthContext } from "../../contexts/authContext";


const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { userName } = useContext(AuthContext); 

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    context.addToFavorites(movie);

    addInteraction({
      movieId: movie.id,
      username: userName,
      interactionType: "Favourite"
    });
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;
