import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import {removeInteraction} from "../../api/interactions-api";
import { AuthContext } from "../../contexts/authContext";

const RemoveFromMustWatchIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { userName } = useContext(AuthContext);

  const handleRemoveFromMustWatch = (e) => {
    e.preventDefault();
    context.removeFromMustWatch(movie);

    removeInteraction({
      movieId: movie.id,
      username: userName,
      interactionType: "Must Watch"
    });
  };
  return (
    <IconButton
      aria-label="remove from must watch"
      onClick={handleRemoveFromMustWatch}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromMustWatchIcon;
