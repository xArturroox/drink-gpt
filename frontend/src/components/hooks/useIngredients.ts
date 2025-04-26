import { useEffect, useState } from "react";
import { fetchIngredients } from "@/lib/api";
import type { IngredientDTO } from "@/types";

export function useIngredients() {
  const [ingredients, setIngredients] = useState<IngredientDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetchIngredients({ available: true })
      .then((data: IngredientDTO[]) => {
        setIngredients(data);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { ingredients, isLoading, error };
} 