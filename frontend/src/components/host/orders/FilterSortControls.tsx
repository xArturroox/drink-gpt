import React from "react";
import type { FilterOptions } from "@/types";

interface FilterSortControlsProps {
  filters: FilterOptions;
  onChange: (newFilters: FilterOptions) => void;
  disabled?: boolean;
}

const FilterSortControls: React.FC<FilterSortControlsProps> = ({ filters, onChange, disabled = false }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, status: e.target.value as FilterOptions["status"] });
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      <select
        className="w-full border border-gray-200 p-2 rounded-md bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
        value={filters.status ?? ""}
        onChange={handleStatusChange}
        disabled={disabled}
        aria-disabled={disabled}
      >
        <option value="">Wszystkie</option>
        <option value="pending">Do obsłużenia</option>
        <option value="served">Obsłużone</option>
      </select>
    </div>
  );
};

export default FilterSortControls;
