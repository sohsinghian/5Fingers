import React from "react";
import { useSelector } from "react-redux";

const buttonStyle =
  "text-md font-bold bg-brightred border-1 rounded-sm hover:bg-red mt-2 mb-2 py-1 w-full";

const MenuCart = () => {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const user = useSelector((state) => state.user.user[0]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col basis-1/4 ml-10">
          <p className="font-bold flex justify-center mt-6 text-xl">My Order</p>
          <div className="flex flex-row justify-between mt-5 mb-8">
            <p>Deliver to:</p>
            <p className="font-bold">{user.address}</p>
          </div>
          <p className="mb-8">
            Estimated Delivery Time: {currentDate} {currentTime}
          </p>
          <p className="mb-2">Sub Total: </p>
          <div className="flex flex-row justify-between">
            <p className="mb-2">Delivery Charge:</p>
            <p className="font-bold">$4.00</p>
          </div>
          <p className="mb-6">GST(7%) Inclusive: </p>
          <p className="font-bold text-xl mb-6">Total: </p>
          <button className={buttonStyle}>CHECKOUT</button>
        </div>
        <div className="ml-10 mt-10 font-bold">
          <p className="text-xl">Order Details</p>
        </div>
      </div>
    </>
  );
};

export default MenuCart;
