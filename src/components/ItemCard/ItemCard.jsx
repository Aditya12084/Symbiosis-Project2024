import React, { useReducer, useState } from "react";
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";
import tomatoes from "../../assets/images/tomatoes.jpg";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/CartSlice";

function ItemCard({ id, title, price, farmerRatings, img, unit }) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const dec = () => {
    if (qty > 0) {
      setQty(qty - 1);
    }
  };

  return (
    <div className="border-2 ml-5 p-3 space-y-4 flex flex-col rounded-lg">
      <div>
        <img
          src={img}
          className="border rounded-lg w-[300px] h-[250px]"
          alt=""
        />
      </div>

      <span className="font-semibold text-[18px]">{title}</span>
      <div className="flex items-center space-x-3">
        <span>F-ratings:</span>
        <div className="flex space-x-1 text-yellow-400">
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStarHalf />
        </div>
      </div>

      <div>
        {unit} - ₹{price}
      </div>
      <div className="flex space-x-4 items-center justify-between">
        <div className="flex flex-row border items-center bg-slate-200 rounded-md">
          <button
            onClick={() => setQty(qty + 1)}
            className="border-r px-3 py-1 bg-white rounded-tl-md rounded-bl-md font-bold text-lg"
          >
            +
          </button>
          <span className="w-8 py-0 flex justify-center">{qty}</span>
          <button
            className="border-l px-3 py-1 bg-white rounded-tr-md rounded-br-md font-bold text-lg"
            onClick={dec}
          >
            -
          </button>
        </div>
        <button
          onClick={() =>
            dispatch(
              addToCart({ id, title, price, farmerRatings, img, qty: qty })
            )
          }
          className="border py-1 px-3 rounded-md bg-green-700 text-white font-bold"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
