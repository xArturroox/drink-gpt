import React from "react";
import type { IngredientDTO } from "@/types";
import IngredientItem from "./IngredientItem";

interface IngredientListProps {
  items: IngredientDTO[];
  onEdit: (item: IngredientDTO) => void;
  onDelete: (id: number) => void;
}

const IngredientList: React.FC<IngredientListProps> = ({ items, onEdit, onDelete }) => {
  if (items.length === 0) {
    return <p className="text-center text-gray-500">Brak składników</p>;
  }

  return (
    <table className="w-full table-auto mb-4 border-collapse">
      <thead>
        <tr>
          <th className="border px-4 py-2 text-left">Nazwa</th>
          <th className="border px-4 py-2 text-left">Dostępny</th>
          <th className="border px-4 py-2 text-left">Akcje</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <IngredientItem key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
};

export default IngredientList;
