import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import axios from "axios";

const buttonStyle =
  "text-md font-bold bg-goldenbrown border-1 rounded-sm hover:bg-brightgolden mt-2 mb-2 py-1 w-full";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5001/users/login", { email, password })
      .then((res) => {
        if (res.data.status === "ok") {
          setToken(res.data.accessToken);
        }
        navigate("/");
      });
  };

  return (
    <>
      <div>
        <Box
          sx={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Welcome to HappEats</Typography>
          <form onSubmit={handleSubmit} className="w-1/4">
            <Container component="main" maxWidth="sm">
              <TextField
                type="email"
                margin="normal"
                size="small"
                fullWidth
                label="Email Address"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                type="password"
                margin="small"
                size="small"
                fullWidth
                label="Password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button type="submit" className={buttonStyle}>
                Sign in
              </button>
              <Link href="/change-password" variant="body2">
                Forgot password?
              </Link>
              <br />
              <Link href="/register" variant="body2">
                Don't have an account? Create one!
              </Link>
            </Container>
          </form>
        </Box>
      </div>
    </>
  );
};

export default Login;
