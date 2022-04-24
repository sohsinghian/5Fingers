import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Menu from "./pages/Menu";
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
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/menu/chicken" element={<Chicken />} />
        <Route path="/menu/fries" element={<Fries />} />
        <Route path="/menu/drinks" element={<Drinks />} />
      </Routes>
    </>
  );
}

export default App;
