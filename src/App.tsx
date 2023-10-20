import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { updateHunterLocation } from "./API";
import { UserLocation } from "./types";
import { MapOverview } from "./pages/MapOverview";

function App() {
  let MINUTE_MS = 20000;

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("retrieved location");
      getLocation();
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!(Object.keys(user).length === 0)) {
        const currentLocation: UserLocation =
          JSON.parse(localStorage.getItem("currentLocation")!) || [];
        updateHunterLocation(
          currentLocation.lat,
          currentLocation.long,
          user.id
        );
      }
    }, MINUTE_MS);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          window.localStorage.setItem(
            "currentLocation",
            JSON.stringify({
              lat: position.coords.latitude,
              long: position.coords.longitude,
              accuracy: position.coords.accuracy,
            })
          );
          window.localStorage.setItem(
            "lastLocationUpdated",
            JSON.stringify({
              updated_At: position.timestamp,
            })
          );
          window.localStorage.setItem(
            "isLocationBlocked",
            JSON.stringify({ isLocationBlocked: false })
          );
        },
        (error) => {
          console.log(error);
          window.localStorage.setItem(
            "isLocationBlocked",
            JSON.stringify({ isLocationBlocked: true })
          );
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapOverview />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
