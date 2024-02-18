import useAuth from "@/hooks/useAuth";
import React from "react";

const Homepage = () => {
  const { user } = useAuth();

  return <div>Homepage</div>;
};

export default Homepage;
