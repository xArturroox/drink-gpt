import React, { useState } from "react";
import TopBar from "./TopBar";

const TopBarWrapper: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginClick = () => {
    // Toggle authentication state for now
    // This should be replaced with actual authentication logic
    setIsAuthenticated(!isAuthenticated);
  };

  return <TopBar isAuthenticated={isAuthenticated} onLoginClick={handleLoginClick} />;
};

export default TopBarWrapper;
