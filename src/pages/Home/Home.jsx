import React from "react";
import ItemCard from "../../components/ItemCard/ItemCard";
import person from "../../assets/images/del_person.jpg";
import field from "../../assets/images/field.png";
import delivery from "../../assets/images/delivery.png";
// import sec_payement from "../../assets/images/payment.png";
import credit_card from "../../assets/images/credit-card.png";
import "./Hero.css";
import { NavLink } from "react-router-dom";
import tomatoes from "../../assets/images/tomatoes.jpg";

const prodArray = [
  {
    id: 1,
    title: "Tomatoes",
    farmerRatings: 4.5,
    price: 40,
    unit: "1kg",
    img: tomatoes,
    qty: 1,
  },
  {
    id: 2,
    title: "Potatoes",
    farmerRatings: 4.5,
    price: 50,
    unit: "1kg",
    img:
      "data:image/jpeg;base64,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",
    qty: 1,
  },
];

const Home = () => {
  return (
    <div>
      <div className="border h-[86vh] flex justify-center items-center hero">
        <h3 className="text-[60px] text-center font-bold text-yellow-600">
          Fresh Produce from Local{" "}
          <span className="text-green-500">Farmers</span> to <br />{" "}
          <span className="text-green-500">Your Doorstep</span>
        </h3>
      </div>

      <div className="px-[5vw] py-6 flex">
        <div className="space-y-4  basis-[40%] flex flex-col items-start justify-center flex-1">
          <h5 className="text-yellow-500 font-semibold">
            Farm-Fresh Goodness, Just a Click Away
          </h5>
          <h3 className="text-green-600 font-bold  text-[50px] pb-4">
            Hygenically <br />
            packed, <br />
            safely delivered
          </h3>
          <NavLink className="bg-yellow-500 text-white px-4 py-2 rounded-md my-10">
            Learn more
          </NavLink>
        </div>

        <img className="w-[50%]" src={person} alt="" />
      </div>
      <div className="px-[5vw]">
        <hr className="font-bold h-[2px] bg-black/15 border rounded-md" />
        <div className="flex justify-center items-center ">
          <div className="flex my-4 items-center space-x-2  flex-row justify-center">
            <img src={field} className="w-[10%]" alt="" />
            <div>
              <span className="font-bold">Directly from farm</span> <br />
              <span>Products coming directly from farm</span>
            </div>
          </div>

          <div className="flex my-4 items-center space-x-2 flex-row justify-center">
            <img src={credit_card} className="w-[10%]" alt="" />
            <div>
              <span className="font-bold">Directly from farm</span> <br />
              <span>Products coming directly from farm</span>
            </div>
          </div>
        </div>
        <hr className="font-bold h-[2px] bg-black/15 border rounded-md" />
      </div>

      <div className="px-[5vw] py-10 space-y-5">
        <h1 className="text-[25px] font-bold">New arrivals in your area</h1>

        <div className="flex">
          {prodArray.map((item) => (
            <ItemCard
              id={item.id}
              title={item.title}
              price={item.price}
              rating={item.farmerRatings}
              img={item.img}
              unit={item.unit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
