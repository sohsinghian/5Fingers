import React, { useState, useEffect } from "react";
import MenuBar from "../../components/MenuBar";
import axios from "axios";
import MenuCart from "../../components/MenuCart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const buttonStyle =
  "text-md font-bold bg-brightred border-1 rounded-sm hover:bg-red mt-2 mb-2 py-1 w-16";

const Fries = () => {
  const [fries, setFries] = useState([]);

  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    axios.get("http://localhost:5001/food/fries").then((res) => {
      const data = res.data;
      setFries(data);
    });
  }, []);

  const handleSubmit = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="flex flex-row">
        <MenuBar />
        <div className="flex flex-row flex-wrap basis-1/2">
          {fries.map((element) => {
            return (
              <div id={element.id} className="mt-6 ml-10 bg-white">
                <p>{element.name}</p>
                <img
                  src={element.image}
                  alt={element.name}
                  width="300"
                  height="300"
                />
                <div className="flex flex-row justify-between">
                  <p>${element.price}</p>
                  <button className={buttonStyle}>ADD</button>
                </div>
              </div>
            );
          })}
        </div>
        {token ? (
          <MenuCart />
        ) : (
          <div className="text-center flex flex-col basis-1/4">
            <button
              onClick={handleSubmit}
              className="font-bold mt-10 ml-5 bg-brightred h-20 w-full rounded-sm hover:bg-red"
            >
              LOGIN TO START ORDERING! 😋
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Fries;
