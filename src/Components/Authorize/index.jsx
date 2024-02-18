import { useEffect, useState, createContext } from "react";
import Loader from "@/Components/Loader";
import { getUser } from "@/Controllers/userController.js";
import { getCookie } from "@/utils/cookieHandler.js";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const AuthorizeUser = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    user: {},
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    async function fetchUser() {
      const token = getCookie("authToken");
      if (!token) {
        setAuth({ isAuthenticated: false, isLoading: false, user: {} });
        navigate("/login");
      } else {
        const user = (await getUser()) || {};
        if (user?._id) {
          setAuth({ isAuthenticated: true, isLoading: false, user: user });
        } else {
          setAuth({ isAuthenticated: false, isLoading: false, user: {} });
          navigate("/login");
        }
      }
    }
    fetchUser();
  }, [navigate]);

  console.log(`%c auth `, "color: green;border:1px double green", auth);
  return (
    <AuthContext.Provider value={{ ...auth }}>
      {auth.isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};
export { AuthContext };
export default AuthorizeUser;
