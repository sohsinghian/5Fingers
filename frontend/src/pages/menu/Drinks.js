import React, { useState, useEffect } from "react";
import MenuBar from "../../components/MenuBar";
import axios from "axios";

const Drinks = () => {
  const [beverages, setBeverages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/food/beverages").then((res) => {
      const data = res.data;
      setBeverages(data);
    });
  }, []);
  return (
    <>
      <div className="flex flex-row">
        <MenuBar />
        <div className="flex flex-row flex-wrap basis-1/2">
          {beverages.map((element) => {
            return (
              <div id={element.id} className="mt-6 ml-10 bg-white">
                <p>{element.name}</p>
                <img
                  src={element.image}
                  alt={element.name}
                  width="300"
                  height="300"
                />
                <div className="flex flex-row">
                  <p>{element.price}</p>
                  <button className="float-right">ADD</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Drinks;
