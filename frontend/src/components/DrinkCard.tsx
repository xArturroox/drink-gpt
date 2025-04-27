import React from "react";
import type { DrinkViewModel } from "@/types";
import { Button } from "@/components/ui/button";
import { useGuestName } from "./contexts/GuestNameContext";

interface DrinkCardProps {
  drink: DrinkViewModel;
  onOrder: (drink: DrinkViewModel, guestName: string) => void;
}

const DrinkCard: React.FC<DrinkCardProps> = ({ drink, onOrder }) => {
  const { guestName, error, setError } = useGuestName();

  const handleOrder = () => {
    if (!guestName.trim()) {
      setError("Proszę podać imię gościa przed zamówieniem.");
      return;
    }
    onOrder(drink, guestName);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-2">{drink.name}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{drink.ingredients}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {drink.recipe.length > 100 ? `${drink.recipe.substring(0, 100)}...` : drink.recipe}
        </p>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <Button variant="outline" className="mt-4 self-end" onClick={handleOrder}>
        Zamów
      </Button>
    </div>
  );
};

export default DrinkCard;
