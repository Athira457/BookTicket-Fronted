// movie register page
"use client"
import React from 'react';
import styles from './movies.module.css';
import { useState } from "react";
import axios from "axios";
import CustomInput from '@/Utils/customInput';
import CustomButton from '@/Utils/customButton';

export default function Movies() {
  const [movieData, setMovieData] = useState({
    name: "",
    genre: "",
    languages: [] as string[],
    release: "",
    duration: "",
    certification: "",
    synopsis: "",});
  const [poster, SetPoster] = useState<File | null>(null);

  const handleCheckboxChange = (language: string) => {
    setMovieData((prevState) => ({
      ...prevState,
      languages: prevState.languages.includes(language)
        ? prevState.languages.filter((lang) => lang !== language)
        : [...prevState.languages, language]
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMovieData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', movieData.name);
    formData.append('genre', movieData.genre);
    formData.append('languages', movieData.languages.join(', '));
    formData.append('release', movieData.release);
    formData.append('duration', movieData.duration);
    formData.append('certification', movieData.certification);
    formData.append('synopsis', movieData.synopsis);
    if (poster) {
      formData.append('poster', poster);
    }

    try{
      const res = await axios.post("http://localhost:5000/movies", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
        console.log(res);
        alert("New Movie Added");
        setMovieData({
          name: "",
          genre: "",
          languages: [],
          release: "",
          duration: "",
          certification: "",
          synopsis: "",
        });
        SetPoster(null);

      } catch (error) {
        console.error("Axios error");
        alert("Registration failed")
  }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Movie Registration</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
      <CustomInput
          label="Title"
          inputType="text"
          name="name"
          value={movieData.name}
          onChange={handleInputChange}
        />
       <CustomInput
          label="Genre"
          inputType="text"
          name="genre"
          value={movieData.genre}
          onChange={handleInputChange}
        />

        <div className={styles.formGroup}>
          <label className={styles.label}>Languages</label>
          <div className={styles.checkboxGroup}>
            {["English", "Hindi", "Malayalam", "Tamil", "Telugu"].map((language) => (
              <label key={language} className={styles.languageLabel}>
                <input
                  type="checkbox"
                  value={language}
                  checked={movieData.languages.includes(language)}
                  onChange={() => handleCheckboxChange(language)}
                />
                {language}
              </label>
            ))}
          </div>
        </div>
        
        <CustomInput
          label="Release Date"
          inputType="date"
          name="release"
          value={movieData.release}
          onChange={handleInputChange}
        />
        <CustomInput
          label="Duration"
          inputType="text"
          name="duration"
          value={movieData.duration}
          onChange={handleInputChange}
        />
        <CustomInput
          label="Certification"
          inputType="text"
          name="certification"
          value={movieData.certification}
          onChange={handleInputChange}
        />
        <CustomInput
          label="Synopsis"
          inputType="textarea"
          name="synopsis"
          value={movieData.synopsis}
          onChange={handleInputChange}
        />

        <div className={styles.formGroup}>
          <label htmlFor="poster" className={styles.label}>Movie Poster :</label>
          <input type="file" id="poster" className={styles.fileInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length > 0) {
                SetPoster(e.target.files[0]); 
                }
                }} />
        </div>
        
        <CustomButton label="Register Movie" />
      </form>
    </div>
  );
}


