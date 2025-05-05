import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "./hooks/useAuth";
import Logo from "./Logo";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const TopBar = () => {
  const { isAuthenticated, handleLogin, handleLogout } = useAuth();

  const NavLinks = () => (
    <nav className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
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
  );

  return (
    <header className="bg-white dark:bg-gray-900 shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <a href="/" className="hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-2">
            <Logo className="w-6 h-6" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">DrinkGPT</h1>
          </a>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <div className="hidden md:block">
              <NavLinks />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          {isAuthenticated && (
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8">
                    <NavLinks />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}

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
      </div>
    </header>
  );
};

export default TopBar;
