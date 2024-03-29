import React, { useEffect } from "react";
import styled from "styled-components";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import "../App.css";
import MovieComponent from "../components/MovieComponent";
import MovieInfoComponent from "../components/MovieInfoComponent";
import { useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { getCurrentUser, logoutUser } from "../config/firebasemethods";
import { removeUser } from "../store/userSlice";

export const API_KEY = process.env.REACT_APP_API_KEY;

const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  position: sticky;
  justify-content: space-around;
  align-items: center;
  background-color: black;
  color: #f6cc38;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  // box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: "Bebas Neue", cursive;
  letter-spacing: 1px;
`;

const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 0px 0px 10px;
  background-color: white;
  border-radius: 8px;
  margin-left: auto;
  margin-right: auto;
  width: 54%;
  align-items: center;
`;

const SearchInput = styled.input`
  color: black;
  width: 100%;
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
  gap: 18px;
  justify-content: space-evenly;
`;

function LandingPage() {
  // const { loginWithRedirect, logout } = useAuth0();
  const [user, setUser] = useState(null);
  const [searchQuery, updateSearchQuery] = useState("");
  const [timeoutId, setTimeoutId] = useState();
  const [movieList, setMovieList] = useState();
  const [selectedMovie, onMovieSelect] = useState();
  const [trendingMovieList_day, setTrendingMovieList_day] = useState([]);
  let [menu, setMenu] = useState("true");
  let [activeMenu, setActiveMenu] = useState("navLinks");
  const [mostPopularList, setMostPopularList] = useState([]);
  const [trendingMovieList_week, setTrendingMovieList_week] = useState([]);
  let navigate = useNavigate();
  const fetchData = async (searchString) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchString}`
    );
    console.log(response);
    setMovieList(response.data.results);
    console.log(response.data.results);
  };

  const getTrendingData = async () => {
    const trendingMovies_day = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
    );
    const trendingMovies_week = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );
    const popularMostPopularMovies = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=24d723da3daf3b1c093e8fdc63c6f11f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&without_companies=true`
    );
    setTrendingMovieList_day(trendingMovies_day.data.results);
    setTrendingMovieList_week(trendingMovies_week.data.results);
    setMostPopularList(popularMostPopularMovies.data.results);
  };

  const onSearchChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    setTimeoutId(timeout);
  };

  useEffect(() => {
    getTrendingData();
    getCurrentUser()
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    menu ? setActiveMenu("navLinks") : setActiveMenu("navLinks activeMenu");
  }, [menu]);

  return (
    <ContainerMain>
      <Header>
        <AppName
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <MovieIcon fontSize="large" sx={{ paddingRight: "5px" }} />
          WATCHit
        </AppName>
        <SearchBar>
          <SearchIcon
            color="warning"
            fontSize="large"
            sx={{ paddingRight: "5px" }}
          />
          <SearchInput
            placeholder="Search Movies..."
            value={searchQuery}
            onChange={onSearchChange}
          />
        </SearchBar>
        <nav>
          <ul className={activeMenu}>
            {user ? (
              <>
                <li
                  onClick={() => {
                    navigate(`watchlist`);
                  }}
                >
                  MY WATCHLIST
                </li>
                {user.email === process.env.REACT_APP_ADMIN_EMAIL ? (
                  <li
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                    style={{
                      color: "#0069A0",
                      margin: "0px 10px",
                    }}
                  >
                    DASHBOARD
                  </li>
                ) : null}
                <li
                  onClick={() => {
                    logoutUser().then(() => {
                      setUser(null);
                    });
                    removeUser();
                  }}
                  style={{
                    color: "white",
                    backgroundColor: "red",
                  }}
                >
                  LOGOUT
                </li>
              </>
            ) : (
              <>
                <li
                  onClick={() => {
                    navigate(`login`);
                  }}
                  style={{
                    padding: "10px 30px",
                  }}
                >
                  LOGIN
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className="icon">
          {menu ? (
            <MenuIcon
              fontSize="large"
              color="error"
              onClick={() => setMenu(!menu)}
            />
          ) : (
            <CloseIcon
              fontSize="large"
              color="error"
              onClick={() => setMenu(!menu)}
            />
          )}
        </div>
      </Header>

      <Typography
        sx={{
          fontFamily: "Bebas Neue",
          textAlign: "center",
          backgroundColor: "black",
        }}
        color="error"
        variant="h1"
      >
        WATCH NEW UPCOMING MOVIES...
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "5px",
          backgroundColor: "black",
          padding: "10px",
        }}
      >
        <iframe
          width="100%"
          height="547"
          title="Upcoming Movies"
          src="https://www.youtube.com/embed?listType=playlist&list=PLriZt3RmcI30yptU1kQFSwu_XIOPb6apN&autoplay=1&mute=1"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )}

      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <div></div>
        )}
      </MovieListContainer>

      <Typography
        sx={{
          fontFamily: "Bebas Neue",
          textAlign: "left",
          backgroundColor: "black",
          padding: "0px 0px 0px 60px",
        }}
        color="error"
        variant="h2"
      >
        TRENDING MOVIES TODAY
      </Typography>

      <MovieListContainer>
        {trendingMovieList_day?.length
          ? trendingMovieList_day.map((movie, index) => (
              <MovieComponent
                key={index}
                movie={movie}
                onMovieSelect={onMovieSelect}
              />
            ))
          : null}
      </MovieListContainer>
      <Typography
        sx={{
          fontFamily: "Bebas Neue",
          textAlign: "left",
          backgroundColor: "black",
          padding: "0px 0px 0px 60px",
        }}
        color="error"
        variant="h2"
      >
        TRENDING MOVIES FOR THE WEEK
      </Typography>

      <MovieListContainer>
        {trendingMovieList_week?.length
          ? trendingMovieList_week.map((movie, index) => (
              <MovieComponent
                key={index}
                movie={movie}
                onMovieSelect={onMovieSelect}
              />
            ))
          : null}
      </MovieListContainer>
      <Typography
        sx={{
          fontFamily: "Bebas Neue",
          textAlign: "left",
          backgroundColor: "black",
          padding: "0px 0px 0px 60px",
        }}
        color="error"
        variant="h2"
      >
        MOST POPULAR
      </Typography>

      <MovieListContainer>
        {mostPopularList?.length
          ? mostPopularList.map((movie, index) => (
              <MovieComponent
                key={index}
                movie={movie}
                onMovieSelect={onMovieSelect}
              />
            ))
          : null}
      </MovieListContainer>
    </ContainerMain>
  );
}

export default LandingPage;
