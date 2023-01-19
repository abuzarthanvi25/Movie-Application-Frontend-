import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../screens/LandingPage";
import FullMovieInfo from "../screens/FullMovieInfo";
import WatchList from "../screens/WatchList";
import AdminDashboard from "../screens/AdminDashboard";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";

function AppRouter() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="dashboard/*" element={<AdminDashboard />} />
          <Route path="movie" element={<FullMovieInfo />} />
          <Route path="watchlist" element={<WatchList />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
