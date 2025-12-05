import React from "react";
import { useParams } from 'react-router';
import { getPerson, getPersonImages, getPersonMovieCredits } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import MovieList from "../components/movieList";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
// Reference: https://www.educative.io/answers/how-to-use-material-uis-accordion-component
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PersonPage = (props) => {
  const { id } = useParams();
    const { data: person, error, isPending, isError  } = useQuery({
    queryKey: ['person', {id: id}],
    queryFn: getPerson,
  })

  const personCreditsQuery = useQuery({
          queryKey: ['person-credits', { id: id }],
          queryFn: getPersonMovieCredits,
      });
  
      const personImagesQuery = useQuery({
          queryKey: ['person-images', { id: id }],
          queryFn: getPersonImages,
      });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {person ? (
        <>
            <Box textAlign="center" my={4}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
                    {person.name}
                </Typography>
            </Box>

            <Box display="flex" justifyContent="center" my={4}>
                <Card sx={{ maxWidth: 200, boxShadow: 3 }}>
                    <CardMedia
                        component="img"
                        image={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                    />
                </Card>
            </Box>

            <Box textAlign="center" my={4} mx={15}>
                <Typography variant="body1" component="p">
                    {person.biography}
                </Typography>
            </Box>
            <Box textAlign="center" my={4} mx={15}>
                {person.place_of_birth
                    ? <Chip sx={{ mx: 1 }}  label={`Place of Birth: ${person.place_of_birth}`} variant="filled" />
                    : null}

                {person.birthday
                    ? <Chip sx={{ mx: 1 }} label={`Birthday: ${new Date(person.birthday).toLocaleDateString("en-IE")}`} variant="filled" />
                    : null}

                {person.known_for_department
                    ? <Chip sx={{ mx: 1 }} label={`Known for: ${person.known_for_department}`} variant="filled" />
                    : null}

                {person.popularity
                    ? <Chip sx={{ mx: 1 }} label={`Popularity: ${person.popularity}`} variant="filled" />
                    : null}

            </Box>
            <Divider sx={{ my: 4 }} />
            <Box mx={10} my={4}>
                {personCreditsQuery.data?.cast && personCreditsQuery.data.cast.length > 0 ?
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography variant='h4'>Known For (Cast)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container sx={{ flex: "1 1 500px" }} mx={10}>
                                <MovieList action={(movie) => {
                                    return <AddToMustWatchIcon movie={movie} />
                                }} movies={personCreditsQuery.data.cast} />
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    : null}
                {personCreditsQuery.data?.crew && personCreditsQuery.data.crew.length > 0 ?
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography variant='h4'>Known For (Crew)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container sx={{ flex: "1 1 500px" }}>
                                <MovieList action={(movie) => {
                                    return <AddToMustWatchIcon movie={movie} />
                                }} movies={personCreditsQuery.data.crew} />
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    : null}
                {personImagesQuery.data?.profiles && personImagesQuery.data?.profiles.length > 0 ?
                    <Accordion >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography variant='h4' >Images</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ImageList cols={4}>
                                {personImagesQuery.data.profiles.map((item) => (
                                    <ImageListItem key={item.file_path}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
                                            alt={`${person.name} image`}
                                            loading="lazy"
                                            style={{ borderRadius: 8, width: "100%", height: "auto" }}
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </AccordionDetails>
                    </Accordion>
                    : null}
            </Box>
        </>
      ) : (
        <p>Waiting for person details</p>
      )}
    </>
  );
};

export default PersonPage;
