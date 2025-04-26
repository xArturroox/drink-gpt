import React from "react";
import type { DrinkViewModel } from "@/types";
import { Button } from "@/components/ui/button";

interface DrinkCardProps {
  drink: DrinkViewModel;
  onOrder: (drink: DrinkViewModel) => void;
}

const DrinkCard: React.FC<DrinkCardProps> = ({ drink, onOrder }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-2">{drink.name}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{drink.ingredients}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {drink.recipe.length > 100 ? `${drink.recipe.substring(0, 100)}...` : drink.recipe}
        </p>
      </div>
      <Button variant="outline" className="mt-4 self-end" onClick={() => onOrder(drink)}>
        Zamów
      </Button>
    </div>
  );
};

export default DrinkCard;
