import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { DashboardMap } from "./components/map/DashboardMap";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";

function App() {
  let geolocation;

  let MINUTE_MS = 60000;

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {}, MINUTE_MS);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      geolocation = navigator.geolocation.watchPosition((position) => {
        sessionStorage.setItem(
          "currentLocation",
          JSON.stringify({
            lat: position.coords.latitude,
            long: position.coords.longitude,
            accuracy: position.coords.accuracy,
          })
        );
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<DashboardMap />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
