import type { OrderViewModel } from "@/types";
import OrderRow from "./OrderRow";
import React from "react";

interface OrderTableProps {
  orders: OrderViewModel[];
  onServe: (id: string) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onServe, onDelete, loading }) => {
  if (orders.length === 0) {
    return <div>Brak zamówień</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table aria-label="Lista zamówień" className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th scope="col" className="px-4 py-2 text-left">
              #
            </th>
            <th scope="col" className="px-4 py-2 text-left">
              Drink
            </th>
            <th scope="col" className="px-4 py-2 text-left">
              Składniki
            </th>
            <th scope="col" className="px-4 py-2 text-left">
              Przepis
            </th>
            <th scope="col" className="px-4 py-2 text-left">
              Gość
            </th>
            <th scope="col" className="px-4 py-2 text-left">
              Czas
            </th>
            <th scope="col" className="px-4 py-2 text-left">
              Akcje
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <OrderRow
              key={order.id}
              index={idx}
              order={order}
              onServe={onServe}
              onDelete={onDelete}
              loading={loading}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
