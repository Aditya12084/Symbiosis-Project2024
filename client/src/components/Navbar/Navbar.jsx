import React, { useContext, useReducer } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { SEARCH_BOX, serachReducer } from "../../reducers/searchReducer";
import { SearchContext } from "../../context/SearchContext";

function Navbar() {
  const { state, dispatch } = useContext(SearchContext);

  // console.log(state);

  const searchTextMan = (e) => {
    dispatch({ type: "CHANGE", payload: e.target.value });
  };

  return (
    <div className="flex sticky top-0 bg-white items-center px-[5vw] py-5 z-[1] shadow-md">
      <NavLink to="/">
        {" "}
        <img src={logo} className="w-48" alt="" />{" "}
      </NavLink>

      <ul className="flex flex-1 justify-end space-x-8 text-lg">
        <li className="flex-1">
          <NavLink to="/products" className=" basis-[80%] flex justify-end">
            {" "}
            <div className="flex items-center px-3 rounded-md basis-[70%] w-full border-yellow-600 border-2 justify-end">
              <input
                type="text"
                onChange={(e) => searchTextMan(e)}
                placeholder="Search products here..."
                className=" w-[100%] text-yellow-600 outline-none text-[15px]  rounded-md  py-[1px] "
              />
              <FaSearch className="text-yellow-600" />
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="text-yellow-600 text-[17px]">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="text-yellow-600 text-[17px]">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="text-yellow-600 text-[17px]">
            Contact
          </NavLink>
        </li>
        <li className="flex justify-center items-center space-x-2">
          <MdLocationOn className="text-yellow-600" />
          <span className="text-yellow-600 text-[17px]">Mumbai</span>
        </li>
        <div className="flex items-center space-x-5 text-lg ">
          <li>
            <NavLink
              to="/login"
              className="border-2 border-yellow-600 px-3 pb-[3px] rounded-md text-white bg-yellow-600"
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className="border-2 border-yellow-600 px-3 pb-1 rounded-md text-white bg-yellow-600"
            >
              Sign up
            </NavLink>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
