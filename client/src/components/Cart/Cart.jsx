import React, { useState } from "react";

import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect } from "react"; // named export
import CartItemCard from "../CartItemCard/CartItemCart";
import { useDispatch } from "react-redux";
import { setToCart } from "../../slices/CartSlice";
import { fetchMyCartProds } from "../../services/Apis";

const Cart = () => {
  const [cartActive, setCartActive] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { email } = useSelector((state) => state.user.userDetails);

  const dispatch = useDispatch();

  const fetchCartData = async () => {
    const res = await fetchMyCartProds();
    if (res.status === 200) {
      if (res.data.cartProducts) {
        dispatch(setToCart({ cartProducts: res.data.cartProducts }));
      }
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);
  // console.log("This is my cart" + cart);

  const [cartTotal, setCartTotal] = useState(0.0);
  const [noOfItems, setNoOfItems] = useState(0);

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.qty * item.price, 0); //ask question to cgpt  why the 0 is used here
    setCartTotal(total);
    const items = cart.reduce((acc, item) => acc + item.qty, 0);
    setNoOfItems(items);
  }, [cart]);

  return (
    <div>
      <div
        onClick={() => setCartActive(!cartActive)}
        className={` ${
          cartActive ? "fixed" : "hidden"
        } fixed bg-black/20 top-0 w-full h-screen z-[10]`}
      ></div>
      <div
        className={`fixed bottom-0 top-0 z-[15]  ${
          cartActive ? "right-0" : "right-[-25vw]"
        } w-full p-5  lg:w-[25vw] transition-all duration-200 bg-white  border-red-400`}
        style={{ height: "100%" }}
      >
        {" "}
        <div
          onClick={() => setCartActive(!cartActive)}
          className="fixed bottom-5 bg-white p-3 text-green-500 rounded-full right-5  cursor-pointer "
        >
          <FaShoppingCart className="text-[40px]" />
          <span className="bg-red-600 absolute top-[-5px] text-white  rounded-full px-[9px] right-[1px]">
            {cart.length}
          </span>
        </div>
        <div className="flex mb-6 items-center justify-between">
          <span className="font-bold  text-xl text-yellow-600">My Cart</span>

          <IoClose
            onClick={() => setCartActive(!cartActive)}
            className="border-2  border-gray-600 font-bold p-[1px] text-xl rounded-md hover:text-red-400 hover:border-red-300 cursor-pointer"
          />
        </div>
        {email ? (
          cart.length > 0 ? (
            cart.map((item) => {
              return (
                <CartItemCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  qty={item.qty}
                  img={item.img}
                />
              );
            })
          ) : (
            <h1 className="text-center text-black/70">Your cart is Empty</h1>
          )
        ) : (
          <h1 className="text-center text-black/70">
            Please login or register!!
          </h1>
        )}
        <div className="p-2 bg-white absolute flex justify-center bottom-4 w-full flex-col right-[0.10px]">
          <div className="ml-2">
            <h3 className="font-semibold">
              Items: <span>{noOfItems}</span>
            </h3>
            <h3 className="font-semibold">
              Total Amount: <span>₹{cartTotal}.00</span>
            </h3>
          </div>

          <hr className=" w-[90vw] lg:w-[84%] m-2 " />
          <div className="flex justify-center ">
            <button
              className={` ${
                email ? "bg-green-600" : "bg-green-300 cursor-not-allowed"
              } font-bold px-3 py-2 text-white rounded-lg w-[98%] ${
                cart.length === 0 && "bg-green-300 cursor-not-allowed"
              }`}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
