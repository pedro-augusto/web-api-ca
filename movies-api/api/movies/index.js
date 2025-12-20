import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  getMovies,
  getTrendingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getMovieById,
  getPerson,
  getPersonMovieCredits,
  getPersonImages,
  searchMovies,
  getGenres,
  getMovieImages,
  getMovieRecommendations,
  getMovieCredits,
  getMovieReviews,
} from "../tmdb-api";

const router = express.Router();

router.get('/discover', asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const sortBy = req.query.sort_by || "popularity.desc";

  const discoverMovies = await getMovies(page, sortBy);
  res.status(200).json(discoverMovies);
}));

router.get("/trending", asyncHandler(async (req, res) => {
  res.status(200).json(await getTrendingMovies());
}));

router.get("/top-rated", asyncHandler(async (req, res) => {
  res.status(200).json(await getTopRatedMovies());
}));

router.get("/upcoming", asyncHandler(async (req, res) => {
  res.status(200).json(await getUpcomingMovies());
}));

router.get("/now-playing", asyncHandler(async (req, res) => {
  res.status(200).json(await getNowPlayingMovies());
}));

router.get("/person/:id", asyncHandler(async (req, res) => {
  res.json(await getPerson(req.params.id));
}));

router.get("/person/:id/credits", asyncHandler(async (req, res) => {
  res.json(await getPersonMovieCredits(req.params.id));
}));

router.get("/person/:id/images", asyncHandler(async (req, res) => {
  res.json(await getPersonImages(req.params.id));
}));

router.get("/search/:keyword", asyncHandler(async (req, res) => {
  res.json(await searchMovies(req.params.keyword));
}));

router.get("/genres", asyncHandler(async (req, res) => {
  res.json(await getGenres());
}));

router.get("/movie/:id/images", asyncHandler(async (req, res) => {
  res.json(await getMovieImages(req.params.id));
}));

router.get("/movie/:id/recommendations", asyncHandler(async (req, res) => {
  res.json(await getMovieRecommendations(req.params.id));
}));

router.get("/movie/:id/credits", asyncHandler(async (req, res) => {
  res.json(await getMovieCredits(req.params.id));
}));

router.get("/movie/:id/reviews", asyncHandler(async (req, res) => {
  res.json(await getMovieReviews(req.params.id));
}));

router.get("/:id", asyncHandler(async (req, res) => {
  res.status(200).json(await getMovieById(req.params.id));
}));

export default router;
