import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import type { ConfirmationDialogProps } from "@/types";

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onConfirm, onCancel }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }

    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) {
    return null;
  }

  return (
    <dialog
      ref={dialogRef}
      open
      aria-labelledby="delete-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent"
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg max-w-sm w-full">
        <h2 id="delete-dialog-title" className="text-lg font-semibold">
          Potwierdź usunięcie
        </h2>
        <p className="mt-2">Czy na pewno chcesz usunąć to zamówienie?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Anuluj
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Usuń
          </Button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmationDialog;
