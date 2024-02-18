import Cookies from "js-cookie";
// Function to set a cookie
export const setCookie = (name, value) => {
  Cookies.set(name, value);
};

// Function to get a cookie value by name
export const getCookie = (name) => {
  return Cookies.get(name);
};

// Function to delete a cookie by name
export const deleteCookie = (name) => {
  Cookies.remove(name);
};
