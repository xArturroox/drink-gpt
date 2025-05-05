import React from "react";
import type { AISuggestionViewModel } from "@/types";
import { useGuestName } from "./contexts/GuestNameContext";

interface SuggestionResultModalProps {
  suggestion: AISuggestionViewModel | null;
  isOpen: boolean;
  onConfirm: (suggestion: AISuggestionViewModel, guestName: string) => void;
  onCancel: () => void;
}

const SuggestionResultModal: React.FC<SuggestionResultModalProps> = ({ suggestion, isOpen, onConfirm, onCancel }) => {
  const { guestName } = useGuestName();

  if (!isOpen || !suggestion) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      data-testid="suggestion-result-modal"
    >
      <div
        className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-lg p-6 max-w-lg w-full shadow-xl border border-white/20 dark:border-gray-700/30">
        <h2 className="text-xl font-semibold mb-4">Proponowany drink</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Nazwa:</h3>
            <p data-testid="suggestion-drink-name">{suggestion.name}</p>
          </div>
          <div>
            <h3 className="font-semibold">Opis:</h3>
            <p data-testid="suggestion-drink-name">{suggestion.description}</p>
          </div>
          <div>
            <h3 className="font-semibold">Składniki:</h3>
            <p data-testid="suggestion-ingredients">{suggestion.ingredients}</p>
          </div>
          <div>
            <h3 className="font-semibold">Przepis:</h3>
            <p data-testid="suggestion-recipe">{suggestion.recipe}</p>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-md hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors"
            data-testid="cancel-suggestion-button"
          >
            Anuluj
          </button>
          <button
            onClick={() => onConfirm(suggestion, guestName)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            data-testid="order-suggestion-button"
          >
            Zamów
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionResultModal;
