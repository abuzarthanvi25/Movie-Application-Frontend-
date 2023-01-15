import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../App.css";
import MovieIcon from "@mui/icons-material/Movie";
import MovieComponent from "../components/MovieComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Grid, Rating, Typography } from "@mui/material";
import { Container } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import { API_KEY } from "./LandingPage";
import axios from "axios";
import MovieInfoComponent from "../components/MovieInfoComponent";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/Navbar";

const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direcrtion: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 18px;
  justify-content: space-evenly;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  padding: 0px 30px;
  color: #f6cc38;
  padding: 10px;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  font-family: "Bebas Neue", cursive;
  cursor: pointer;
  align-items: center;
  letter-spacing: 1px;
`;

function FullMovieInfo() {
  let location = useLocation();
  let navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [similarMoviesList, setSimilarMoviesList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  let getSimilarMovies = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${location.state.id}/similar?api_key=${API_KEY}&language=en-US&page=1`
    );
    // console.log(response);
    // console.log(response.data.results);
    setSimilarMoviesList(response.data.results);
  };

  useEffect(() => {
    getSimilarMovies();
  }, []);

  return (
    <ContainerMain>
      <Navbar />

      {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )}

      <Container sx={{ padding: "20px" }} maxWidth="xl">
        <Grid spacing={6} container>
          <Grid item md={3}>
            <img
              style={{ boxShadow: "0 3px 6px 0 #555" }}
              height="440px"
              width="350px"
              src={`https://image.tmdb.org/t/p/w500${location.state.poster_path}`}
              alt="none"
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              {isAuthenticated && user && !isLoading ? (
                <Button
                  variant="contained"
                  color="warning"
                  startIcon={<AddIcon color="info" fontSize="large" />}
                  sx={{
                    padding: "10px 30px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  Add To Watchlist
                </Button>
              ) : null}
            </div>
          </Grid>
          <Grid item md={9}>
            <Typography
              variant="h3"
              gutterBottom
              style={{
                textTransform: "capitalize",
                color: "#fff",
                fontFamily: "Bebas Neue",
              }}
            >
              Title:{" "}
              <span style={{ color: "#e4a843", fontFamily: "Bebas Neue" }}>
                {location.state?.title}
              </span>
            </Typography>
            <Typography
              style={{ textTransform: "capitalize", color: "#e4a843" }}
              variant="h5"
              gutterBottom
            >
              IMDB ID: <span>{location.state?.imdb_id}</span>
            </Typography>
            <Typography
              style={{ textTransform: "capitalize", color: "#e4a843" }}
              variant="h5"
              gutterBottom
            >
              Release Date: <span>{location.state?.release_date}</span>
            </Typography>
            <Typography
              style={{ textTransform: "capitalize", color: "#e4a843" }}
              variant="h5"
              gutterBottom
            >
              Original Language:{" "}
              <span>{location.state?.original_language}</span>
            </Typography>
            <Typography
              style={{ textTransform: "capitalize", color: "#e4a843" }}
              variant="h5"
              gutterBottom
            >
              Status: <span>{location.state?.status}</span>
            </Typography>
            <Typography
              style={{ textTransform: "capitalize", color: "#e4a843" }}
              variant="h5"
              gutterBottom
            >
              Tagline: <span>{location.state?.tagline}</span>
            </Typography>
            <Typography
              style={{ textTransform: "capitalize", color: "#e4a843" }}
              variant="h5"
              gutterBottom
            >
              Runtime: <span>{location.state?.runtime} Minutes</span>
            </Typography>
            <Typography
              style={{ textTransform: "capitalize", color: "#e4a843" }}
              variant="h5"
              gutterBottom
            >
              Genres:{" "}
              <span>{location.state?.genres.map((x) => x.name) + ", "}</span>
            </Typography>
            <Typography
              style={{ textTransform: "capitalize", color: "#e4a843" }}
              variant="h5"
              gutterBottom
            >
              Plot: <span>{location.state?.overview}</span>
            </Typography>
            <Typography
              style={{ textTransform: "capitalize", color: "#e4a843" }}
              variant="h5"
              gutterBottom
            >
              Vote Count: <span>{location.state?.vote_count}</span>
            </Typography>
            <Typography
              style={{ textTransform: "capitalize", color: "#e4a843" }}
              variant="h5"
              gutterBottom
            >
              Rating:{" "}
              <div>
                <Rating
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "#E8A91D",
                    },
                  }}
                  name="half-rating-read"
                  value={parseInt(location.state?.vote_average) / 2}
                  precision={0.1}
                  readOnly
                />
              </div>
            </Typography>
            <Typography
              style={{ textTransform: "capitalize", color: "#e4a843" }}
              variant="h5"
              gutterBottom
            >
              Budget: <span>${location.state?.budget}</span>
            </Typography>
            <Typography
              style={{ textTransform: "capitalize", color: "#e4a843" }}
              variant="h5"
              gutterBottom
            >
              BoxOffice Earnings: <span>${location.state?.revenue}</span>
            </Typography>
            <Typography
              style={{ textTransform: "capitalize", color: "#e4a843" }}
              variant="h5"
              gutterBottom
            >
              Popularity: <span>{location.state?.popularity}</span>
            </Typography>
            <Typography
              style={{ textTransform: "capitalize", color: "#e4a843" }}
              variant="h5"
              gutterBottom
            >
              Production Companies:{" "}
              <span>
                <ul></ul>
                {location.state?.production_companies.map((x, i) => (
                  <li key={i}>
                    {" "}
                    <Typography
                      variant="subtitle"
                      color={"primary"}
                      gutterBottom
                    >
                      {x.name}
                    </Typography>
                  </li>
                ))}
              </span>
            </Typography>
            <Typography
              style={{ textTransform: "capitalize", color: "#e4a843" }}
              variant="h5"
              gutterBottom
            >
              Production Countries:{" "}
              <span>
                <ul></ul>
                {location.state?.production_countries.map((x, i) => (
                  <li key={i}>
                    {" "}
                    <Typography
                      variant="subtitle"
                      color={"primary"}
                      gutterBottom
                    >
                      {x.name}
                    </Typography>
                  </li>
                ))}
              </span>
            </Typography>
          </Grid>
          <Container maxWidth="lg">
            <Grid item md={9} sm={12}>
              <Typography
                sx={{
                  fontFamily: "Bebas Neue",
                  textAlign: "left",
                  backgroundColor: "black",
                  // padding: "0px 0px 0px 60px",
                  margin: "50px 25px 20px 25px",
                }}
                color="error"
                variant="h2"
              >
                SIMILAR MOVIES
              </Typography>
            </Grid>
          </Container>
        </Grid>

        <MovieListContainer>
          {similarMoviesList?.length > 0
            ? similarMoviesList.map((movie, index) => (
                <MovieComponent
                  key={index}
                  movie={movie}
                  onMovieSelect={onMovieSelect}
                />
              ))
            : null}
        </MovieListContainer>
      </Container>
    </ContainerMain>
  );
}

export default FullMovieInfo;
