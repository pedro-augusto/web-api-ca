import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies, getSearchResults } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Pagination from '@mui/material/Pagination';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const HomePage = () => {

  const [keywordTypped, setKeywordTypped] = useState("");
  const [submittedKeyword, setSubmittedKeyword] = useState("");
  const isSearching = submittedKeyword.trim().length > 0;
  const [page, setPage] = React.useState(1)
  const [sortOption, setSortOption] = useState("popularity.desc");

  let moviesToDisplay;

  if (isSearching) {
    moviesToDisplay = useQuery({
      queryKey: ['search-movies', { keyword: submittedKeyword }],
      queryFn: getSearchResults,
    });
  } else {
    moviesToDisplay = useQuery({
      queryKey: ['discover', { page: page }, { sortOption: sortOption }],
      queryFn: getMovies, // investigate for pagination tanstack query
      keepPreviousData: true,
    });
  }

  if (moviesToDisplay.isPending) {
    return <Spinner />;
  }

  if (moviesToDisplay.isError) {
    return <h1>{moviesToDisplay.error.message}</h1>;
  }

  const handleSearch = () => {
    setPage(1)
    setSubmittedKeyword(keywordTypped);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSort = (event) => {
    setSortOption(event.target.value);
    setPage(1);
  };

  const movies = moviesToDisplay.data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true

  return (
    <Grid container>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <PageTemplate
          title={isSearching ? `Results for "${submittedKeyword}"` : "Discover Movies"}
          movies={movies}
          action={(movie) => {
            return <AddToFavoritesIcon movie={movie} />
          }}
        >

          <Grid container size={12} my={5} sx={{
            justifyContent: "center",
            alignItems: "center",
          }}>
            <TextField
              variant="standard"
              type="text"
              placeholder="Search movies..."
              value={keywordTypped}
              onChange={(e) => {
                const value = e.target.value;
                setKeywordTypped(value);

                if (value.trim() === "") {
                  setSubmittedKeyword("");
                }
              }}
              sx={{ width: "35%", mr: 2, }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ mr: 2, }}
            >
              Search
            </Button>
            {isSearching ? null :
              <FormControl variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                  labelId="sort-label"
                  value={sortOption}
                  onChange={handleSort}
                  label="Sort By"
                >
                  <MenuItem value="popularity.desc">Popularity</MenuItem>
                  <MenuItem value="release_date.desc">Release Date</MenuItem>
                  <MenuItem value="vote_average.desc">Rating</MenuItem>
                </Select>
              </FormControl>
            }
          </Grid>
        </PageTemplate>
        {isSearching ? null :
          <Grid container justifyContent="center" my={4} sx={{ width: "100%" }}>
            <Pagination
              count={500}
              page={page}
              onChange={handlePageChange}
            />
          </Grid>
        }
      </Grid>
    </Grid>
  );
};
export default HomePage;
