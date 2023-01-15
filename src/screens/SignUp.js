import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUpUser } from "../config/firebasemethods";
import Link from "@mui/material/Link";
import "../App.css";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import EZ_Input from "../components/EZ_Input";

let btnStyle = {
  padding: "10px 100px",
  margin: "15px",
};

function SignUp() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let signUp = () => {
    setLoading(true);
    signUpUser({
      email,
      password,
      userName,
      category: "user",
    })
      .then((success) => {
        setLoading(false);
        console.log(success);
        alert(`Admin has been successfully registered`);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setError(error);
      });
  };

  return (
    <div style={{ backgroundColor: "white", height: "100vh" }}>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "60vh",
          backgroundColor: "#fff",
        }}
      >
        <Box>
          <HistoryEduIcon
            style={{ marginTop: "100px" }}
            color="primary"
            fontSize="large"
          />
        </Box>
        <Box className="parent">
          <Typography
            sx={{ margin: "0px 0px 20px 0px" }}
            variant="h4"
            textAlign="center"
          >
            REGISTRATION
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
            margin="10px 0px "
            label="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <EZ_Input
            variant="standard"
            width="40ch"
            margin="10px 0px "
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <EZ_Input
            variant="standard"
            width="40ch"
            margin="10px 0px "
            type="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        <Box className="parent">
          <Button sx={btnStyle} onClick={signUp} variant="contained">
            {isLoading ? <CircularProgress color="warning" /> : "SIGN UP"}
          </Button>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="error">
            {error.toString()}
          </Typography>
        </Box>
        <Link
          onClick={() => {
            navigate("/");
          }}
          underline="hover"
          variant="body2"
        >
          Already have an account? Sign In
        </Link>
      </Box>
    </div>
  );
}

export default SignUp;
