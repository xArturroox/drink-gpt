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
    <div
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-md p-4 flex flex-col justify-between border border-white/20 dark:border-gray-700/30 hover:shadow-lg transition-shadow"
      data-testid={`drink-card-${drink.name}`}
    >
      <div>
        <h2 className="text-lg font-semibold mb-2" data-testid="drink-name">
          {drink.name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2" data-testid="drink-ingredients">
          {drink.ingredients}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400" data-testid="drink-recipe">
          {drink.recipe.length > 100 ? `${drink.recipe.substring(0, 100)}...` : drink.recipe}
        </p>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2" data-testid="drink-error">
          {error}
        </p>
      )}
      <Button
        variant="outline"
        className="mt-4 self-end bg-green-400 hover:bg-green-500 text-black"
        onClick={handleOrder}
        data-testid="order-drink-button"
      >
        Zamów
      </Button>
    </div>
  );
};

export default DrinkCard;
