import { useCallback, useEffect, useState } from "react";
import {
  createIngredient as createIngredientApi,
  deleteIngredient as deleteIngredientApi,
  fetchIngredients as fetchIngredientsApi,
  updateIngredient as updateIngredientApi,
} from "@/lib/api";
import type { IngredientDTO, IngredientRequestDTO } from "@/types";

export default function useIngredients() {
  const [ingredients, setIngredients] = useState<IngredientDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAllIngredients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchIngredientsApi();
      setIngredients(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err);
      else setError(new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, []);

  const createIngredient = useCallback(
    async (request: IngredientRequestDTO) => {
      setLoading(true);
      setError(null);
      try {
        await createIngredientApi(request);
        await fetchAllIngredients();
      } catch (err: unknown) {
        if (err instanceof Error) setError(err);
        else setError(new Error(String(err)));
      } finally {
        setLoading(false);
      }
    },
    [fetchAllIngredients],
  );

  const updateIngredient = useCallback(
    async (id: number, request: IngredientRequestDTO) => {
      setLoading(true);
      setError(null);
      try {
        await updateIngredientApi(id, request);
        await fetchAllIngredients();
      } catch (err: unknown) {
        if (err instanceof Error) setError(err);
        else setError(new Error(String(err)));
      } finally {
        setLoading(false);
      }
    },
    [fetchAllIngredients],
  );

  const deleteIngredient = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        await deleteIngredientApi(id);
        await fetchAllIngredients();
      } catch (err: unknown) {
        if (err instanceof Error) setError(err);
        else setError(new Error(String(err)));
      } finally {
        setLoading(false);
      }
    },
    [fetchAllIngredients],
  );

  useEffect(() => {
    fetchAllIngredients();
  }, [fetchAllIngredients]);

  return { ingredients, loading, error, createIngredient, updateIngredient, deleteIngredient };
} 