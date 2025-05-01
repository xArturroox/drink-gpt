import { useCallback, useEffect, useState } from "react";
import {
  createIngredient as createIngredientApi,
  deleteIngredient as deleteIngredientApi,
  fetchIngredients as fetchIngredientsApi,
  updateIngredient as updateIngredientApi,
} from "@/lib/api";
import type { IngredientDTO, IngredientRequestDTO, Pagination } from "@/types";

export default function useIngredients() {
  const [ingredients, setIngredients] = useState<IngredientDTO[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 0, size: 20 });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAllIngredients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchIngredientsApi({ page: pagination.page, size: pagination.size });
      setIngredients(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err);
      else setError(new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.size]);

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
    [fetchAllIngredients]
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
    [fetchAllIngredients]
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
    [fetchAllIngredients]
  );

  useEffect(() => {
    fetchAllIngredients();
  }, [fetchAllIngredients]);

  return {
    ingredients,
    pagination,
    loading,
    error,
    createIngredient,
    updateIngredient,
    deleteIngredient,
    setPagination,
  };
}
