import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({isLoggedIn, setIsLoggedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      // Redirect to the home page
      navigate('/');
    }
  },[isLoggedIn])

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const serverUrl = process.env.REACT_APP_SERVER_URL;
        const response = await axios.post(`${serverUrl}/api/admin/login`, {
          email: email,
          password: password
        }, { withCredentials: true });
        console.log(response.data); // Assuming the response contains the login status or token
        // fetch('http://localhost:8000/api/admin/login', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ email, password }),
        //     credentials: 'include' // Include cookies in the request
        // }).then(response=>response.json())
        // .then(data=>{
        //     console.log(data);
        // })

        setIsLoggedIn(true);
        
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" className={styles.input} value={email} onChange={handleEmailChange} required/>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" className={styles.input} value={password} onChange={handlePasswordChange} required/>
        </div>
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Login;
