import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import type { ConfirmationDialogProps } from "@/types";

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onConfirm, onCancel }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
    >
      <div ref={dialogRef} tabIndex={-1} className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
        <h2 id="confirm-delete-title" className="text-lg font-semibold">
          Potwierdź usunięcie składnika
        </h2>
        <p className="mt-2">Czy na pewno chcesz usunąć ten składnik?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel} type="button">
            Anuluj
          </Button>
          <Button variant="destructive" onClick={onConfirm} type="button">
            Usuń
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
