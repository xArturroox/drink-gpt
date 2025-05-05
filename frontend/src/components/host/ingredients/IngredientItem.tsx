import React from "react";
import { Button } from "@/components/ui/button";
import type { IngredientDTO } from "@/types";

interface IngredientItemProps {
  item: IngredientDTO;
  onEdit: (item: IngredientDTO) => void;
  onDelete: (id: number) => void;
}

const IngredientItem: React.FC<IngredientItemProps> = ({ item, onEdit, onDelete }) => (
  <tr>
    <td className="border px-4 py-2">{item.name}</td>
    <td className="border px-4 py-2">
      <input type="checkbox" checked={item.available} disabled />
    </td>
    <td className="border px-4 py-2">
      <div className="flex justify-end space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onEdit(item)}
          className="bg-blue-400 hover:bg-blue-500 text-black"
        >
          Edytuj
        </Button>
        <Button size="sm" variant="destructive" onClick={() => onDelete(item.id)}>
          Usuń
        </Button>
      </div>
    </td>
  </tr>
);

export default IngredientItem;
