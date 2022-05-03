import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [food, setFood] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5001/food/all").then((res) => {
      const data = res.data;
      setFood(data);
    });
  }, []);

  const navigate = useNavigate();

  const handleFriesImage = () => {
    navigate("/menu/fries");
  };

  const handleChickenImage = () => {
    navigate("/menu/chicken");
  };

  const handleBeverageImage = () => {
    navigate("/menu/drinks");
  };

  return (
    <>
      {food && (
        <div className="flex flex-row">
          <img
            onClick={handleFriesImage}
            className="basis-1/3"
            src={food[2].image}
            alt={food[2].name}
            width="200"
            height="200"
          />
          <img
            onClick={handleChickenImage}
            className="basis-1/3"
            src={food[8].image}
            alt={food[8].name}
            width="200"
            height="200"
          />
          <img
            onClick={handleBeverageImage}
            className="basis-1/3"
            src={food[14].image}
            alt={food[14].name}
            width="200"
            height="200"
          />
        </div>
      )}
    </>
  );
};

export default Main;
