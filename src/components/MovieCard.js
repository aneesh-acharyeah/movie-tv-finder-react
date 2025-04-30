import React from 'react';
import '../App.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="card-image">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s'}
          alt={movie.Title}
        />
        <div className="card-overlay">
          <button className="play-icon">
            <i className="fas fa-play"></i>
          </button>
          <div className="card-badge">HD</div>
          <div className="rating-badge">IMDb: 7.5</div>
        </div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{movie.Title}</h3>
        <div className="card-meta">
          <span className="year">{movie.Year}</span>
          <span className="type">Movie</span>
        </div>
        <div className="card-actions">
          <button className="add-to-list">
            <i className="fas fa-plus"></i> My List
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;