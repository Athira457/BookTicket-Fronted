"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './confirm.module.css'; 
import Header from '../header/page';

interface Booking {
  movieName: string;
  theatre: string;
  seats: string[];
  time: string;
  date: string;
  totalPrice: number;
}

// Razorpay-specific type declarations
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    email: string;
    contact: string;
  };
}

interface RazorpayInstance {
  open(): void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

const ConfirmationPage: React.FC = () => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`${serverUrl}/confirm-book`); 
        setBooking(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching booking:', error);
        setLoading(false);
      }
    };

    fetchBooking();
  }, []);

  useEffect(() => {
    // Fetch the booking details
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`${serverUrl}/create-order`); 
        setBooking(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching booking:', error);
        setLoading(false);
      }
    };

    fetchBooking();

    // Dynamically add the Razorpay script
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    if (!booking) return;

    const options: RazorpayOptions = {
      key: razorpayKeyId as string,
      amount: booking.totalPrice * 100,
      currency: 'INR',
      name: 'Movie Booking',
      description: `Booking for ${booking.movieName}`,
      handler: function (response: RazorpayResponse) {
        console.log(response); 
      },
      prefill: {
        email: 'testuser@example.com',
        contact: '9999999999',
      },
    };

    const rzp = new window.Razorpay(options); 
    rzp.open();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!booking) {
    return <div>No booking found.</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <Header/>
        <div className={styles.confirmationContainer}>
        <h1 className={styles.title}>Booking Confirmation</h1>
        <div className={styles.bookingDetails}>
            <p><strong>Movie Name:</strong> {booking.movieName}</p>
            <p><strong>Theatre:</strong> {booking.theatre}</p>
            <p><strong>Seats:</strong> {booking.seats.join(', ')}</p>
            <p><strong>Show Time:</strong> {booking.time}</p>
            <p><strong>Booking Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
            <p><strong>Total Price:</strong> Rs {booking.totalPrice}</p>
        </div>
        <button className={styles.payButton} onClick={handlePayment}>
            Pay Rs {booking.totalPrice.toFixed(2)}
        </button>
        </div>
    </div>
  );
};

export default ConfirmationPage;
