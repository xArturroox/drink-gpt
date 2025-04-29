import React from "react";
import type { DrinkViewModel } from "@/types";
import DrinkCard from "./DrinkCard";

interface DrinksListProps {
  drinks: DrinkViewModel[];
  onSelect: (drink: DrinkViewModel, guestName: string) => void;
}

const DrinksList: React.FC<DrinksListProps> = ({ drinks, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="drinks-list">
      {drinks.map((drink) => (
        <DrinkCard key={drink.name} drink={drink} onOrder={onSelect} />
      ))}
    </div>
  );
};

export default DrinksList;
