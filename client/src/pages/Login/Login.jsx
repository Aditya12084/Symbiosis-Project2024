import React, { useState } from "react";
import user from "../../assets/images/delivery.png";
import register_bg from "../../assets/images/register_bg.jpg";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";
import "./Login.css";
import axios from "axios";
import { loginCustFunction, registerCustFunction } from "../../services/Apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { assignUserDetails } from "../../slices/UserSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [regLogin, setRegLogin] = useState({
    isCustRegLogin: true,
    isCustLogin: true,
  });

  const custReg = async (e) => {
    e.preventDefault();
    // const res = registerCustFunction();

    const custData = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    console.log("hello");

    try {
      const res = await registerCustFunction(custData);
      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        dispatch(
          assignUserDetails({
            username: res.data.username,
            email: res.data.email,
            password: res.data.password,
          })
        );
        console.log(res.data);
        toast.success("Account created successfully!!");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        toast.error(res.response.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const custLogin = async (e) => {
    e.preventDefault();
    // const res = registerCustFunction();

    const custData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const res = await loginCustFunction(custData);
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        dispatch(
          assignUserDetails({
            email: res.data.email,
            password: res.data.password,
          })
        );
        console.log(res.data);
        toast.success("Login Successfull!!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(res.response.data.message);
      }
    } catch (error) {}
  };

  return (
    <div className="py-10">
      <div className=" flex items-center justify-center ">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex w-3/4 max-w-4xl">
          {/* Left Section with Illustration */}
          <div
            className="hidden md:flex md:w-1/2 bg-yellow-600/50 register_div"
            style={{ backgroundImage: register_bg }}
          ></div>

          {/* Right Section with Form */}
          <div className="w-full md:w-1/2 p-10">
            <h2 className="text-3xl font-semibold text-center text-green-500">
              {regLogin.isCustRegLogin
                ? regLogin.isCustLogin
                  ? "Login here"
                  : "Register"
                : "Login here"}
            </h2>

            {regLogin.isCustRegLogin ? (
              <div>
                {" "}
                {regLogin.isCustLogin ? (
                  <form
                    onSubmit={(e) => custLogin(e)}
                    className="mt-8 space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Your e-mail
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Your e-mail"
                        name="email"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Create password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Create password"
                        name="password"
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-3">
                      <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-500 text-white rounded-md  focus:outline-none focus:ring-2 "
                      >
                        Login
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setRegLogin((prev) => ({
                            ...prev,
                            isCustLogin: false,
                          }))
                        }
                        className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      >
                        {regLogin.isCustLogin && regLogin.isCustRegLogin
                          ? "Register"
                          : "Login"}
                      </button>
                    </div>
                    <div className="flex">
                      <span
                        onClick={() =>
                          setRegLogin((...prev) => ({
                            ...prev,
                            isCustLogin: false,
                          }))
                        }
                        className="mx-auto my-1 cursor-pointer hover:text-blue-600 underline"
                      >
                        Login as a farmer
                      </span>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={(e) => custReg(e)} className="mt-8 space-y-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Your name"
                        name="username"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Your e-mail"
                        name="email"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Create password"
                        name="password"
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-3">
                      <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-500 text-white rounded-md  focus:outline-none focus:ring-2 "
                      >
                        Create account
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setRegLogin((prev) => ({
                            ...prev,
                            isCustLogin: true,
                          }))
                        }
                        className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      >
                        {regLogin.isCustLogin && regLogin.isCustRegLogin
                          ? "Register"
                          : "Login"}
                      </button>
                    </div>
                    <div className="flex">
                      <span
                        onClick={() =>
                          setRegLogin((...prev) => ({
                            ...prev,
                            isCustLogin: false,
                          }))
                        }
                        className="mx-auto my-1 cursor-pointer hover:text-blue-600 underline"
                      >
                        Login as a farmer
                      </span>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <div>
                {" "}
                <form className="mt-8 space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Your e-mail
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Your e-mail"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Create password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Create password"
                    />
                  </div>
                  <div className="flex items-center flex-col justify-between space-x-3">
                    <button
                      type="submit"
                      className="py-2 px-4 bg-green-500 text-white rounded-md  focus:outline-none focus:ring-2 w-[80%] self-center"
                    >
                      Sign in
                    </button>
                  </div>
                  <div className="flex">
                    <span
                      onClick={() =>
                        setRegLogin((...prev) => ({
                          ...prev,
                          isCustLogin: true,
                          isCustRegLogin: true,
                        }))
                      }
                      className="mx-auto my-1 cursor-pointer hover:text-blue-600 underline"
                    >
                      Register/Login as a customer
                    </span>
                  </div>
                </form>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
