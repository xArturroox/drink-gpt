import React from "react";
import type { DrinkViewModel } from "@/types";
import DrinkCard from "./DrinkCard";

interface DrinkListProps {
  drinks: DrinkViewModel[];
  onEdit: (drink: DrinkViewModel) => void;
  onDelete: (drink: DrinkViewModel) => void;
}

const DrinkList: React.FC<DrinkListProps> = ({ drinks, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {drinks.map((drink) => (
        <DrinkCard key={drink.id} drink={drink} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default DrinkList; 