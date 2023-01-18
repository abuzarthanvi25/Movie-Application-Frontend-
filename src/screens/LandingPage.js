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
import { getCurrentUser, getData, logoutUser } from "../config/firebasemethods";
import { removeUser } from "../store/userSlice";
// import { useAuth0 } from "@auth0/auth0-react";

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
  padding: 10px;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
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
      // `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
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

  const checkApi = async () => {
    await fetch("http://localhost:5000/watchlist/638cdbdaf2dc70b7cd5b2292", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getTrendingData();
    checkApi();
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
                  style={{
                    backgroundColor: "#399EFF",
                    color: "white",
                    padding: "10px 30px",
                    borderRadius: "20px",
                    margin: "0px 10px",
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
                      backgroundColor: "#399EFF",
                      color: "white",
                      padding: "10px 30px",
                      borderRadius: "20px",
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
                    backgroundColor: "#FF2F2F",
                    color: "white",
                    padding: "10px 30px",
                    borderRadius: "20px",
                    margin: "0px 10px",
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
                    backgroundColor: "#399EFF",
                    color: "white",
                    padding: "10px 30px",
                    borderRadius: "20px",
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
          // src="https://www.youtube.com/embed?listType=playlist&list=UUiCSDcAcGDvD_v0TQQ8nxJg&autoplay=1&mute=1"
          // src="https://www.youtube.com/embed?listType=playlist&list=UUi8e0iOVk1fEOogdfu4YgfA&autoplay=1&mute=1"
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
          <div>
            <Typography
              color="primary"
              style={{ display: "block" }}
              variant="subtitle"
              sx={{ textAlign: "center", color: "red" }}
            ></Typography>
          </div>
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
      {/* <Typography
        sx={{
          fontFamily: "Bebas Neue",
          textAlign: "left",
          backgroundColor: "black",
          padding: "0px 0px 0px 60px",
        }}
        color="error"
        variant="h2"
      >
        TRENDING TV SHOWS TODAY
      </Typography>

      <MovieListContainer>
        {trendingTV_Shows_List_day?.length
          ? trendingTV_Shows_List_day.map((movie, index) => (
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
        TRENDING TV SHOWS FOR THE WEEK
      </Typography>

      <MovieListContainer>
        {trendingTV_Shows_List_week?.length
          ? trendingTV_Shows_List_week.map((movie, index) => (
              <MovieComponent
                key={index}
                movie={movie}
                onMovieSelect={onMovieSelect}
              />
            ))
          : null}
      </MovieListContainer> */}
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
