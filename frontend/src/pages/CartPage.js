import React from "react";
import { useSelector } from "react-redux";

const CartPage = () => {
  const cart = useSelector((state) => state.user.cart);
  return (
    <>
      <div></div>
    </>
  );
};

export default CartPage;
