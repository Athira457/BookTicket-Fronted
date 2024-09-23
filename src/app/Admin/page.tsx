// login page
"use client";
import React, { useState } from 'react';
import axios from 'axios';
import {useRouter} from "next/navigation";
import CustomInput from '../../Utils/customInput';
import CustomButton from '../../Utils/customButton';
import styles from './login.module.css';
import Link from 'next/link';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });   
   
      if (response.data.success) {
          router.push('Admin/components/AdminSidebar');
      } else {
        setErrorMessage('Login failed');
      }
    } catch (error) {
      setErrorMessage('Error logging in, please try again.');
    }
  };

  return (
    <div className={styles.loginPage}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <CustomInput
          label="Email"
          inputType="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <CustomInput
          label="Password"
          inputType="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <CustomButton label="Login"/>
        <Link href="../signUp" className={styles.link}>Do not have an account</Link>
      </form>
    </div>
  );
};

export default Login;
