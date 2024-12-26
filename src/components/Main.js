import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDriverInfo } from "../services/api";
import "../css/Main.css";

function Main({ token }) {
  const [driverInfo, setDriverInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDriverInfo = async () => {
      try {
        const response = await getDriverInfo(token);
        setDriverInfo(response.data.object);
      } catch (error) {
        console.error("Failed to fetch driver info", error);
        alert("Failed to fetch driver information. Please try again.");
      }
    };

    fetchDriverInfo();
  }, [token]);

  const Main_Logout = () => {
    localStorage.removeItem("jwt");
    alert("로그아웃 성공!");
    navigate("/");
  };

  return (
    <div id="Main_container">
      <h1 id="Main_title">Main Page</h1>
      {driverInfo ? (
        <div id="Main_info">
          <p id="Main_driverName"><strong>Driver Name: {driverInfo.driverName}</strong></p>
          <p id="Main_routeName"><strong>Route Name: {driverInfo.routeName}</strong></p>
          <p id="Main_busNumber"><strong>Bus Number: {driverInfo.busNumber}</strong></p>
        </div>
      ) : (
        <p id="Main_loading">Loading driver information...</p>
      )}
      <button id="Main_logoutButton" onClick={Main_Logout}>Logout</button>
      <button id="Main_busButton" onClick={() => navigate("/dispatch")}>Bus</button>
    </div>
  );
}

export default Main;
