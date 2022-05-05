import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// import { Select } from "@mui/material";
// import { MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userActions } from "../store/userSlice";

const buttonStyle =
  "text-md font-bold bg-goldenbrown border-1 rounded-sm hover:bg-brightgolden mt-2 mb-2 py-1 w-full";

const MyAccount = () => {
  const [name, setName] = useState("");
//   const [gender, setGender] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [confirmPassword, setConfirmPassword] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleNameChange = (event) => setName(event.target.value);
//   const handleGenderChange = (event) => setGender(event.target.value);
  const handleContactNumChange = (event) => setContactNum(event.target.value);
  const handlePostalCodeChange = (event) => setPostalCode(event.target.value);
  const handleUnitNumberChange = (event) => setUnitNumber(event.target.value);
  //   const handleEmailChange = (event) => setEmail(event.target.value);
  //   const handlePasswordChange = (event) => setPassword(event.target.value);
  //   const handleConfirmPasswordChange = (event) =>
  //     setConfirmPassword(event.target.value);

  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user[0]);
  const currentAddress = user.address;
  const addressArray = currentAddress.split(" ");
  const unitNum = addressArray[addressArray.length - 1].substring(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setName(user.name);
    // setGender(user.gender);
    setContactNum(Number(user.contact));
    setPostalCode(user.postalcode);
    setUnitNumber(unitNum);
    // setEmail(user.email);
    setHasLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    console.log(address);

    axios
      .put("http://localhost:5001/users/edit", {
        name,
        contactNum,
        address,
        postalCode,
        token,
      })
      .then((res) => {
        console.log("hello");
        if (res.data.status === "ok") {
          alert("account details updated");
        }
      });
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    await axios
      .delete("http://localhost:5001/users/remove", {
        headers: {
          Authorization: token,
        },
        data: {
          token,
        },
      })
      .then((res) => {
        if (res.data.status === "ok") {
          dispatch(userActions.logout());
          alert("Account deleted. We are sad to see you go!");
        }
        navigate("/login");
      });
  };

  return (
    <>
      {hasLoaded && (
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
                defaultValue={name}
                onChange={handleNameChange}
              />
              {/* <p className="font-bold">Gender:</p> */}
              {/* <Select
                fullWidth
                label="Gender"
                size="small"
                defaultValue={gender}
                onChange={handleGenderChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select> */}
              <p className="font-bold -mb-4">Contact Number:</p>
              <TextField
                type="number"
                margin="normal"
                size="small"
                fullWidth
                label="8 digits only"
                required
                defaultValue={contactNum}
                onChange={handleContactNumChange}
              />
              <p className="font-bold -mb-4">Postal Code:</p>
              <TextField
                type="number"
                margin="normal"
                size="small"
                label="eg. 123456"
                fullWidth
                required
                defaultValue={postalCode}
                onChange={handlePostalCodeChange}
              />
              <p className="font-bold -mb-4">Unit Number:</p>
              <TextField
                type="text"
                margin="normal"
                size="small"
                label="Unit Number"
                fullWidth
                autoComplete="text"
                required
                defaultValue={unitNumber}
                onChange={handleUnitNumberChange}
              />
              <button type="submit" className={buttonStyle}>
                Update Account Details
              </button>
              <button onClick={handleDelete} className={buttonStyle}>
                Delete Account
              </button>
            </Container>
          </form>
        </Box>
      )}
    </>
  );
};

export default MyAccount;
