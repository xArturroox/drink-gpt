import { useCallback, useEffect, useState } from "react";
import { createDrink, deleteDrink, fetchDrinks, updateDrink } from "@/lib/api";
import type { DrinkDTO, DrinkViewModel } from "@/types";

export function useDrinks() {
  const [drinks, setDrinks] = useState<DrinkViewModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchDrinks();
      const availableDrinks = data.filter((d) => d.ingredients.every((i) => i.ingredient.available));
      const viewModels: DrinkViewModel[] = availableDrinks.map((d) => ({
        id: d.id,
        name: d.name,
        ingredients: d.ingredients.map((i) => `${i.ingredient.name}:${i.quantity}${i.unit}`).join("; "),
        recipe: d.recipe,
      }));
      setDrinks(viewModels);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const create = useCallback(
    async (values: Omit<DrinkDTO, "id">) => {
      await createDrink({ ...values, id: 0 });
      await fetchAll();
    },
    [fetchAll],
  );

  const update = useCallback(
    async (id: number, values: Omit<DrinkDTO, "id">) => {
      await updateDrink(id, { ...values, id });
      await fetchAll();
    },
    [fetchAll],
  );

  const remove = useCallback(
    async (id: number) => {
      await deleteDrink(id);
      await fetchAll();
    },
    [fetchAll],
  );

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { drinks, isLoading, error, fetchAll, create, update, remove };
}
