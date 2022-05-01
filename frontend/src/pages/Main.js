import React, { useEffect } from "react";
import axios from "axios";

const Main = () => {
  useEffect(() => {
    axios.get("http://localhost:5001").then((res) => {
      const data = res.data;
      console.log(data);
    });
  }, []);

  return (
    <>
      <h1>Main</h1>
    </>
  );
};

export default Main;
