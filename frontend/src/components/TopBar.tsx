import React from "react";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  isAuthenticated: boolean;
  onLoginClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ isAuthenticated, onLoginClick }) => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">DrinkGPT</h1>
        <Button onClick={onLoginClick} variant="outline">
          {isAuthenticated ? "Logout" : "Login"}
        </Button>
      </div>
    </header>
  );
};

export default TopBar;
