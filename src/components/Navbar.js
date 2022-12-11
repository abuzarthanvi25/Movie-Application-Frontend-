import React from "react";
import styled from "styled-components";
import MovieIcon from "@mui/icons-material/Movie";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

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
  // padding-left: 72px;
  font-family: "Bebas Neue", cursive;
  cursor: pointer;
  align-items: center;
  letter-spacing: 1px;
`;

const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
`;

function Navbar() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  let navigate = useNavigate();
  const { logout } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <ContainerMain>
        <Header>
          <AppName
            onClick={() => {
              navigate("/");
            }}
          >
            <MovieIcon fontSize="large" sx={{ paddingRight: "5px" }} />
            WATCHit
          </AppName>
          <nav>
            <ul>
              <li
                onClick={() => {
                  navigate("/");
                }}
                disabled
              >
                HOME
              </li>
              {isAuthenticated ? (
                <li
                  onClick={() => {
                    logout();
                  }}
                  style={{
                    backgroundColor: "#FF2F2F",
                    color: "white",
                    padding: "10px 30px",
                    borderRadius: "20px",
                  }}
                >
                  LOGOUT
                </li>
              ) : (
                <li
                  onClick={() => {
                    loginWithRedirect();
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
              )}
            </ul>
          </nav>
        </Header>
      </ContainerMain>
    </>
  );
}

export default Navbar;
