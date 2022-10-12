import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { DashboardMap } from "./components/map/DashboardMap";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";

function App() {
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
