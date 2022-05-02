import React, { useState, useEffect } from "react";
import MenuBar from "../../components/MenuBar";
import axios from "axios";
import MenuCart from "../../components/MenuCart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const buttonStyle =
  "text-md font-bold bg-brightred border-1 rounded-sm hover:bg-red mt-2 mb-2 py-1 w-16";

const Drinks = () => {
  const [beverages, setBeverages] = useState([]);

  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    axios.get("http://localhost:5001/food/beverages").then((res) => {
      const data = res.data;
      setBeverages(data);
    });
  }, []);

  const handleAddToCart = (event) => {
    event.preventDefault();
    const foodId = event.target.parentNode.parentNode.id;
    const quantity = 1;
    axios
      .post("http://localhost:5001/cart/add", { token, foodId, quantity })
      .then((res) => {
        const data = res.data;
      });
  };

  const handleSubmit = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="flex flex-row">
        <MenuBar />
        <div className="flex flex-row flex-wrap basis-1/2">
          {beverages.map((element) => {
            return (
              <div
                id={element.id}
                key={uuidv4()}
                className="mt-6 ml-10 bg-white"
              >
                <p>{element.name}</p>
                <img
                  src={element.image}
                  alt={element.name}
                  width="300"
                  height="300"
                />
                <div className="flex flex-row justify-between">
                  <p>${element.price}</p>
                  <button onClick={handleAddToCart} className={buttonStyle}>ADD</button>
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

export default Drinks;
