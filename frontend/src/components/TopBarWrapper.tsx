import React, { useState } from "react";
import TopBar from "./TopBar";
import { useNavigate } from "./hooks/useNavigate";

const TopBarWrapper: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (isAuthenticated) {
      // Handle logout
      navigate("/logout");
      setIsAuthenticated(false);
    } else {
      // Handle login
      navigate("/login");
    }
  };

  return <TopBar isAuthenticated={isAuthenticated} onLoginClick={handleLoginClick} />;
};

export default TopBarWrapper;
