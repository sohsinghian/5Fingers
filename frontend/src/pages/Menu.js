import React, { useEffect } from "react";
import MenuBar from "../components/MenuBar";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   navigate("/menu/chicken");
  // }, []);

  return (
    <>
      <div className="flex flex-row">
        <MenuBar />
      </div>
    </>
  );
};

export default Menu;
