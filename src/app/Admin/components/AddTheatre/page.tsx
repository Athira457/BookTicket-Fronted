// Theatre Registration page

import React, { useState } from 'react';
import axios from 'axios';
import CustomInput from '@/Utils/customInput';
import CustomButton from '@/Utils/customButton';
import styles from './Theatre.module.css';

const Theatres = () => {
  const [theatreData, setTheatreData] = useState({
    name: '',
    location: '',
    city: '',
    state: '',
    seatingCapacity: '',
    ticketPrice:'',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTheatreData({ ...theatreData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    e.preventDefault();
    try {
      const res = await axios.post(`${serverUrl}/theatres`, theatreData);
      console.log(res.data);
       alert('Theatre Registered Successfully');
      setTheatreData({
        name: '',
        location: '',
        city: '',
        state: '',
        seatingCapacity: '',
        ticketPrice:'',
      });
    } catch (error) {
      console.error('Error registering theatre:', error);
      alert('Theatre Registration Failed');
    }
  };

  return (
    <div className={styles.theatreContainer}>
      <h1 className={styles.title}>Theatre Registration</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <CustomInput
          label="Theatre Name"
          inputType="text"
          name="name"
          value={theatreData.name}
          onChange={handleInputChange}
        />
        <CustomInput
          label="Location"
          inputType="text"
          name="location"
          value={theatreData.location}
          onChange={handleInputChange}
        />
        <CustomInput
          label="City"
          inputType="text"
          name="city"
          value={theatreData.city}
          onChange={handleInputChange}
        />
        <CustomInput
          label="State"
          inputType="text"
          name="state"
          value={theatreData.state}
          onChange={handleInputChange}
        />
         <CustomInput
          inputType="text"
          label="Seating Capacity"
          name="seatingCapacity"
          value={theatreData.seatingCapacity}
          onChange={handleInputChange}
        />
         <CustomInput
          inputType="text"
          label="Ticket Rate"
          name="ticketPrice"
          value={theatreData.ticketPrice}
          onChange={handleInputChange}
        />
        <CustomButton label="Register Theatre" />
      </form>
    </div>
  );
};

export default Theatres;
