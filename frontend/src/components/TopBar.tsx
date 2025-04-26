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
        <div className="flex items-center space-x-8">
          <a href="/" className="hover:opacity-80 transition-opacity cursor-pointer">
            <h1 className="text-xl font-bold">DrinkGPT</h1>
          </a>
          {isAuthenticated && (
            <nav className="flex space-x-4">
              <a
                href="/host/drinks"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Drinki
              </a>
              <a
                href="/host/ingredients"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Skadniki
              </a>
              <a
                href="/host/orders"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Zamówienia
              </a>
            </nav>
          )}
        </div>
        <Button onClick={onLoginClick} variant="outline">
          {isAuthenticated ? "Wyloguj" : "Zaloguj"}
        </Button>
      </div>
    </header>
  );
};

export default TopBar;
