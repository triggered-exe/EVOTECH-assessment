import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

const Home = ({isLoggedIn}) => {    
  const navigate = useNavigate();

  return (
    <div className={styles.homeContainer}>
      {
        isLoggedIn ? (
          <>
          <div className={styles.box} onClick={() => navigate('/submissions')}>
                View All Surveys
            </div>
          </>
        ) : (
          <>
            <div className={styles.box} onClick={() => navigate('/login')}>
                Admin Dashboard
            </div>
            <div className={styles.box} onClick={() => navigate('/SurveyForm')}>
                Submit a Survey
            </div>
          </>
        )
      }
    </div>
  )
}

export default Home
