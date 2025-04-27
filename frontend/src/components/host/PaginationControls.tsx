import React from "react";
import type { Pagination } from "@/types";

interface PaginationControlsProps {
  pagination: Pagination;
  onChange: (newPagination: Pagination) => void;
  disabled?: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ pagination, onChange, disabled = false }) => {
  const handlePrev = () => {
    if (pagination.page > 0) {
      onChange({ ...pagination, page: pagination.page - 1 });
    }
  };

  const handleNext = () => {
    onChange({ ...pagination, page: pagination.page + 1 });
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        onClick={handlePrev}
        disabled={disabled || pagination.page === 0}
        aria-label="Poprzednia strona"
      >
        Prev
      </button>
      <span className="px-2">Strona {pagination.page + 1}</span>
      <button
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        onClick={handleNext}
        disabled={disabled}
        aria-label="Następna strona"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
