import React, { useState } from "react";
import { useDrinks } from "@/components/hooks/useDrinks";
import { fetchDrinkById } from "@/lib/api";
import type { DrinkFormValues, DrinkViewModel, Pagination } from "@/types";
import PaginationControls from "../PaginationControls";
import { Button } from "@/components/ui/button";
import DrinkList from "./DrinkList";
import DrinkFormModal from "./DrinkFormModal";
import ConfirmDialog from "./ConfirmDialog";
import { logger } from "@/lib/logger";

const HostDrinksView: React.FC = () => {
  const { drinks, pagination, isLoading, error, create, update, remove, setPagination } = useDrinks();
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [initialValues, setInitialValues] = useState<DrinkFormValues | undefined>(undefined);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [drinkToDelete, setDrinkToDelete] = useState<DrinkViewModel | null>(null);

  const handleAddClick = () => {
    setModalMode("add");
    setEditingId(null);
    setInitialValues(undefined);
    setFormModalOpen(true);
  };

  const handleEditClick = async (drink: DrinkViewModel) => {
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
      logger.error("Failed to load drink for editing", e);
    }
  };

  const handleDeleteClick = (drink: DrinkViewModel) => {
    setDrinkToDelete(drink);
    setConfirmOpen(true);
  };

  const handleSubmit = async (values: DrinkFormValues) => {
    if (modalMode === "add") {
      await create(values);
    } else if (modalMode === "edit" && editingId !== null) {
      const transformedValues = {
        name: values.name,
        ingredients: values.ingredients.map((i) => ({
          ingredient: { id: i.id, name: "", available: true },
          quantity: i.quantity,
          unit: i.unit,
        })),
        recipe: values.recipe,
      };
      await update(editingId, transformedValues);
    }
    setFormModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (drinkToDelete) {
      remove(drinkToDelete.id);
    }
    setConfirmOpen(false);
  };

  const handlePageChange = (newPagination: Pagination) => setPagination(newPagination);

  return (
    <main className="flex-grow container mx-auto p-4 space-y-8">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Zarządzanie drinkami</h1>
          <div className="flex justify-end mb-4">
            <Button onClick={handleAddClick} className="btn btn-primary">
              Dodaj drink
            </Button>
          </div>
        </div>
        {isLoading && <p>Ładowanie...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!isLoading && !error && <DrinkList drinks={drinks} onEdit={handleEditClick} onDelete={handleDeleteClick} />}

        <DrinkFormModal
          isOpen={isFormModalOpen}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onClose={() => setFormModalOpen(false)}
        />

        <PaginationControls pagination={pagination} onChange={handlePageChange} disabled={isLoading} />

        <ConfirmDialog
          isOpen={isConfirmOpen}
          message={`Czy na pewno chcesz usunąć drink ${drinkToDelete?.name}?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      </div>
    </main>
  );
};

export default HostDrinksView;
