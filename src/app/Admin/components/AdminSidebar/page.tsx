"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './Sidebar.module.css';
import Movies from '../AddMovies/page';
import ManageMovies from '../manageMovies/page';
import Theatres from '../AddTheatre/page';
import ManageTheatres from '../manageTheatre/page';
import Shows from '../AddShows/page';
import  ManageShows from '../manageShows/page'

export default function Sidebar() {
  // State to toggle the dropdown
  const [isMovieDropdownOpen, setIsMovieDropdownOpen] = useState(false);
  const [isTheatreDropdownOpen, setIsTheatreDropdownOpen] = useState(false);
  const [isShowDropdownOpen, setIsShowDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('Default');

  const toggleMovieDropdown = () => {
    setIsMovieDropdownOpen(!isMovieDropdownOpen);
  };
  const toggleTheatreDropdown = () =>{
    setIsTheatreDropdownOpen(!isTheatreDropdownOpen);
  }
  const toggleShowDropdown = () =>{
    setIsShowDropdownOpen(!isShowDropdownOpen);
  }

  return (
      <div className={styles.container}>
        <nav className={styles.sidebar}>
        <h2 className={styles.logo}>Admin</h2>
          <ul>
            <li>
              {/* Toggle for the movie dropdown */}
              <button className={styles.dropdownToggle} onClick={toggleMovieDropdown}>
                Movies
              </button>
              {isMovieDropdownOpen && (
                <ul className={styles.dropdownMenu}>
                  <li>
                  <button onClick={() => setActiveTab('Add Movie')}>Add Movie</button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('Manage Movies')}>Manage Movies</button>
                </li>
                </ul>
              )}
            </li>
            <li>
              <button className={styles.dropdownToggle} onClick={toggleTheatreDropdown}>
                Theatres
              </button>
              {isTheatreDropdownOpen && (
                <ul className={styles.dropdownMenu}>
                <li>
                    <button onClick={() => setActiveTab('Add Theatres')}>Add Theatres</button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('Manage Theatres')}>Manage Theatres</button>
                </li>
                </ul>
              )}
            </li>
            <li>
              <button className={styles.dropdownToggle} onClick={toggleShowDropdown}>
                Show Timing
              </button>
              {isShowDropdownOpen && (
                <ul className={styles.dropdownMenu}>
                <li>
                    <button onClick={() => setActiveTab('Add Show Time')}>Add Show Time</button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('Manage Show Time')}>Manage Show Time</button>
                </li>
              </ul>
              )}
            </li>
            <li>
              <Link href="/Admin/components/AdminSidebar">View Bookings</Link>
            </li>
          </ul>
        </nav>
        {/* Content for Active Tab */}
      <div className={styles.tabContent}>
        {activeTab === 'Add Movie' && <Movies />}
        {activeTab === 'Manage Movies' && <ManageMovies/>}
        {activeTab === 'Add Theatres' && <Theatres />}
        {activeTab === 'Manage Theatres' && <ManageTheatres />}
        {activeTab === 'Add Show Time' && <Shows />}
        {activeTab === 'Manage Show Time' && <ManageShows />}
        {activeTab === 'View Bookings' && <div>View Bookings Content</div>}
        {activeTab === 'View Reviews' && <div>View Reviews Content</div>}
        {activeTab === 'Default' && (
          <div className={styles.defaultContent}>
            <h1 className={styles.title}>Welcome to the Admin Dashboard</h1>
            <div className={styles.grid}>
              <div className={styles.box} onClick={() => setActiveTab('Add Movie')}>
                <h3>Movies</h3>
              </div>
              <div className={styles.box} onClick={() => setActiveTab('Add Theatres')}>
                <h3>Theatres</h3>
              </div>
              <div className={styles.box} onClick={() => setActiveTab('Add Show Time')}>
                <h3>Show Time</h3>
              </div>
              <div className={styles.box} onClick={() => setActiveTab('View Bookings')}>
                <h3>Booking Details</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
