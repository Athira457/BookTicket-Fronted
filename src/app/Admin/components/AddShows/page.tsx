// show timing registration page

import React, { useState } from 'react';
import axios from 'axios';
import CustomInput from '@/Utils/customInput';
import CustomButton from '@/Utils/customButton';
import styles from './shows.module.css';

const availableShowTimes = ['10:00 AM', '12:00 PM', '03:00 PM', '06:00 PM', '09:00 PM'];
const Shows = () => {
  const [showsData, setShowsData] = useState({
    theatre: '',
    movie: '',
    date: '',
    time: [] as string[],
    seats: '',
    ticketPrice: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShowsData({ ...showsData, [name]: value });
  };


  // Handle checkbox selection for show times
  const handleCheckboxChange = (times: string) => {
    setShowsData((prevState) => ({
      ...prevState,
      time: prevState.time.includes(times)
        ? prevState.time.filter((t) => t !== times) 
        : [...prevState.time, times], 
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    e.preventDefault();
    try {
      const res = await axios.post(`${serverUrl}/showTimings`, showsData);
      console.log(res.data);
       alert('Show time Registered Successfully');
      setShowsData({
        theatre: '',
        movie: '',
        date: '',
        time: [],
        seats:'',
        ticketPrice: '',
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
          label="Theatre *"
          inputType="text"
          name="theatre"
          value={showsData.theatre}
          onChange={handleInputChange}
        />
        <CustomInput
          label="Movie *"
          inputType="text"
          name="movie"
          value={showsData.movie}
          onChange={handleInputChange}
        />
        <CustomInput
          label="Date *"
          inputType="date"
          name="date"
          value={showsData.date}
          onChange={handleInputChange}
        />
         {/* Checkboxes for selecting multiple show times */}
         <div className={styles.formGroup}>
          <label className={styles.label}>Show Times *</label>
          <div className={styles.checkboxGroup}>
            {availableShowTimes.map((times) => (
              <label key={times} className={styles.timeLabel}>
                <input
                  type="checkbox"
                  name="times"
                  value={times}
                  checked={showsData.time.includes(times)}
                  onChange={() => handleCheckboxChange(times)}
                />
                {times}
              </label>
            ))}
          </div>
        </div>
        <CustomInput
          label="Seats *"
          inputType="text"
          name="seats"
          value={showsData.seats}
          onChange={handleInputChange}
        />
         <CustomInput
          label="Ticket Price *"
          inputType="text"
          name="ticketPrice"
          value={showsData.ticketPrice}
          onChange={handleInputChange}
        />
        <CustomButton label="Register Show Time" />
      </form>
    </div>
  );
};

export default Shows;
