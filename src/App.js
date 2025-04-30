import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import './App.css';

const API_URL = 'add you API URL from omdbapi';
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [featuredMovie, setFeaturedMovie] = useState(null);

  const searchMovies = async (title) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}&s=${title}`);
      setMovies(response.data.Search || []);
      // Set the first movie as featured
      if (response.data.Search && response.data.Search.length > 0) {
        setFeaturedMovie(response.data.Search[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMovies([]);
      setFeaturedMovie(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    searchMovies('Avengers');
  }, []);

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">CINEMAX</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#movies">Movies</a>
          <a href="#tv">TV Shows</a>
          <a href="#favorites">Favorites</a>
        </div>
        <div className="user-actions">
          <button className="sign-in">Sign In</button>
        </div>
      </nav>

      {/* Hero Section with Featured Movie */}
      {featuredMovie && (
        <div className="hero" style={{ 
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url(${featuredMovie.Poster !== 'N/A' ? featuredMovie.Poster : 'https://via.placeholder.com/1920x1080?text=No+Image'})`
        }}>
          <div className="hero-content">
            <h1 className="hero-title">{featuredMovie.Title}</h1>
            <div className="hero-meta">
              <span className="year">{featuredMovie.Year}</span>
              <span className="rating">IMDb: ★★★★☆</span>
            </div>
            <p className="hero-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
            </p>
            <div className="hero-buttons">
              <button className="play-button">▶ Play</button>
              <button className="info-button">ℹ More Info</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="main-content">
        <div className="search-container">
          <h2>Find Movies & TV Shows</h2>
          <div className="search">
            <input
              type="text"
              placeholder="Search for movies or shows..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchMovies(searchTerm)}
            />
            <button onClick={() => searchMovies(searchTerm)}>
              <i className="fas fa-search"></i> Search
            </button>
          </div>
        </div>

        {/* Movies Section */}
        <section className="movies-section">
          <h2 className="section-title">{searchTerm ? `Results for "${searchTerm}"` : 'Popular Movies'}</h2>
          
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading movies...</p>
            </div>
          ) : (
            <div className="movie-grid">
              {movies.length > 0 ? (
                movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
              ) : (
                <p className="no-results">No movies found. Try a different search.</p>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">CINEMAX</div>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
          <div className="social-media">
            <a href="#facebook"><i className="fab fa-facebook"></i></a>
            <a href="#twitter"><i className="fab fa-twitter"></i></a>
            <a href="#instagram"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="copyright">
          © {new Date().getFullYear()} CINEMAX. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;