import React from "react";
import { Button } from "@/components/ui/button";

interface IngredientListToolbarProps {
  onAddClick: () => void;
}

const IngredientListToolbar: React.FC<IngredientListToolbarProps> = ({ onAddClick }) => (
  <div className="flex justify-end mb-4">
    <Button onClick={onAddClick}>Dodaj składnik</Button>
  </div>
);

export default IngredientListToolbar; 