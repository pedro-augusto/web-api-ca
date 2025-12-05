import React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Link } from "react-router";
import Box from "@mui/material/Box";


const CreditsList = ({ credits }) => {
  return (
    <Box justifyContent="center">
    <AvatarGroup  max={15}>
      {credits.map((person) => (
        <Link to={`/person/${person.id}`} style={{ textDecoration: "none", color: "inherit" }} >
        <Avatar
          key={person.id}
          alt={person.name}
          src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
          sx={{ width: 56, height: 56 }}
        />
        </Link>
      ))}
    </AvatarGroup>
    </Box>
  );
};

export default CreditsList;
