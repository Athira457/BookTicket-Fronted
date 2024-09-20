import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './manageTheatre.module.css'; 
import CustomButton from '@/Utils/customButton';

interface Theatre {
  _id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  seatingCapacity: string;
  ticketPrice:string;
}

const ShowTheatre: React.FC = () => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Theatre | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const response = await axios.get(`${serverUrl}/theatresFetch`);
        setTheatres(response.data);
      } catch (error) {
        setError('Failed to fetch theatres');
      }
    };
    fetchTheatres();
  }, []);

  // Handle edit button click
  const handleEdit = (theatre: Theatre) => {
    setEditingId(theatre._id);
    setEditData(theatre);
  };

  // Handle save button click (update the theatre)
  const handleSave = async (id: string) => {
    try {
      await axios.put(`${serverUrl}/theatreEdit/${id}`, editData);
      setTheatres((prevTheatres) =>
        prevTheatres.map((theatre) =>
          theatre._id === id ? { ...theatre, ...editData } : theatre
        )
      );
      setEditingId(null); // Exit edit mode
    } catch (error) {
      setError('Failed to update the theatre');
    }
  };

  // Handle delete action
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${serverUrl}/theatreDelete/${id}`);
      setTheatres((prevTheatres) => prevTheatres.filter((theatre) => theatre._id !== id));
    } catch (error) {
      setError('Failed to delete the theatre');
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
      <h1 className={styles.title}>List of Theatres</h1>
      {error && <p className={styles.error}>{error}</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>City</th>
            <th>State</th>
            <th>Seating Capacity</th>
            <th>Ticket Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {theatres.map((theatre) => (
            <tr key={theatre._id}>
              <td>
                {editingId === theatre._id ? (
                  <input
                    name="name"
                    value={editData?.name || ''}
                    onChange={handleInputChange}
                    className={styles.editInput}
                  />
                ) : (
                  theatre.name
                )}
              </td>
              <td>
                {editingId === theatre._id ? (
                  <input
                    name="location"
                    value={editData?.location || ''}
                    onChange={handleInputChange}
                    className={styles.editInput}
                  />
                ) : (
                  theatre.location
                )}
              </td>
              <td>
                {editingId === theatre._id ? (
                  <input
                    name="city"
                    value={editData?.city || ''}
                    onChange={handleInputChange}
                    className={styles.editCity}
                  />
                ) : (
                  theatre.city
                )}
              </td>
              <td>
                {editingId === theatre._id ? (
                  <input
                    name="state"
                    value={editData?.state || ''}
                    onChange={handleInputChange}
                    className={styles.editState}
                  />
                ) : (
                  theatre.state
                )}
              </td>
              <td>
                {editingId === theatre._id ? (
                  <input
                    name="seatingCapacity"
                    value={editData?.seatingCapacity || ''}
                    onChange={handleInputChange}
                    className={styles.editCapacity}
                  />
                ) : (
                  theatre.seatingCapacity
                )}
              </td>
              <td>
                {editingId === theatre._id ? (
                  <input
                    name="ticketPrice"
                    value={editData?.ticketPrice || ''}
                    onChange={handleInputChange}
                    className={styles.editCapacity}
                  />
                ) : (
                  theatre.ticketPrice
                )}
              </td>
              <td>
                {editingId === theatre._id ? (
                  <CustomButton label="Save" onClick={() => handleSave(theatre._id)} />
                ) : (
                  <CustomButton label="Edit" onClick={() => handleEdit(theatre)} />
                )}
                <CustomButton label="Delete" onClick={() => handleDelete(theatre._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowTheatre;
