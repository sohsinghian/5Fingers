import React, { useState, useEffect } from "react";
import MenuBar from "../../components/MenuBar";
import axios from "axios";
import MenuCart from "../../components/MenuCart";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const buttonStyle =
  "text-md font-bold bg-brightred border-1 rounded-sm hover:bg-red mt-2 mb-2 py-1 w-16";

const Chicken = () => {
  const [chicken, setChicken] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const deliveryFee = useSelector((state) => state.user.deliveryFee);

  useEffect(() => {
    axios.get("http://localhost:5001/food/chicken").then((res) => {
      const data = res.data;
      setChicken(data);
    });
  }, []);

  const fetchCart = async () => {
    await axios
      .post("http://localhost:5001/cart/all", {
        token,
      })
      .then((res) => {
        const data = res.data;
        dispatch(userActions.setCart(data));
      });
    await axios
      .post("http://localhost:5001/cart/subTotal", { token })
      .then((res) => {
        const data = res.data;
        dispatch(userActions.setSubTotal(Number(data).toFixed(2)));
        if (Number(data) > 0) {
          if (Number(data) > 50) {
            const deliveryCharge = 0;
            const totalPrice = Number(data).toFixed(2);
            dispatch(userActions.setDeliveryFee(deliveryCharge.toFixed(2)));
            dispatch(userActions.setTotal(totalPrice));
          } else {
            const deliveryCharge = 4;
            const totalPrice = (Number(data) + Number(deliveryFee)).toFixed(2);
            dispatch(userActions.setDeliveryFee(deliveryCharge.toFixed(2)));
            dispatch(userActions.setTotal(totalPrice));
          }
        } else {
          const zero = 0;
          dispatch(userActions.setDeliveryFee(zero.toFixed(2)));
          dispatch(userActions.setTotal(zero.toFixed(2)));
        }
      });
  };

  const handleAddToCart = async (event) => {
    event.preventDefault();
    const foodId = event.target.parentNode.parentNode.id;
    const quantity = 1;
    await axios.post("http://localhost:5001/cart/add", {
      token,
      foodId,
      quantity,
    });

    fetchCart();
  };

  const handleSubmit = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="flex flex-row">
        <MenuBar />
        <div className="flex flex-row flex-wrap basis-1/2 h-fit">
          {chicken.map((element) => {
            return (
              <div
                id={element.id}
                key={uuidv4()}
                className="mt-6 ml-7 bg-white"
              >
                <p className="mt-1 mb-1 ml-2">{element.name}</p>
                <img
                  src={element.image}
                  alt={element.name}
                  className="object-cover h-52 w-80"
                />
                <div className="flex flex-row justify-between">
                  <p className="self-center ml-2">${element.price}</p>
                  <button onClick={handleAddToCart} className={buttonStyle}>
                    ADD
                  </button>
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

export default Chicken;
