import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../App.css";
import styled from "styled-components";
import { Typography, Container } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Box } from "@mui/system";
import MovieComponent from "../components/MovieComponent";
import { useNavigate } from "react-router-dom";
import { checkUser, getCurrentUser } from "../config/firebasemethods";
import axios from "axios";
import { useSelector } from "react-redux";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

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
  const [movieList, setMovieList] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const userData = useSelector((state) => state.user[0]);
  let navigate = useNavigate();

  const patchApiCall = () => {
    axios
      .patch(`http://localhost:5000/watchlist/${userData._id}`, {
        ...userDetails,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        setUserDetails(res.data);
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
              variant="h3"
              style={{ color: "#040404", fontWeight: "bold" }}
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
            {movieList && movieList.length > 0 ? (
              movieList.map((e, i) => (
                <div style={{ position: "relative" }}>
                  <MovieComponent key={i} movie={e} />
                  <div
                    onClick={() => {
                      movieList.splice(i, 1);
                      setMovieList([...movieList]);
                      patchApiCall();
                    }}
                  >
                    <RemoveCircleIcon
                      style={{
                        marginTop: "15px",
                        color: "red",
                        position: "absolute",
                        top: "0px",
                        right: "5px",
                        cursor: "pointer",
                        opacity: "0.6",
                        fontSize: "35px",
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2">Empty</Typography>
              </div>
            )}
          </MovieListContainer>
        </Container>
      ) : (
        navigate("/")
      )}
    </>
  );
}

export default WatchList;
