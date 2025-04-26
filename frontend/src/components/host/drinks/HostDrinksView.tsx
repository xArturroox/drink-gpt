import React, { useState } from "react";
import { useDrinks } from "@/components/hooks/useDrinks";
import DrinkList from "./DrinkList";
import DrinkFormModal from "./DrinkFormModal";
import ConfirmDialog from "./ConfirmDialog";
import { fetchDrinkById } from "@/lib/api";
import type { DrinkFormValues } from "@/types";

const HostDrinksView: React.FC = () => {
  const { drinks, isLoading, error, fetchAll, create, update, remove } = useDrinks();
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [initialValues, setInitialValues] = useState<DrinkFormValues | undefined>(undefined);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [drinkToDelete, setDrinkToDelete] = useState<any>(null);

  const handleAddClick = () => {
    setModalMode("add");
    setEditingId(null);
    setInitialValues(undefined);
    setFormModalOpen(true);
  };

  const handleEditClick = async (drink) => {
    setModalMode("edit");
    try {
      const dto = await fetchDrinkById(drink.id);
      const formValues: DrinkFormValues = {
        name: dto.name,
        ingredients: dto.ingredients.map((i) => ({ id: i.ingredient.id, quantity: i.quantity, unit: i.unit })),
        recipe: dto.recipe,
      };
      setEditingId(drink.id);
      setInitialValues(formValues);
      setFormModalOpen(true);
    } catch (e) {
      console.error("Failed to load drink for editing", e);
    }
  };

  const handleDeleteClick = (drink) => {
    setDrinkToDelete(drink);
    setConfirmOpen(true);
  };

  const handleSubmit = async (values: DrinkFormValues) => {
    if (modalMode === "add") {
      await create(values);
    } else if (modalMode === "edit" && editingId !== null) {
      await update(editingId, values);
    }
    setFormModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (drinkToDelete) {
      remove(drinkToDelete.id);
    }
    setConfirmOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Zarządzanie drinkami</h1>
        <button onClick={handleAddClick} className="btn btn-primary">Dodaj drink</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!isLoading && !error && (
        <DrinkList
          drinks={drinks}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      )}

      <DrinkFormModal
        isOpen={isFormModalOpen}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onClose={() => setFormModalOpen(false)}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        message={`Are you sure you want to delete ${drinkToDelete?.name}?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};

export default HostDrinksView; 