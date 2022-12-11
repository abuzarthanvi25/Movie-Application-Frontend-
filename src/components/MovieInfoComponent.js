import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { API_KEY } from "../screens/LandingPage";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useAuth0 } from "@auth0/auth0-react";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 400px;
  width: auto;
`;

const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: #e4a843;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;

const MovieInfo = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #e4a843;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;

const Close = styled.span`
  display: flex;
  align-items: center;
  border: 1px solid white;
  height: fit-content;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    background-color: white;
    transition: 0.6s;
    transform: scale(1.1);
  }
`;

function MovieInfoComponent(props) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;
  let navigate = useNavigate();

  useEffect(() => {
    console.log(selectedMovie);
    axios
      .get(
        // `https://www.omdbapi.com/?i=${selectedMovie}&plot=full&apikey=${API_KEY}` // `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchString}`
        `https://api.themoviedb.org/3/movie/${selectedMovie}?api_key=${API_KEY}`
      )
      .then((response) => {
        setMovieInfo(response.data);
        console.log(response.data);
      });
  }, [selectedMovie]);
  return (
    <Container>
      {movieInfo ? (
        <>
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
            container
          >
            <Grid style={{ display: "inline" }} item md={4}>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <CoverImage
                  src={`https://image.tmdb.org/t/p/w500${movieInfo?.poster_path}`}
                  alt={movieInfo?.title}
                />
              </Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px",
                }}
              >
                <Button
                  onClick={() => {
                    console.log(movieInfo);
                    navigate("/movie", {
                      state: {
                        ...movieInfo,
                      },
                    });
                  }}
                  variant="contained"
                  //
                  style={{
                    backgroundColor: "black",
                    border: "1px solid #e4a843",
                    margin: "5px",
                  }}
                  sx={{ borderRadius: "20px" }}
                >
                  More Info
                </Button>
                {isAuthenticated && user && !isLoading ? (
                  <Button
                    onClick={() => {
                      console.log(movieInfo);
                      // navigate("/movie", {
                      //   state: {
                      //     ...movieInfo,
                      //   },
                      // });
                    }}
                    variant="contained"
                    //
                    style={{
                      border: "1px solid black",
                      color: "#fff",
                      fontWeight: "bold",
                      margin: "5px",
                    }}
                    color="warning"
                    sx={{ borderRadius: "20px" }}
                  >
                    Add to Watchlist
                  </Button>
                ) : null}
              </Box>
            </Grid>
            <Grid
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
              item
              md={8}
            >
              <MovieName>
                Movie Title: <span>{movieInfo?.title}</span>
              </MovieName>
              <MovieInfo>
                Language: <span>{movieInfo?.original_language}</span>
              </MovieInfo>
              <MovieInfo>
                Release Date: <span>{movieInfo?.release_date}</span>
              </MovieInfo>
              <MovieInfo>
                Popularity: <span>{movieInfo?.popularity}</span>
              </MovieInfo>
              <MovieInfo>
                Vote Count: <span>{movieInfo?.vote_count}</span>
              </MovieInfo>
              <MovieInfo>
                Vote Average: <span>{movieInfo?.vote_average}</span>
              </MovieInfo>
              <MovieInfo>
                Revenue: <span>${movieInfo?.revenue}</span>
              </MovieInfo>
              <MovieInfo>
                Runtime: <span>{movieInfo?.runtime} minutes</span>
              </MovieInfo>
              <MovieInfo>
                Genre:{" "}
                <span>{movieInfo?.genres.map((x) => x.name + ", ")}</span>
              </MovieInfo>
              <MovieInfo>
                Overview: <span>{movieInfo?.overview}</span>
              </MovieInfo>
            </Grid>
            <div style={{ width: "auto" }}>
              <Close onClick={() => props.onMovieSelect()}>
                <CloseIcon color="error" />
              </Close>
            </div>
          </Grid>
        </>
      ) : (
        "Loading..."
      )}
    </Container>
  );
}

export default MovieInfoComponent;
