import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const buttonStyle =
  "text-md font-bold bg-brightred border-1 rounded-sm hover:bg-red mt-2 mb-2 py-1 w-full";

const MenuCart = () => {
  //   const [subTotal, setSubTotal] = useState(0);
  //   const [total, setTotal] = useState(0);
  //   const [deliveryFee, setDeliveryFee] = useState(0);

  const currentDate = new Date().toLocaleDateString();
  const estimateDeliveryTime = moment().add(40, "m").format("LT");

  const dispatch = useDispatch();

  let cart = useSelector((state) => state.user.cart);
  const user = useSelector((state) => state.user.user[0]);
  const token = useSelector((state) => state.user.token);
  const subTotal = useSelector((state) => state.user.subTotal);
  const total = useSelector((state) => state.user.total);
  const deliveryFee = useSelector((state) => state.user.deliveryFee);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    await axios.get("http://localhost:5001/cart/all").then((res) => {
      const data = res.data;
      dispatch(userActions.setCart(data));
    });
    await axios.get("http://localhost:5001/cart/subTotal").then((res) => {
      const data = res.data;
      dispatch(userActions.setSubTotal(Number(data).toFixed(2)));
      if (Number(data) > 0) {
        const deliveryCharge = 4;
        dispatch(userActions.setDeliveryFee(deliveryCharge.toFixed(2)));

        const totalPrice = (Number(data) + Number(deliveryFee)).toFixed(2);
        dispatch(userActions.setTotal(totalPrice));
      } else {
        const zero = 0;
        dispatch(userActions.setDeliveryFee(zero.toFixed(2)));
        dispatch(userActions.setTotal(zero.toFixed(2)));
      }
    });
  };

  const handleDecrement = async (event) => {
    event.preventDefault();
    const foodId = event.target.parentNode.parentNode.parentNode.id;
    const quantity = event.target.id;
    await axios
      .post("http://localhost:5001/cart/decrementQuantity", {
        foodId,
        quantity,
        token,
      })
      .then((res) => {
        const data = res.data;
      });
    fetchCart();
  };

  const handleIncrement = async (event) => {
    event.preventDefault();
    const foodId = event.target.parentNode.parentNode.parentNode.id;
    const quantity = event.target.id;
    await axios
      .post("http://localhost:5001/cart/incrementQuantity", {
        foodId,
        quantity,
        token,
      })
      .then((res) => {
        const data = res.data;
      });
    fetchCart();
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    const foodId = event.target.parentNode.parentNode.id;
    await axios
      .delete("http://localhost:5001/cart/remove", {
        headers: {
          Authorization: token,
        },
        data: {
          foodId,
          token,
        },
      })
      .then((res) => {
        const data = res.data;
      });
    fetchCart();
  };

  return (
    <>
      <div className="flex flex-col mr-10">
        <div className="flex flex-col basis-1/4 ml-10">
          <p className="font-bold flex justify-center mt-6 text-xl">My Order</p>
          <div className="flex flex-row justify-between mt-5 mb-8">
            <p>Deliver to:</p>
            <p className="font-bold">{user.address}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="mb-8 mr-2">Estimated Delivery Time:</p>
            <p className="font-bold">
              {currentDate}, {estimateDeliveryTime}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="mb-2">Sub Total:</p>
            <p className="font-bold">${subTotal}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="mb-2">Delivery Charge:</p>
            <p className="font-bold">${deliveryFee}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="mb-6">GST(7%) Inclusive: </p>
            <p className="font-bold">${((total / 107) * 7).toFixed(2)}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-bold text-xl mb-6">Total: </p>
            <p className="font-bold">${total}</p>
          </div>
          <button className={buttonStyle}>CHECKOUT</button>
        </div>
        <div className="ml-10 mt-10">
          <p className="text-xl font-bold">Order Details</p>
          {cart ? (
            cart.map((element) => {
              return (
                <div
                  id={element.id}
                  key={uuidv4()}
                  className="border-darkred mb-5 bg-lightred px-2 py-2"
                >
                  <div className="flex flex-row">
                    <div className="flex flex-row mr-8">
                      <Button
                        id={element.quantity}
                        onClick={handleDecrement}
                        variant="contained"
                        style={{
                          maxWidth: "30px",
                          maxHeight: "30px",
                          minWidth: "30px",
                          minHeight: "30px",
                        }}
                      >
                        －
                      </Button>
                      <p className="font-bold text-lg ml-2 mr-2">
                        {element.quantity}
                      </p>
                      <Button
                        id={element.quantity}
                        onClick={handleIncrement}
                        variant="contained"
                        style={{
                          maxWidth: "30px",
                          maxHeight: "30px",
                          minWidth: "30px",
                          minHeight: "30px",
                        }}
                      >
                        ＋
                      </Button>
                    </div>
                    <img
                      src={element.image}
                      alt={element.name}
                      width="50"
                      height="50"
                    />
                    <p className="font-bold ml-8">{element.name}</p>
                  </div>
                  <br />
                  <div className="flex flex-row justify-between">
                    {/* <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={handleDelete}
                    >
                      <DeleteIcon id={element.id} fontSize="small" />
                    </IconButton> */}
                    <button onClick={handleDelete} className="border-none ml-2">
                      🗑️
                    </button>
                    <p className="font-bold flex justify-end">
                      ${(element.price * element.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No items added yet</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MenuCart;
