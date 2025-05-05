import React, { useState } from "react";
import DrinksList from "./DrinksList";
import AISuggestionPanel from "./AISuggestionPanel";
import SuggestionResultModal from "./SuggestionResultModal";
import OrderConfirmationModal from "./OrderConfirmationModal";
import { useDrinks } from "./hooks/useDrinks";
import { createOrder, suggestDrink } from "../lib/api";
import type { AISuggestionViewModel, DrinkViewModel, OrderDTO } from "../types";
import { GuestNameProvider } from "./contexts/GuestNameContext";
import { logger } from "../lib/logger";

const HomePage: React.FC = () => {
  const { drinks } = useDrinks();
  const [suggestion, setSuggestion] = useState<AISuggestionViewModel | null>(null);
  const [orderResult, setOrderResult] = useState<OrderDTO | null>(null);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleAISubmit = async (preferences: string, guestName: string) => {
    if (!guestName.trim()) return;
    setIsSuggesting(true);
    setAiError(null);
    try {
      const resp = await suggestDrink({ preferences });
      const viewModel: AISuggestionViewModel = {
        name: resp.name,
        description: resp.description,
        ingredients: resp.ingredients,
        recipe: resp.recipe,
      };
      setSuggestion(viewModel);
    } catch (error) {
      logger.error(error);
      setAiError(error instanceof Error ? error.message : "Wystąpił problem podczas generowania propozycji drinka.");
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleConfirmSuggestion = async (suggestionVM: AISuggestionViewModel, guestName: string) => {
    if (!guestName.trim()) return;
    try {
      const order = await createOrder({
        drinkName: suggestionVM.name,
        ingredients: suggestionVM.ingredients,
        recipe: suggestionVM.recipe,
        guestName,
      });
      setOrderResult(order);
      setSuggestion(null);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSelectDrink = async (drink: DrinkViewModel, guestName: string) => {
    if (!guestName.trim()) return;
    try {
      const order = await createOrder({
        drinkName: drink.name,
        ingredients: drink.ingredients,
        recipe: drink.recipe,
        guestName,
      });
      setOrderResult(order);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <GuestNameProvider>
      <div className="min-h-screen flex flex-col" data-testid="home-page">
        <main className="flex-grow container mx-auto p-4 space-y-8">
          <div
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-6 border border-white/20 dark:border-gray-700/30"
            data-testid="guest-instructions"
          >
            <h2 className="text-xl font-semibold mb-3">Witaj w DrinkGPT!</h2>
            <p className="mb-2">Jako gość możesz:</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>Wpisać swoje preferencje lub nastrój, aby AI zaproponowało Ci idealny drink dla Ciebie</li>
              <li>Wybrać drink z gotowej listy poniżej (pokazujemy tylko te, na które mamy składniki)</li>
              <li>Złożyć zamówienie, które zostanie zrealizowane przez gospodarza</li>
            </ul>
          </div>
          <AISuggestionPanel onSubmit={handleAISubmit} isLoading={isSuggesting} />
          {aiError && (
            <div
              className="bg-red-50/90 dark:bg-red-900/90 backdrop-blur-sm text-red-800 dark:text-red-100 p-4 rounded-lg shadow-md border border-red-100/30 dark:border-red-800/30"
              data-testid="suggestion-error-message"
            >
              {aiError}
            </div>
          )}
          {suggestion && (
            <SuggestionResultModal
              suggestion={suggestion}
              isOpen={true}
              onConfirm={handleConfirmSuggestion}
              onCancel={() => setSuggestion(null)}
            />
          )}
          <DrinksList drinks={drinks} onSelect={handleSelectDrink} />
          <OrderConfirmationModal order={orderResult} isOpen={!!orderResult} onClose={() => setOrderResult(null)} />
        </main>
      </div>
    </GuestNameProvider>
  );
};

export default HomePage;
