import { useEffect, useState } from "react";
import { fetchDrinks } from "@/lib/api";
import type { DrinkDTO } from "@/types";

export function useDrinks() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [drinks, setDrinks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetchDrinks()
      .then((data: DrinkDTO[]) => {
        const availableDrinks = data.filter((d) => d.ingredients.every((i) => i.ingredient.available));
        const viewModels = availableDrinks.map((d) => ({
          id: d.id,
          name: d.name,
          ingredients: d.ingredients.map((i) => `${i.ingredient.name}:${i.quantity}${i.unit}`).join("; "),
          recipe: d.recipe,
        }));
        setDrinks(viewModels);
      })
      .catch((e: any) => {
        setError(e.message || "Failed to load drinks");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { drinks, isLoading, error };
}
