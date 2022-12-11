import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../screens/LandingPage";
import FullMovieInfo from "../screens/FullMovieInfo";
import WatchList from "../screens/WatchList";
import AdminDashboard from "../screens/AdminDashboard";

function AppRouter() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="dashboard/*" element={<AdminDashboard />} />
          <Route path="movie" element={<FullMovieInfo />} />
          <Route path="watchlist" element={<WatchList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
