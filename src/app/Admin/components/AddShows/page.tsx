// show timing registration page

import React, { useState } from 'react';
import axios from 'axios';
import CustomInput from '@/Utils/customInput';
import CustomButton from '@/Utils/customButton';
import styles from './shows.module.css';

const Shows = () => {
  const [showsData, setShowsData] = useState({
    theatre: '',
    movie: '',
    date: '',
    time: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShowsData({ ...showsData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/showTimings', showsData);
      console.log(res.data);
       alert('Show time Registered Successfully');
      setShowsData({
        theatre: '',
        movie: '',
        date: '',
        time: '',
      });
    } catch (error) {
      console.error('Error registering Show timing:', error);
      alert('Show time Registration Failed');
    }
  };

  return (
    <div className={styles.showContainer}>
      <h1 className={styles.title}>Show Time Registration</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <CustomInput
          label="Theatre"
          inputType="text"
          name="theatre"
          value={showsData.theatre}
          onChange={handleInputChange}
        />
        <CustomInput
          label="Movie"
          inputType="text"
          name="movie"
          value={showsData.movie}
          onChange={handleInputChange}
        />
        <CustomInput
          label="Date"
          inputType="date"
          name="date"
          value={showsData.date}
          onChange={handleInputChange}
        />
        <CustomInput
          label="Time"
          inputType="time"
          name="time"
          value={showsData.time}
          onChange={handleInputChange}
        />
        <CustomButton label="Register Show Time" />
      </form>
    </div>
  );
};

export default Shows;
