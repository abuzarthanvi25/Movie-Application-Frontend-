import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser, sendResetPwdEmail } from "../config/firebasemethods";
import Link from "@mui/material/Link";
import EZ_Input from "../components/EZ_Input";
import React from "react";
import "../App.css";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import EZ_Alert from "../components/EZ_Alert";

let btnStyle = {
  padding: "10px 100px",
  margin: "15px",
};

function Login() {
  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState("");

  let login = () => {
    setLoading(true);
    loginUser({
      email,
      password,
    })
      .then((success) => {
        console.log(success);
        setLoading(false);
        alert(`The user ${success.userName} has been successfully signed in`);
        // if (success.category == "admin") {
        //   navigate("/dashboard", {
        //     state: success,
        //   });
        // } else
        // if (success.category == "user") {
        //   navigate("/", {
        //     state: success,
        //   });
        // }
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setError(err);
      });
  };

  let forgotPassword = () => {
    sendResetPwdEmail(email)
      .then((success) => {
        setAlertMessage(success);
        setSeverity("success");
        setTimeout(() => {
          setAlertMessage("");
          setSeverity("");
        }, 3000);
      })
      .catch((error) => {
        setError(error);
        setAlertMessage(error);
        setSeverity("error");
        setTimeout(() => {
          setAlertMessage("");
          setSeverity("");
        }, 3000);
      });
  };
  return (
    <div style={{ height: "100vh", backgroundColor: "white" }}>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "60vh",
          backgroundColor: "#fff",
        }}
        className="parentMain"
      >
        <EZ_Alert alertMessage={alertMessage} severity={severity} />
        <Box>
          <LockOpenIcon
            color="success"
            fontSize="large"
            style={{ marginTop: "50px" }}
          />
        </Box>
        <Box className="parent">
          <Typography
            sx={{ margin: "0px 0px 20px 0px" }}
            variant="h4"
            textAlign="center"
          >
            LOGIN
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: "10px",
          }}
        >
          <EZ_Input
            variant="standard"
            width="40ch"
            value={email}
            margin="10px 0px "
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <EZ_Input
            width="40ch"
            value={password}
            margin="10px 0px "
            variant="standard"
            type="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        <Box className="parent">
          <Button sx={btnStyle} onClick={login} variant="contained">
            {isLoading ? <CircularProgress color="warning" /> : "LOGIN"}
          </Button>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="error">
            {error.toString()}
          </Typography>
        </Box>
        <Link
          underline="hover"
          onClick={() => {
            email ? forgotPassword() : alert("NO EMAIL PROVIDED!");
          }}
          style={{ cursor: "pointer", fontWeight: "bolder" }}
          variant="body2"
        >
          Forgot Password?
        </Link>
        <Link
          underline="hover"
          style={{ marginTop: "10px" }}
          onClick={() => {
            navigate("/signup");
          }}
          variant="body2"
        >
          Don't have an account? Register
        </Link>
      </Box>
    </div>
  );
}

export default Login;
