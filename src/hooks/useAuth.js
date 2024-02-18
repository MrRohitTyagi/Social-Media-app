import { AuthContext } from "@/Components/Authorize";
import { useContext } from "react";

const useAuth = () => {
  const data = useContext(AuthContext);
  return {
    user: data.user,
    isLoading: data.isLoading,
    isAuthenticated: data.isAuthenticated,
  };
};

export default useAuth;
