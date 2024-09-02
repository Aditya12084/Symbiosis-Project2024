import { commonRequest } from "./ApiCall";
import { BACKEND_URL } from "./Helper";

export const registerCustFunction = async (data) => {
  return await commonRequest(
    "POST",
    `${BACKEND_URL}/api/customer/reg-cust`,
    data
  );
};

export const loginCustFunction = async (data) => {
  return await commonRequest("POST", `${BACKEND_URL}/api/customer/login`, data);
};

export const validateToken = async () => {
  return await commonRequest(
    "GET",
    `${BACKEND_URL}/api/customer/validateToken/?token=${localStorage.getItem(
      "token"
    )}`
  );
};

export const getAllProducts = async () => {
  return await commonRequest("GET", `${BACKEND_URL}/api/products/all-products`);
};

export const fetchMyCartProds = async () => {
  return await commonRequest(
    "GET",
    `${BACKEND_URL}/api/cart/my-cart-prods?token=${localStorage.getItem(
      "token"
    )}`
  );
};

export const addToCartDb = async (data) => {
  return await commonRequest(
    "POST",
    `${BACKEND_URL}/api/cart/add-product?token=${localStorage.getItem(
      "token"
    )}`,
    data
  );
};

export const removeFromCartDb = async (data) => {
  return await commonRequest(
    "POST",
    `${BACKEND_URL}/api/cart/remove-from-cart?token=${localStorage.getItem(
      "token"
    )}`,
    data
  );
};
