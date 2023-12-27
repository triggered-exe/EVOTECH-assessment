import React, {useState, useEffect} from 'react';
import styles from './Surveys.module.css';
import Pagination from '../Pagination/Pagination';
import axios from 'axios';

const Surveys = () => {
    const [surveys, setSurveys] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    console.log(process.env.REACT_APP_SERVER_URL);
    const getSurveys = () => {
       const serverUrl = process.env.REACT_APP_SERVER_URL;
        axios.get(`${serverUrl}/api/surveys?page=${currentPage}&limit=10`,{withCredentials: true})
        .then(res => {
          console.log(res.data)
          setSurveys(res.data.surveys); // Update surveys state with the 'surveys' array from the response
          setTotalPages(res.data.totalPages); // Update totalPages state
        })
        .catch(err => console.log(err))
    }

    useEffect(()=>{
        getSurveys();
    },[currentPage])

    const handlePageChange = (page) => {
      console.log(page)
      setCurrentPage(page);
    };

      // Function to handle showing survey details
  const showSurveyDetails = (survey) => {
    setSelectedSurvey(survey);
    setShowDetails(true);
  };

  // Function to handle hiding survey details
  const hideSurveyDetails = () => {
    setShowDetails(false);
    setSelectedSurvey(null);
  };


  
  return (
    <div className={styles.container}>
      <div className={styles.surveys}>
        {surveys.map((survey) => (
          <div key={survey.id} className={styles.surveyItem}>
            <p className={styles.surveyInfo}>Name: {survey.name}</p>
            <p className={styles.surveyInfo}>Email: {survey.email}</p>
            {/* Add other details to display */}
            <button onClick={() => showSurveyDetails(survey)}>View Details</button>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Modal to show survey details */}
      {showDetails && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={hideSurveyDetails}>&times;</span>
            {selectedSurvey && (
              <div className={styles.details}>
                <p><strong>Name:</strong> {selectedSurvey.name}</p>
                <p><strong>Email:</strong> {selectedSurvey.email}</p>
                <p><strong>Gender:</strong> {selectedSurvey.gender}</p>
                <p><strong>Nationality:</strong> {selectedSurvey.nationality}</p>
                <p><strong>Message:</strong> {selectedSurvey.message}</p>
                <p><strong>Address:</strong> {selectedSurvey.address}</p>
                <p><strong>PhoneNumber:</strong> {selectedSurvey.phoneNumber}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Surveys;