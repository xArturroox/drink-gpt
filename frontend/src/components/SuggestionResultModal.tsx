import React from "react";
import type { AISuggestionViewModel } from "@/types";
import { Button } from "@/components/ui/button";

interface SuggestionResultModalProps {
  suggestion: AISuggestionViewModel;
  isOpen: boolean;
  onConfirm: (suggestion: AISuggestionViewModel) => void;
  onCancel: () => void;
}

const SuggestionResultModal: React.FC<SuggestionResultModalProps> = ({ suggestion, isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-2">{suggestion.name}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{suggestion.description}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Składniki: {suggestion.ingredients}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Przepis: {suggestion.recipe}</p>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Anuluj
          </Button>
          <Button onClick={() => onConfirm(suggestion)}>Potwierdź zamówienie</Button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionResultModal;
