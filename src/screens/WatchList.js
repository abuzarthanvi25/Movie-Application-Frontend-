import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../App.css";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Typography, Container, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Box } from "@mui/system";
import MovieComponent from "../components/MovieComponent";
import { useNavigate, useSearchParams } from "react-router-dom";
import { checkUser, getCurrentUser } from "../config/firebasemethods";
import axios from "axios";
import { useSelector } from "react-redux";

const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 0px 0px 10px;
  background-color: white;
  border-radius: 8px 0px 0px 8px;
  margin-left: 20px;
  width: auto;
  align-items: center;
`;

const SearchInput = styled.input`
  color: black;
  width: 20ch;
  font-size: 18px;
  font-weight: bold;
  border: none;
  outline: none;
  background-color: white;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direcrtion: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`;

function WatchList() {
  // const { user, isAuthenticated, isLoading } = useAuth0();
  const [user, setUser] = useState(null);
  const [nick, setNick] = useState("");
  const userId = useSelector((state) => state.user[0]._id);
  console.log(userId);
  const [movieList, setMovieList] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setUser(user);
        setNick(user.email.split("@")[0].toString().toUpperCase());
      })
      .catch((err) => {
        console.log(err);
      });

    checkUser()
      .then(() => {})
      .catch(() => {
        navigate("/");
      });

    getUserData();
  }, []);

  const getUserData = () => {
    axios
      .get(`http://localhost:5000/watchlist/${userId}`)
      .then((res) => {
        console.log(res);
        setMovieList(res.data.watch_list);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar />

      {user ? (
        <Container maxWidth="lg">
          <Box
            className="watchListHeading"
            style={{
              backgroundColor: "#e4a843",
              padding: "18px",
              marginBottom: "20px",
            }}
          >
            <Typography
              variant="h2"
              style={{ color: "#040404", fontWeight: "bolder" }}
            >
              {user ? nick + "'S" : ""} WATCHLIST
            </Typography>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                color: "#006DB6",
                fontSize: "20px",
              }}
            >
              <Typography fontWeight="800" gutterBottom></Typography>
              <LockIcon />
              PRIVATE
            </Box>
          </Box>

          <MovieListContainer
            style={{
              color: "white",
              border: "1px solid white",
              padding: "30px 10px",
              display: "flex",
              flexWrap: "wrap",
            }}
            gutterBottom
          >
            {movieList && movieList.length > 0
              ? movieList.map((e, i) => <MovieComponent key={i} movie={e} />)
              : null}
          </MovieListContainer>
        </Container>
      ) : (
        navigate("/")
      )}
    </>
  );
}

export default WatchList;
