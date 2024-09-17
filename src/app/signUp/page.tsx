"use client";
import React, { useState } from 'react';
import axios from 'axios';
import CustomInput from '../../Utils/customInput';
import CustomButton from '../../Utils/customButton';
import Verify from "../Verify/page"; 
import styles from './SignUp.module.css';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const SignUp: React.FC = () => {
  const [uname, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('user');
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/signup', { uname, email, password, phone, role });
      if (response.data.success) {
        setIsRegistered(true);
        alert("successfully registered"); 
      } else {
        setErrorMessage('Sign-up failed');
      }
    } catch (error) {
      setErrorMessage('Error signing up, please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <>
      {!isRegistered ? (
        <div className={styles.signUpPage}>
          <h1 className={styles.title}>Sign Up</h1>
          <form onSubmit={handleSubmit} className={styles.signUpForm}>
            <CustomInput
              label="Name"
              inputType="text"
              name="uname"
              value={uname}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
            />
            <CustomInput
              label="Email"
              inputType="email"
              name="email"
              value={email}
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
            <CustomInput
              label="Confirm Password"
              inputType="password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
            <CustomInput
              label="Phone Number"
              inputType="text"
              value={phone}
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
            />
            <div className={styles.roleSelect}>
              <label className={styles.roleLabel}>
                <input
                  type="radio"
                  value="user"
                  checked={role === 'user'}
                  onChange={() => setRole('user')}
                  className={styles.roleInput}
                />
                User
              </label>
              <label className={styles.roleLabel}>
                <input
                  type="radio"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                  className={styles.roleInput}
                />
                Admin
              </label>
            </div>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <CustomButton label="Sign Up" />
            <Link href="../Login" className={styles.link}>Already have an account</Link>
            <p className={styles.paragraph}>OR</p>
            <CustomButton label="sign in with google" onClick={handleGoogleSignIn} />
          </form>
        </div>
      ) : (
        <Verify email={email} />  // Passing the email to Verify component
      )}
    </>
  );
};

export default SignUp;
