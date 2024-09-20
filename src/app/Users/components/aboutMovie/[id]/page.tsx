"use client";
import React, { useEffect, useState } from 'react';
import { signIn } from "next-auth/react";
import axios from 'axios';
import Header from '../../header/page';
import styles from './about.module.css';
import { useRouter } from "next/navigation";

interface Movie {
  _id: string;
  name: string;
  poster: string;
  synopsis: string;
  genre: string;
  duration: string;
  releaseDate: string;
  certification: string;
}

interface MovieDetailsProps {
  params: { id: string };
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ params }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isSignInVisible, setSignInVisible] = useState(false);
  const [signInData, setSignInData] = useState({ email: '', phone: '', password: '' });
  const [isOtpVisible, setOtpVisible] = useState(false); // State for OTP section
  const [otpData, setOtpData] = useState({ otp: '', generated: false });
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false); 
  const [generateResponse, setGenerateResponse] = useState('');
  const { id } = params;
  const router = useRouter();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    if (id) {
      const fetchMovieDetails = async () => {
        try {
          const response = await axios.get(`${serverUrl}/movieId/${id}`);
          setMovie(response.data);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      };
      fetchMovieDetails();
    }
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${serverUrl}/login`, signInData);
      if (response.data.success) {
        // Proceed to the OTP generation step
        setSignInVisible(false);
        setOtpVisible(true);
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login error');
    }
  };

  const handleGenerateOtp = async () => {
    try {
      const response = await axios.post(`${serverUrl}/generate-otp`, { email: signInData.email });
      if (response.data=="success") {
        setOtpData({ ...otpData, generated: true });
        setGenerateResponse('OTP sent successfully');
      } else {
        setGenerateResponse('Failed to generate OTP.');
      }
    } catch (error) {
      console.error('Error generating OTP:', error);
      setGenerateResponse('Error generating OTP.');
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtpData({ ...otpData, otp: e.target.value });
  };

  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${serverUrl}/verify-otp`, { email: signInData.email, otp: otpData.otp });
      if (response.data == "OTP verified") {
        setOtpVisible(false);
        setSuccessModalVisible(true);
      } else {
        setGenerateResponse('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setGenerateResponse('OTP verification failed.');
    }
  };

  const handleModalOk = () => {
    setSuccessModalVisible(false);
    const token = sessionStorage.getItem('token');
    if (token) {
      router.push(`/Users/components/bookTicket/${movie?._id}`);
    } else {
      alert('Token not found, please log in again.');
    }
  };

  const toggleSignInPopup = () => {
    setSignInVisible(!isSignInVisible);
  };
  
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl:`/Users/components/bookTicket/${movie?._id}` }); 
  };


  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.movieDetailContainer}>
        <div className={styles.moviePoster}>
          <img
            src={`${serverUrl}/uploads/${movie.poster}`}
            alt={movie.name}
            width={400}
            height={500}
          />
        </div>
        <div className={styles.movieInfo}>
          <h1 className={styles.title}>{movie.name}</h1>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Duration:</strong> {movie.duration}</p>
          <p><strong>Certification:</strong> {movie.certification}</p>
          <p><strong>Description:</strong> {movie.synopsis}</p>
          <button className={styles.button} onClick={toggleSignInPopup}>
            Book Now
          </button>
        </div>
      </div>

      {/* Sign-in Popup */}
      {isSignInVisible && (
        <div className={styles.signInOverlay}>
          <div className={styles.signInPopup}>
            <h3>Sign In</h3>
            <form onSubmit={handleSignInSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={signInData.email}
                  onChange={handleSignInChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={signInData.phone}
                  onChange={handleSignInChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={signInData.password}
                  onChange={handleSignInChange}
                  required
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                Sign In
              </button>
              <button
                type="button"
                className={styles.submitGoogle}
                onClick={() => handleGoogleSignIn()}
              >
                Sign In with Google
              </button>
            </form>
            <button className={styles.closeButton} onClick={toggleSignInPopup}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* OTP Generation and Verification */}
      {isOtpVisible && (
        <div className={styles.otpOverlay}>
          <div className={styles.otpPopup}>
            <h3>Email OTP Verification</h3>
            {!otpData.generated ? (
              <div className={styles.otpSection}>
                <p>Click the button below to generate an OTP and send it to your email:</p>
                <button className={styles.generateOtpButton} onClick={handleGenerateOtp}>
                  Generate OTP
                </button>
                <p className={styles.message}>{generateResponse}</p>
              </div>
            ) : (
              <form onSubmit={handleVerifyOtpSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="otp">Enter OTP</label>
                  <input
                    type="text"
                    name="otp"
                    value={otpData.otp}
                    onChange={handleOtpChange}
                    required
                  />
                </div>
                <button type="submit" className={styles.submitButton}>
                  Verify OTP
                </button>
                <p className={styles.message}>{generateResponse}</p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalVisible && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Login Successful!</h3>
            <p>Press OK to continue to the booking page.</p>
            <button className={styles.okButton} onClick={handleModalOk}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
