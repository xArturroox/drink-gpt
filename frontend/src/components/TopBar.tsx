import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "./hooks/useAuth";

const TopBar = () => {
  const { isAuthenticated, handleLogin, handleLogout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-900 shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <a href="/" className="hover:opacity-80 transition-opacity cursor-pointer">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">DrinkGPT</h1>
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
                Składniki
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
        <Button
          onClick={isAuthenticated ? handleLogout : handleLogin}
          variant={isAuthenticated ? "ghost" : "default"}
          className={
            isAuthenticated ? "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" : ""
          }
        >
          {isAuthenticated ? "Wyloguj się" : "Zaloguj się"}
        </Button>
      </div>
    </header>
  );
};

export default TopBar;
