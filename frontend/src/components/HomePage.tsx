import React, { useState } from "react";
import DrinksList from "./DrinksList";
import AISuggestionPanel from "./AISuggestionPanel";
import SuggestionResultModal from "./SuggestionResultModal";
import OrderConfirmationModal from "./OrderConfirmationModal";
import { useDrinks } from "./hooks/useDrinks";
import { createOrder, suggestDrink } from "../lib/api";
import type { AISuggestionViewModel, DrinkViewModel, OrderDTO } from "../types";
import { GuestNameProvider } from "./contexts/GuestNameContext";

const HomePage: React.FC = () => {
  const { drinks } = useDrinks();
  const [suggestion, setSuggestion] = useState<AISuggestionViewModel | null>(null);
  const [orderResult, setOrderResult] = useState<OrderDTO | null>(null);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);

  const handleAISubmit = async (preferences: string, guestName: string) => {
    if (!guestName.trim()) return;
    setIsSuggesting(true);
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
      console.error(error);
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleConfirmSuggestion = async (suggestionVM: AISuggestionViewModel, guestName: string) => {
    if (!guestName.trim()) return;
    setIsOrdering(true);
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
      console.error(error);
    } finally {
      setIsOrdering(false);
    }
  };

  const handleSelectDrink = async (drink: DrinkViewModel, guestName: string) => {
    if (!guestName.trim()) return;
    setIsOrdering(true);
    try {
      const order = await createOrder({
        drinkName: drink.name,
        ingredients: drink.ingredients,
        recipe: drink.recipe,
        guestName,
      });
      setOrderResult(order);
    } catch (error) {
      console.error(error);
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <GuestNameProvider>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto p-4 space-y-8">
          <AISuggestionPanel onSubmit={handleAISubmit} isLoading={isSuggesting} />
          {suggestion && (
            <SuggestionResultModal
              suggestion={suggestion}
              isOpen={true}
              onConfirm={handleConfirmSuggestion}
              onCancel={() => setSuggestion(null)}
            />
          )}
          <DrinksList drinks={drinks} onSelect={handleSelectDrink} />
          <OrderConfirmationModal
            order={orderResult}
            isOpen={!!orderResult}
            onClose={() => setOrderResult(null)}
          />
        </main>
      </div>
    </GuestNameProvider>
  );
};

export default HomePage;
