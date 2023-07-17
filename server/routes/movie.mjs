import express from 'express';
import axios from 'axios';
const router = express.Router();

// Get movies now playing in theaters
router.get('/nowplaying', async (req, res) => {
    try {
      const options = {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.MOVIE_API_TOKEN}`
        }
      };
  
      const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing', options);
      const movies = response.data.results.map((movie) => ({
        title: movie.title,
        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        // Add other relevant movie data
      }));
  
      res.status(200).json(movies);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

//Get popular movies
router.get('/popular', async (req, res) => {
    try {
      const options = {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.MOVIE_API_TOKEN}`
        }
      };
  
      const response = await axios.get('https://api.themoviedb.org/3/movie/popular', options);
      const movies = response.data.results.map((movie) => ({
        title: movie.title,
        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        // Add other relevant movie data
      }));
  
      res.status(200).json(movies);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

//Get Top rated movies
router.get('/toprated', async (req, res) => {
    try {
      const options = {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.MOVIE_API_TOKEN}`
        }
      };
  
      const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated', options);
      const movies = response.data.results.map((movie) => ({
        title: movie.title,
        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        // Add other relevant movie data
      }));
  
      res.status(200).json(movies);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});



// Export the user router
export default router;
