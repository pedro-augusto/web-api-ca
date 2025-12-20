import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import {addInteraction} from "../../api/interactions-api";
import { AuthContext } from "../../contexts/authContext";

const AddToMustWatchIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { userName } = useContext(AuthContext); 
  const isFavorite = context.favorites.includes(movie.id);

  if (isFavorite) {
    return null;
  }

  const handleAddToMustWatch = (e) => {
    e.preventDefault();
    context.addToMustWatch(movie);

    addInteraction({
      movieId: movie.id,
      username: userName,
      interactionType: "Must Watch"
    });
  };
  
  return (
    <IconButton aria-label="add to must watch" onClick={handleAddToMustWatch}>
      <PlaylistAddCircleIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToMustWatchIcon;
