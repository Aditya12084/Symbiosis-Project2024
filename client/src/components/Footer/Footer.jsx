import React from "react";
import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-green-700 text-white py-4 flex flex-col items-center">
      <div className="flex justify-around py-20 items-center w-full ">
        <div className="basis-[30%] space-y-5">
          <img src={logo} alt="" />
          <p className="text-wrap">
            We Provide Best home grown, natural, chemical-free products which
            are direcly from farmers
          </p>
        </div>
        <div>
          <span className="text-[22px] space-y-1">Products</span>
          <ul className="space-y-1">
            <li>
              <NavLink>Vegetables</NavLink>
            </li>
            <li>
              <NavLink>Dairy Products</NavLink>
            </li>
            <li>
              <NavLink>Milk Products</NavLink>
            </li>
            <li>
              <NavLink>Poultry Products</NavLink>
            </li>
          </ul>
        </div>
        <div>
          <span className="text-[22px] space-y-1">Links</span>
          <ul className="space-y-1">
            <li>
              <NavLink>Home</NavLink>
            </li>
            <li>
              <NavLink>About</NavLink>
            </li>
            <li>
              <NavLink>Contact</NavLink>
            </li>
            <li>
              <NavLink>FAQs</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <hr className="my-2 w-[85%] opacity-50" />
      <span className="w-full text-center inline-block">
        © {2024}
        {2024 !== new Date().getFullYear() &&
          `-${new Date().getFullYear()}`}{" "}
        ThetKhet All rights reserved.
      </span>
    </div>
  );
};

export default Footer;
