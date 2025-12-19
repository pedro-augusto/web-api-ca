import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import {removeInteraction} from "../../api/interactions-api";
import { AuthContext } from "../../contexts/authContext";

const RemoveFromFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { userName } = useContext(AuthContext); 
  
  const handleRemoveFromFavorites = (e) => {
    e.preventDefault();
    context.removeFromFavorites(movie);

    removeInteraction({
          movieId: movie.id,
          username: userName,
          interactionType: "Favourite"
        });
  };
  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromFavorites}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavoritesIcon;
