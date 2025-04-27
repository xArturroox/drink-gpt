import { useCallback, useEffect, useState } from "react";
import { deleteOrder as deleteOrderApi, fetchOrders, markOrderAsServed } from "@/lib/api";
import type { FilterOptions, OrderDTO, OrderViewModel, Pagination } from "@/types";

export default function useOrders() {
  const [orders, setOrders] = useState<OrderViewModel[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({ status: "pending" });
  const [pagination, setPagination] = useState<Pagination>({ page: 0, size: 20 });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAllOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOrders({ page: pagination.page, size: pagination.size, status: filters.status });
      const viewModels: OrderViewModel[] = data.map((dto: OrderDTO) => ({
        id: dto.id.toString(),
        drinkName: dto.drinkName,
        ingredients: dto.ingredients,
        recipe: dto.recipe,
        guestName: dto.guestName,
        orderTimestamp: new Date(dto.orderTimestamp).toLocaleString(),
        served: dto.served,
      }));
      setOrders(viewModels);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error(String(err)));
      }
    } finally {
      setLoading(false);
    }
  }, [filters.status, pagination.page, pagination.size]);

  const serveOrder = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await markOrderAsServed(Number(id));
      await fetchAllOrders();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error(String(err)));
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteOrderApi(Number(id));
      await fetchAllOrders();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error(String(err)));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  return { orders, filters, pagination, loading, error, serveOrder, deleteOrder, setFilters, setPagination };
}
