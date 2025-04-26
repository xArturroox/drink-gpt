import React from "react";
import type { OrderDTO } from "@/types";
import { Button } from "@/components/ui/button";

interface OrderConfirmationModalProps {
  order: OrderDTO | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Zamówienie przyjęte!</h2>
        <p className="mb-2">
          Numer zamówienia: <strong>{order.id}</strong>
        </p>
        <p className="mb-4">Dziękujemy, {order.guestName}! Twoje zamówienie jest w trakcie realizacji.</p>
        <div className="flex justify-end">
          <Button onClick={onClose}>OK</Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
