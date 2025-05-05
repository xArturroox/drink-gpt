import React, { useEffect, useState } from "react";
import useIngredients from "@/lib/hooks/useIngredients";
import useConfirmationDialog from "@/lib/hooks/useConfirmationDialog";
import IngredientListToolbar from "./IngredientListToolbar.tsx";
import IngredientList from "./IngredientList.tsx";
import IngredientModalForm from "./IngredientModalForm.tsx";
import ConfirmationDialog from "./ConfirmationDialog.tsx";
import type { IngredientDTO, IngredientRequestDTO, Pagination } from "@/types";
import PaginationControls from "../PaginationControls.tsx";

const HostIngredientsPage: React.FC = () => {
  const {
    ingredients,
    pagination,
    loading,
    error,
    createIngredient,
    updateIngredient,
    deleteIngredient,
    setPagination,
  } = useIngredients();
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<IngredientDTO | null>(null);
  const { isOpen: isConfirmOpen, targetId, open: openConfirm, close: closeConfirm } = useConfirmationDialog();

  const handleAddClick = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEditClick = (item: IngredientDTO) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    openConfirm(id.toString());
  };

  const handleModalSubmit = async (data: IngredientRequestDTO) => {
    if (editingItem) {
      await updateIngredient(editingItem.id, data);
      setSuccessMessage("Składnik został zaktualizowany");
    } else {
      await createIngredient(data);
      setSuccessMessage("Składnik został dodany");
    }
    setModalOpen(false);
  };

  const handleModalCancel = () => {
    setModalOpen(false);
  };

  const handlePageChange = (newPagination: Pagination) => setPagination(newPagination);

  const handleDeleteConfirm = async () => {
    if (targetId) {
      await deleteIngredient(Number(targetId));
      setSuccessMessage("Składnik został usunięty");
    }
    closeConfirm();
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <main className="flex-grow container mx-auto p-4 space-y-8">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Zarządzanie składnikami</h1>
          <div className="flex justify-end mb-4">
            <IngredientListToolbar onAddClick={handleAddClick} />
          </div>
        </div>

        {successMessage && (
          <div role="status" className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
            {successMessage}
          </div>
        )}
        {error && <div className="text-destructive mb-4">{error.message}</div>}
        {loading && (
          <div role="status" className="flex items-center mb-4 text-gray-600">
            <span>Ładowanie składników...</span>
          </div>
        )}

        <IngredientList items={ingredients} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        {isModalOpen && (
          <IngredientModalForm
            initialValues={editingItem ? { name: editingItem.name, available: editingItem.available } : undefined}
            onSubmit={handleModalSubmit}
            onCancel={handleModalCancel}
          />
        )}
        <PaginationControls pagination={pagination} onChange={handlePageChange} disabled={loading} />
        <ConfirmationDialog isOpen={isConfirmOpen} onConfirm={handleDeleteConfirm} onCancel={closeConfirm} />
      </div>
    </main>

  );
};

export default HostIngredientsPage;
