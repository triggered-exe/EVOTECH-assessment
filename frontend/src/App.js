import React, { useEffect, useState } from 'react';
import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useCookies } from 'react-cookie';
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Survey from './components/Surveys/Surveys';
import SurveyForm from './components/SurveyForm/SurveyForm';

function App() {

  const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const protect = (Component) => {
      if (isLoggedIn) {
        return Component;
      } else {
        return <Login />;
      }
    };




  useEffect(() => {
    const authToken = cookies.token;
    if (authToken) {
      // User is logged in
      setIsLoggedIn(true);
      console.log('user logged in'); 
    } else {
      // User is not logged in
      setIsLoggedIn(false);
      console.log('user not logged in');
    }
  }, [cookies.authToken]);


  const handleLogout = () => {
    // Remove the 'token' cookie to log the user out
    removeCookie('token');
    setIsLoggedIn(false); // Update the state to reflect logged out status
    console.log('User logged out');
  };


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} >
        <Route index element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        {/* <Route path="/Survey" element={<Survey />} /> */}
        <Route path="/Survey" element={protect(<Survey />)} />
        <Route path="/SurveyForm" element={<SurveyForm />} />
      </Route>
    )
  );


  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
