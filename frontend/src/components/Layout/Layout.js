import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { useNavigate } from 'react-router-dom';

const Layout = ({isLoggedIn, handleLogout}) => {
    const navigate = useNavigate();


  return (
    <>
      <div className={styles.layoutContainer} onClick={()=>navigate("/")}>
        <span>SURVEYS</span>
        {isLoggedIn ? <button onClick={handleLogout}>Logout</button> : null}
        
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
