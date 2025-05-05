import React from "react";
import type { OrderViewModel } from "@/types";
import { Button } from "@/components/ui/button";

interface OrderRowProps {
  index: number;
  order: OrderViewModel;
  onServe: (id: string) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

const OrderRow: React.FC<OrderRowProps> = ({ index, order, onServe, onDelete, loading }) => {
  return (
    <tr className="border-b last:border-0">
      <td className="px-4 py-2">{index + 1}</td>
      <td className="px-4 py-2">{order.drinkName}</td>
      <td className="px-4 py-2">{order.ingredients}</td>
      <td className="px-4 py-2">{order.recipe}</td>
      <td className="px-4 py-2">{order.guestName}</td>
      <td className="px-4 py-2">{order.orderTimestamp}</td>
      <td className="px-4 py-2 flex flex-col gap-2">
        {!order.served && (
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => onServe(order.id)}
            disabled={loading}
          >
            Obsłużone
          </Button>
        )}
        <Button size="sm" variant="destructive" onClick={() => onDelete(order.id)} disabled={loading}>
          Usuń
        </Button>
      </td>
    </tr>
  );
};

export default OrderRow;
