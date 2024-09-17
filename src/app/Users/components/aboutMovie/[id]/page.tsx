// single page view
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './about.module.css'; 

interface Movie {
  _id: string;
  name: string;
  poster: string;
  synopsis: string;
  genre: string;
  duration: string;
  releaseDate: string;
}

interface MovieDetailsProps {
    params: { id: string }; // Define the params prop with id
  }

  const MovieDetails: React.FC<MovieDetailsProps> = ({ params }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { id } = params; 

  const serverUrl = "http://localhost:5000";

  useEffect(() => {
    if (id) {
      const fetchMovieDetails = async () => {
        try {
          const response = await axios.get(`${serverUrl}/movieId/${id}`);
          setMovie(response.data);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      };

      fetchMovieDetails();
    }
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.movieDetailContainer}>
      <div className={styles.moviePoster}>
        <img
          src={`${serverUrl}/uploads/${movie.poster}`}
          alt={movie.name}
          width={400}
          height={500}
        />
      </div>
      <div className={styles.movieInfo}>
        <h1>{movie.name}</h1>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Duration:</strong> {movie.duration}</p>
        <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
        <p><strong>Description:</strong> {movie.synopsis}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
