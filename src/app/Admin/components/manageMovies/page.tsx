import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './manageMovie.module.css'; 
import CustomButton from '@/Utils/customButton';

interface Movie {
  _id: string;
  name: string;
  genre: string;
  languages: [string];
  synopsis: string;
  poster: string;
}

const ManageMovies: React.FC = () => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${serverUrl}/moviesFetch`);
        setMovies(response.data);
      } catch (error) {
        setError('Failed to fetch movies');
      }
    };
    fetchMovies();
  }, []);

  // Handle edit button click
  const handleEdit = (movie: Movie) => {
    setEditingId(movie._id);
    setEditData(movie);
  };

  // Handle save button click (update the movie)
  const handleSave = async (id: string) => {
    try {
      await axios.put(`${serverUrl}/movieEdit/${id}`, editData);
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie._id === id ? { ...movie, ...editData } : movie
        )
      );
      setEditingId(null); // Exit edit mode
    } catch (error) {
      setError('Failed to update the movie');
    }
  };

  // Handle delete action
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${serverUrl}/movieDelete/${id}`);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
    } catch (error) {
      setError('Failed to delete the movies');
    }
  };

  // Handle input changes in edit mode
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editData) {
      setEditData({ ...editData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>List of Movies</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Genre</th>
            <th>Languages</th>
            <th>Synopsis</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>
                {editingId === movie._id ? (
                  <input
                    name="name"
                    value={editData?.name || ''}
                    onChange={handleInputChange}
                    className={styles.editInput}
                  />
                ) : (
                  movie.name
                )}
              </td>
              <td>
                {editingId === movie._id ? (
                  <input
                    name="genre"
                    value={editData?.genre || ''}
                    onChange={handleInputChange}
                    className={styles.editInput}
                  />
                ) : (
                  movie.genre
                )}
              </td>
              <td>
                {editingId === movie._id ? (
                  <input
                    name="languages"
                    value={editData?.languages || ''}
                    onChange={handleInputChange}
                    className={styles.editCity}
                  />
                ) : (
                  movie.languages
                )}
              </td>
              <td>
                {editingId === movie._id ? (
                  <input
                    name="synopsis"
                    value={editData?.synopsis || ''}
                    onChange={handleInputChange}
                    className={styles.editSynopsis}
                  />
                ) : (
                  movie.synopsis
                )}
              </td>
              <td>
                {editingId === movie._id ? (
                  <CustomButton label="Save" onClick={() => handleSave(movie._id)} />
                ) : (
                  <CustomButton label="Edit" onClick={() => handleEdit(movie)} />
                )}
                <CustomButton label="Delete" onClick={() => handleDelete(movie._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ManageMovies;
