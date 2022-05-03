import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Chicken from "./pages/menu/Chicken";
import Drinks from "./pages/menu/Drinks";
import Fries from "./pages/menu/Fries";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/menu/chicken" element={<Chicken />} />
        <Route path="/menu/fries" element={<Fries />} />
        <Route path="/menu/drinks" element={<Drinks />} />
      </Routes>
    </>
  );
}

export default App;
