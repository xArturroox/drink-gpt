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
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      data-testid="order-confirmation-modal"
    >
      <div
        className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-lg p-6 w-full max-w-md shadow-xl border border-white/20 dark:border-gray-700/30">
        <h2 className="text-xl font-semibold mb-4">Zamówienie przyjęte!</h2>
        <div data-testid="order-details">
          <p className="mb-2">
            Numer zamówienia: <strong>{order.id}</strong>
          </p>
          <p className="mb-4">Dziękujemy, {order.guestName}! Twoje zamówienie jest w trakcie realizacji.</p>
        </div>
        <div className="flex justify-end">
          <Button
            className="bg-primary hover:bg-primary/90 transition-colors"
            onClick={onClose}
            data-testid="close-order-button"
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
