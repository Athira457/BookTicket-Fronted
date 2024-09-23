"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styles from './banner.module.css';

interface Movie {
  _id: string;
  name: string;
  genre: string;
  poster: string;
}

const MovieGrid: React.FC = () => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');

  // Fetch movies when the component mounts
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${serverUrl}/moviesFetch`); 
        setMovies(response.data);
        setFilteredMovies(response.data); 
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  // Handle search input changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchInput(input);

    // Filter movies by name or genre based on the search input
    const filtered = movies.filter(movie => 
      movie.name.toLowerCase().includes(input.toLowerCase()) || 
      movie.genre.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  return (
    <div>
      {/* Search bar */}
      <div className={styles.searchBar}>
        <input 
          type="text" 
          placeholder="Search by movie name or genre" 
          value={searchInput} 
          onChange={handleSearch} 
          className={styles.searchInput} 
        />
      </div>

      {/* Movie grid */}
      <div className={styles.movieContainer}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <div key={movie._id} className={styles.movieItem}>
              <Link href={`/Users/components/aboutMovie/${movie._id}`} passHref>
                <img
                  src={`${serverUrl}/uploads/${movie.poster}`}
                  alt={movie.name}
                  width={400}
                  height={500}
                />
              </Link>
              <p className={styles.status}>{movie.name} ({movie.genre})</p>
            </div>
          ))
        ) : (
          <p>No movies found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default MovieGrid;
