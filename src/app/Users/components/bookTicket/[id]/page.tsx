"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "../../header/page";
import styles from './book.module.css';

interface Show {
  theatre: string;
  date: string;
  time: string[];
  seats: string;
  ticketPrice: string;
}

interface Movie {
  _id: string;
  name: string;
}

interface MovieDetailsProps {
  params: { id: string };
}

const ShowDetails: React.FC<MovieDetailsProps> = ({ params }) => {
  const { id } = params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [shows, setShows] = useState<Show[]>([]);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null); 
  const [selectedTime, setSelectedTime] = useState<string | null>(null); 
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]); 
  const [bookingDate, setBookingDate] = useState<string>(''); 
  const router = useRouter();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  // Calculate the total price based on selected seats
  const totalPrice = selectedShow && selectedShow.ticketPrice 
    ? selectedSeats.length * parseFloat(selectedShow.ticketPrice)
    : 0;

  useEffect(() => {
    if (id) {
      const fetchMovieAndShowDetails = async () => {
        try {
          // Fetch movie and show details from your backend
          const response = await axios.get(`${serverUrl}/details/${id}`);
          
          const { movieTitle, shows } = response.data;
          setMovie({
            _id: id as string,
            name: movieTitle,
          });

          setShows(shows);
        } catch (error) {
          console.error('Error fetching details:', error);
        }
      };

      fetchMovieAndShowDetails();
    }
  }, [id]);

  // Handle show selection 
  const handleShowSelect = (show: Show) => {
    setSelectedShow(show);
    setSelectedTime(null); 
    setSelectedSeats([]); 
  };

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setSelectedSeats([]); 
  };

  // Handle seat selection
  const handleSeatSelect = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber)); 
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookingDate(event.target.value);
  };

  const handleBookNow = async () => {
    if (selectedShow && selectedTime && selectedSeats.length > 0 && bookingDate) {
      try {
        const bookingData = {
          movieName: movie?.name,
          theatre: selectedShow.theatre,
          seats: selectedSeats,
          time: selectedTime,
          date: bookingDate,
          totalPrice,
        };

        const res = await axios.post(`${serverUrl}/book`, bookingData);
        console.log("booking details uploaded",res)
         router.push('/Users/components/confirmTicket');
      } catch (error) {
        console.error('Error booking ticket:', error);
      }
    } else {
      alert("something went wrong")
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <Header/>
      <div className={styles.showDetailContainer}>
        <div className={styles.movieInfo}>
          <h1>{movie.name}</h1>
          {shows.length > 0 ? (
            <ul className={styles.list}>
              {shows.map((show, index) => (
                <li 
                  key={index} 
                  className={`${styles.item} ${selectedShow === show ? styles.selectedShow : ''}`} 
                  onClick={() => handleShowSelect(show)}
                >
                  <h2 className={styles.title}>Showtimes:</h2>
                  <strong>Theatre:</strong> {show.theatre} <br />
                  <strong>Seats Available:</strong> {show.seats}<br />
                  <strong>Ticket Price:</strong> {show.ticketPrice}
                </li>
              ))}
            </ul>
          ) : (
            <p>No shows available for this movie.</p>
          )}

          {selectedShow && (
            <div className={styles.timeSelection}>
              <h2>Select a Time for {selectedShow.theatre}</h2>
              <div className={styles.timeGrid}>
                {selectedShow.time.map((time, index) => (
                  <div 
                    key={index}
                    className={`${styles.timeBox} ${selectedTime === time ? styles.selectedTime : ''}`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedShow && selectedTime && (
            <div className={styles.seatsContainer}>
              <h2>Select Seats for {selectedShow.theatre} - {selectedTime}</h2>
              <div className={styles.seatGrid}>
                {[...Array(parseInt(selectedShow.seats))].map((_, index) => {
                  const seatNumber = index + 1;
                  const isSelected = selectedSeats.includes(seatNumber);
                  return (
                    <div
                      key={seatNumber}
                      className={`${styles.seatBox} ${isSelected ? styles.selectedSeat : ''}`}
                      onClick={() => handleSeatSelect(seatNumber)}
                    >
                      {seatNumber}
                    </div>
                  );
                })}
              </div>
              <div className={styles.selectedSeats}>
                <h3>Selected Seats:</h3>
                <ul className={styles.selectedUl}>
                  {selectedSeats.map((seat) => (
                    <li key={seat}>Seat {seat}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {selectedSeats.length > 0 && (
            <div>
              <label htmlFor="bookingDate">Select Booking Date:</label>
              <input
                type="date"
                id="bookingDate"
                value={bookingDate}
                onChange={handleDateChange}
                className={styles.dateInput}
                min={new Date().toISOString().split('T')[0]}
              /><br/>
              <button className={styles.button} onClick={handleBookNow}>
                Book Now
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
