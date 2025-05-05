import React, { useEffect, useState } from "react";
import useOrders from "@/lib/hooks/useOrders";
import useConfirmationDialog from "@/lib/hooks/useConfirmationDialog";
import FilterSortControls from "./FilterSortControls";
import OrderTable from "./OrderTable";
import PaginationControls from "../PaginationControls";
import ConfirmationDialog from "./ConfirmationDialog";
import type { FilterOptions, Pagination } from "@/types";

const HostOrdersPage: React.FC = () => {
  const { orders, filters, pagination, loading, error, serveOrder, deleteOrder, setFilters, setPagination } =
    useOrders();
  const { isOpen, targetId, open, close } = useConfirmationDialog();

  const [showError, setShowError] = useState<string>("");
  useEffect(() => {
    if (error) {
      setShowError(error.message);
      const timer = setTimeout(() => setShowError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleFilterChange = (newFilters: FilterOptions) => setFilters(newFilters);

  const handlePageChange = (newPagination: Pagination) => setPagination(newPagination);

  const handleDeleteConfirm = () => {
    if (targetId) {
      deleteOrder(targetId);
    }
    close();
  };

  return (
    <main className="flex-grow container mx-auto p-4 space-y-8">
      <div className="p-4">
        {showError && (
          <div role="alert" className="fixed top-4 right-4 bg-destructive text-white px-4 py-2 rounded shadow">
            {showError}
          </div>
        )}
        {loading && (
          <output aria-busy="true" aria-live="polite" className="flex items-center mb-4 text-gray-600">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <span>Ładowanie zamówień...</span>
          </output>
        )}
        <h1 className="text-2xl font-semibold mb-4">Kolejka Zamówień</h1>
        <div className="flex items-center justify-between">
          <FilterSortControls filters={filters} onChange={handleFilterChange} disabled={loading} />
          <PaginationControls pagination={pagination} onChange={handlePageChange} disabled={loading} />
        </div>
        {error && <div className="text-destructive mb-4">{error.message}</div>}
        <OrderTable orders={orders} loading={loading} onServe={serveOrder} onDelete={open} />
        <ConfirmationDialog isOpen={isOpen} onConfirm={handleDeleteConfirm} onCancel={close} />
      </div>
    </main>
  );
};

export default HostOrdersPage;
