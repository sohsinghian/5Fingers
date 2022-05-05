import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const buttonStyle =
  "text-md font-bold bg-goldenbrown border-1 rounded-sm hover:bg-brightgolden mt-2 mb-2 py-1 w-full";

const Register = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (event) => setName(event.target.value);
  const handleGenderChange = (event) => setGender(event.target.value);
  const handleContactNumChange = (event) => setContactNum(event.target.value);
  const handlePostalCodeChange = (event) => setPostalCode(event.target.value);
  const handleUnitNumberChange = (event) => setUnitNumber(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) =>
    setConfirmPassword(event.target.value);

  const getAddress = async () => {
    const res = await axios.get(
      `https://developers.onemap.sg/commonapi/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
    );
    const data = res.data;
    const completeAddress = `${data.results[0].BLK_NO} ${data.results[0].ROAD_NAME} #${unitNumber}`;
    return completeAddress;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const address = await getAddress();

    if (password === confirmPassword) {
      axios
        .post("http://localhost:5001/users/create", {
          name,
          gender,
          contactNum,
          address,
          postalCode,
          email,
          password,
        })
        .then((res) => {
          if (res.data.status === "ok") {
            alert("account created. login to start ordering.");
          }
          navigate("/login");
        });
    } else {
      alert("password not matched");
    }
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit} className="w-1/3">
          <Container component="main" maxWidth="sm">
            <p className="font-bold -mb-4">Name:</p>
            <TextField
              type="text"
              margin="normal"
              size="small"
              fullWidth
              label="Name"
              autoComplete="name"
              required
              value={name}
              onChange={handleNameChange}
            />
            <p className="font-bold">Gender:</p>
            <Select
              fullWidth
              label="Gender"
              size="small"
              value={gender}
              onChange={handleGenderChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
            <p className="font-bold -mb-4">Contact Number:</p>
            <TextField
              type="number"
              margin="normal"
              size="small"
              fullWidth
              label="8 digits only"
              autoComplete="number"
              required
              value={contactNum}
              onChange={handleContactNumChange}
            />
            <p className="font-bold -mb-4">Postal Code:</p>
            <TextField
              type="number"
              margin="normal"
              size="small"
              label="eg. 123456"
              fullWidth
              autoComplete="number"
              required
              value={postalCode}
              onChange={handlePostalCodeChange}
            />
            <p className="font-bold -mb-4">Unit Number:</p>
            <TextField
              type="text"
              margin="normal"
              size="small"
              label="eg. 12-20/25/26/27"
              fullWidth
              autoComplete="text"
              required
              value={unitNumber}
              onChange={handleUnitNumberChange}
            />
            <p className="font-bold -mb-4">Email:</p>
            <TextField
              type="email"
              margin="normal"
              size="small"
              fullWidth
              label="Email"
              autoComplete="email"
              required
              value={email}
              onChange={handleEmailChange}
            />
            <p className="font-bold -mb-4">Password:</p>
            <TextField
              type="password"
              margin="normal"
              size="small"
              fullWidth
              label="Password"
              autoComplete="number"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            <p className="font-bold -mb-4">Confirm Password:</p>
            <TextField
              type="password"
              margin="normal"
              size="small"
              fullWidth
              label="Confirm Password"
              autoComplete="number"
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <button type="submit" className={buttonStyle}>
              Create Account
            </button>
            <div className="mb-32">
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </div>
          </Container>
        </form>
      </Box>
    </>
  );
};

export default Register;
