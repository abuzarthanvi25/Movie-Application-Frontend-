import React from "react";
import Navbar from "../components/Navbar";
import "../App.css";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Typography, Container, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Box } from "@mui/system";
import MovieComponent from "../components/MovieComponent";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

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
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user.sub.split("|")[1].toString());
  // console.log(user);
  let navigate = useNavigate();
  let movieList = [
    {
      Title: "The Avengers",
      Year: "2012",
      imdbID: "tt0848228",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    },
    {
      Title: "Avengers: Endgame",
      Year: "2019",
      imdbID: "tt4154796",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
    },
    {
      Title: "Avengers: Infinity War",
      Year: "2018",
      imdbID: "tt4154756",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg",
    },
    {
      Title: "Avengers: Age of Ultron",
      Year: "2015",
      imdbID: "tt2395427",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg",
    },
    {
      Title: "The Avengers",
      Year: "1998",
      imdbID: "tt0118661",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYWE1NTdjOWQtYTQ2Ny00Nzc5LWExYzMtNmRlOThmOTE2N2I4XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg",
    },
    {
      Title: "The Avengers: Earth's Mightiest Heroes",
      Year: "2010–2012",
      imdbID: "tt1626038",
      Type: "series",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYzA4ZjVhYzctZmI0NC00ZmIxLWFmYTgtOGIxMDYxODhmMGQ2XkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg",
    },
    {
      Title: "Ultimate Avengers: The Movie",
      Year: "2006",
      imdbID: "tt0491703",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTYyMjk0NTMwMl5BMl5BanBnXkFtZTgwNzY0NjAwNzE@._V1_SX300.jpg",
    },
    {
      Title: "Ultimate Avengers II",
      Year: "2006",
      imdbID: "tt0803093",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZjI3MTI5ZTYtZmNmNy00OGZmLTlhNWMtNjZiYmYzNDhlOGRkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
    },
    {
      Title: "The Avengers",
      Year: "1961–1969",
      imdbID: "tt0054518",
      Type: "series",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZWQwZTdjMDUtNTY1YS00MDI0LWFkNjYtZDA4MDdmZjdlMDRlXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg",
    },
    {
      Title: "Avengers Assemble",
      Year: "2012–2019",
      imdbID: "tt2455546",
      Type: "series",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTY0NTUyMDQwOV5BMl5BanBnXkFtZTgwNjAwMTA0MDE@._V1_SX300.jpg",
    },
  ];
  return (
    <>
      <Navbar />

      {isAuthenticated && !isLoading ? (
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
              {user ? user.nickname + "'S" : ""} WATCHLIST
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <SearchBar>
              <SearchIcon color="warning" />
              <SearchInput placeholder="Search Watchlist..." />
            </SearchBar>
            <Button
              variant="contained"
              color="warning"
              sx={{
                padding: "5px 10px",
                fontSize: "18px",
                marginBotton: "60px",
              }}
            >
              Add to watchlist
            </Button>
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
            {movieList
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
