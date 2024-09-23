"use client";
import  styles from './header.module.css'
import React, { useState } from 'react';

const Header: React.FC = () => {
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

    const handleSignInClick = () => {
      setIsLoginFormVisible(!isLoginFormVisible); 
    };

    const handleLogout = () => {      
      console.log('User logged out');
    };

  return(
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <span className={styles.appName}>Movie Booking</span>
        </div>


        {/* profile- Hover for Pop-up */}
        <div className={styles.loginContainer}>
          <button onClick={handleSignInClick} className={styles.signInButton}>
            {isLoginFormVisible ? 'Close' : 'Profile'}
          </button>

          {isLoginFormVisible && (
            <div className={styles.loginPopup}>
              <h3>Profile</h3>     
              <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
            </div>
          )}
        </div>
    </header>
  );
}
export default Header;