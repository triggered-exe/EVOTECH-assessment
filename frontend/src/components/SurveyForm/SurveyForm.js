import React, { useState } from 'react';
import styles from './SurveyForm.module.css';
import axios from 'axios';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    nationality: '',
    email: '',
    phoneNumber: '',
    address: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit =  async (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    axios.post(`${serverUrl}/api/surveys`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(function (response) {
          console.log(response.data);
          alert("Thank you for your feedback!");
        })
        .catch(function (error) {
          console
          .log(error);
        });
        
    console.log(formData);
    // Reset form after submission
    setFormData({
      name: '',
      gender: '',
      nationality: '',
      email: '',
      phoneNumber: '',
      address: '',
      message: ''
    });
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}  required/>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="nationality">Nationality:</label>
          <input type="text" id="nationality" name="nationality" value={formData.nationality} onChange={handleChange}  required/>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}  required/>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}  required/>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange}  required/>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange}  required/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SurveyForm;
