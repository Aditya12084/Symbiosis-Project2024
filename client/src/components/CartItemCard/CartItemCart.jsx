import React, { useEffect } from "react";

import { CiSquarePlus } from "react-icons/ci";

import { CiSquareMinus } from "react-icons/ci";

import { MdDelete } from "react-icons/md";
import { removeFromCart } from "../../slices/CartSlice";
import { useDispatch } from "react-redux";
import { incItem } from "../../slices/CartSlice";
import { decItem } from "../../slices/CartSlice";
import { useState } from "react";
import { removeFromCartDb } from "../../services/Apis";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartItemCard = ({ id, title, img, price, qty }) => {
  const dispatch = useDispatch();


  const [disableDec, setDisablDec] = useState(true);

  useEffect(() => {
    qty > 1 ? setDisablDec(false) : setDisablDec(true);
  });

  return (
    <div className="mt-3  flex p-1 rounded shadow-md">
      <MdDelete
        onClick={async () => {
          const res = await removeFromCartDb({ id: id });
          if (res.status === 200) {
            alert("Item removed from cart.");
          }
          dispatch(removeFromCart({ id }));
        }}
        className="absolute right-7 cursor-pointer"
      />

      <img src={img} alt="" className="w-[50px]  m-1 h-[45px]" />

      <div className="flex-1 ml-2 leading-6">
        <h2>{title}</h2>
        <div className="flex justify-between">
          <span className="text-green-500 text-lg font-bold">₹{price}</span>
          <div className="flex justify-end pr-2 gap-2 items-center">
            {/* <CiSquarePlus
              onClick={() => dispatch(incItem({ id }))}
              className="border-gray-600 text-gray-600 cursor-pointer hover:bg-green-500 transition-all ease-linear hover:text-white  hover:rounded text-[28px]"
            /> */}
            <span className="text-lg">Qty: {qty}</span>{" "}
            {/* <CiSquareMinus
              onClick={() => dispatch(decItem({ id }))}
              className={`border-gray-600 text-gray-600 opacity-50  cursor-pointer ${
                !disableDec && "hover:bg-green-500 opacity-100"
              }  hover:rounded transition-all ease-linear  text-[28px]`}
            /> */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CartItemCard;
