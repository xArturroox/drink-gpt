import React from "react";
import type { DrinkViewModel } from "@/types";
import { Button } from "@/components/ui/button";

interface DrinkCardProps {
  drink: DrinkViewModel;
  onEdit: (drink: DrinkViewModel) => void;
  onDelete: (drink: DrinkViewModel) => void;
}

const DrinkCard: React.FC<DrinkCardProps> = ({ drink, onEdit, onDelete }) => {
  const preview = drink.recipe.length > 100 ? `${drink.recipe.substring(0, 100)}...` : drink.recipe;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-2">{drink.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{drink.ingredients}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{preview}</p>
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(drink)}
          className="bg-blue-400 hover:bg-blue-500 text-black"
        >
          Edytuj
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(drink)}>
          Usuń
        </Button>
      </div>
    </div>
  );
};

export default DrinkCard;
