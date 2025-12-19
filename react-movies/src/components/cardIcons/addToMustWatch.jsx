import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import {addInteraction} from "../../api/interactions-api";
import { AuthContext } from "../../contexts/authContext";

const AddToMustWatchIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { userName } = useContext(AuthContext); 

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
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToMustWatchIcon;
