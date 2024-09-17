import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './manageShow.module.css';
import CustomButton from '@/Utils/customButton';

interface Show {
  _id: string;
  theatre: string;
  movie: string;
  date: string;
  time: string;
}

const ManageShows: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [editingShowId, setEditingShowId] = useState<string | null>(null); // To track the currently edited show
  const [editData, setEditData] = useState<Partial<Show>>({}); // Track the data being edited
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get('http://localhost:5000/showsFetch');
        setShows(response.data);
      } catch (error) {
        setError('Failed to fetch shows');
      }
    };

    fetchShows();
  }, []);

  // Handle delete action
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/showsDelete/${id}`);
      setShows((prevShows) => prevShows.filter((show) => show._id !== id));
    } catch (error) {
      setError('Failed to delete the show');
    }
  };

  // Handle edit click
  const handleEditClick = (show: Show) => {
    setEditingShowId(show._id); // Set the ID of the show being edited
    setEditData(show); // Set the data of the show being edited
  };

  // Handle save action
  const handleSaveClick = async () => {
    if (editingShowId) {
      try {
        // Send PUT request to update the show
        await axios.put(`http://localhost:5000/showsEdit/${editingShowId}`, editData);
        setShows((prevShows) =>
          prevShows.map((show) =>
            show._id === editingShowId ? { ...show, ...editData } : show
          )
        );
        setEditingShowId(null); 
      } catch (error) {
        setError('Failed to update the show');
      }
    }
  };

  // Handle cancel action
  const handleCancelClick = () => {
    setEditingShowId(null); // Exit edit mode without saving
    setEditData({}); // Reset edit data
  };

  // Handle input changes for editable fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>List of Show Timing</h1>
      {error && <p className={styles.error}>{error}</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Theatre</th>
            <th>Movie</th>
            <th>Time</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {shows.map((show) => (
            <tr key={show._id}>
              <td>
                {editingShowId === show._id ? (
                  <input
                    type="text"
                    name="theatre"
                    value={editData.theatre || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  show.theatre
                )}
              </td>
              <td>
                {editingShowId === show._id ? (
                  <input
                    type="text"
                    name="movie"
                    value={editData.movie || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  show.movie
                )}
              </td>
              <td>
                {editingShowId === show._id ? (
                  <input
                    type="time"
                    name="time"
                    value={editData.time || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  show.time
                )}
              </td>
              <td>
                {editingShowId === show._id ? (
                  <input
                    type="date"
                    name="date"
                    value={editData.date || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  show.date
                )}
              </td>
              <td>
                {editingShowId === show._id ? (
                  <>
                    <CustomButton label="Save" onClick={handleSaveClick} />
                    <CustomButton label="Cancel" onClick={handleCancelClick} />
                  </>
                ) : (
                  <>
                    <CustomButton label="Edit" onClick={() => handleEditClick(show)} />
                    <CustomButton label="Delete" onClick={() => handleDelete(show._id)} />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageShows;
