import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import MyMustWatchListPage from './pages/myMustWatchListPage'
import TrendingTodayPage from './pages/trendingTodayMovies'
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import PersonPage from "./pages/personDetailsPage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
       <ThemeProvider theme={theme}>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={ <Navigate to="/" /> } />
            <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
            <Route path="/movies/my-must-watch" element={ <MyMustWatchListPage /> } />
            <Route path="/movies/trending-today" element={ <TrendingTodayPage /> } />
            <Route path="/movies/top-rated" element={ <TopRatedMoviesPage /> } />
            <Route path="/movies/now-playing" element={ <NowPlayingMoviesPage /> } />
            <Route path="/user/register" element={ <RegisterPage /> } />
            <Route path="/user/login" element={ <LoginPage /> } />
            <Route path="/person/:id" element={<PersonPage />} />
          </Routes>
        </MoviesContextProvider>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
