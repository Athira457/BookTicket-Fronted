//movie banner showing page
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styles from './banner.module.css';

interface Movie {
  _id: string;
  name: string;
  poster: string;
}

const MovieGrid: React.FC = () => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${serverUrl}/moviesFetch`); 
        setMovies(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className={styles.movieContainer}>
      {movies.map(movie => (
        <div key={movie._id} className={styles.movieItem}>
          <Link href={`/Users/components/aboutMovie/${movie._id}`} passHref>
              <img
                src={`${serverUrl}/uploads/${movie.poster}`}
                alt={movie.name}
                width={400}
                height={500}
              />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
